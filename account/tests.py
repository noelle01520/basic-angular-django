from django.test import TestCase
from django.core.urlresolvers import reverse

from .models import Account
from .serializers import AccountSerializer

from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, APIClient


class AccountTest(TestCase):

    def setUp(self):
        Account.objects.create_superuser(email='super1@test.com', password='imsuper', confirm_password='imsuper',
                                        first_name='Ima', last_name='Super', username='super1')
        Account.objects.create_user(email='normal1@test.com', password='norma', password_confirm='norma',
                                    first_name='Norma', last_name='Normal', username='normal1')

    def test_account_manager_create_user(self):
        """
        Ensure we create a new account
        """
        new_account = Account.objects.create_user(email='normal2@test.com', confirm_password='norm',
                                                  username='normal2', password='norm', first_name='Norman')
        self.assertEqual(Account.objects.filter(email='normal2@test.com').count(), 1,
                         msg='Test that user is successfully created.')

    def test_account_manager_create_superuser(self):
        """
        Ensure we create a new super user
        """
        new_super = Account.objects.create_superuser(email='super2@test.com', username='super2',
                                                     confirm_password='imsuper2', password='imsuper2',
                                                     first_name='Ima', last_name='Super2')
        self.assertEqual(Account.objects.filter(is_admin=True).count(), 2,
                         msg='Test that superuser is successfully created')

    def test_account_get_names(self):
        """
        Ensure the basic name functions are working as expected
        """
        user = Account.objects.get(email='normal1@test.com')
        self.assertEqual(user.get_full_name(), 'Norma Normal',
                         msg='Test that Account.get_full_name() returns correct data')
        self.assertEqual(user.get_short_name(), 'Norma', msg='Test that Account.get_short_name() returns correct data')


class CreateAccountTest(APITestCase):

    def setUp(self):
        Account.objects.create_user(email='api1@test.com', password='api1', confirm_password='api1',
                                    first_name='Api1', last_name='Test', username='api1')

    def test_api_create_account(self):
        """
        Ensure account creation fails without required data
        Ensure account creation fails when password don't match
        Ensure we create a new account with correct data
        """

        # Incomplete data - no username
        self.data = {'email': 'api2@test.com', 'password': 'api2test',
                     'confirm_password': 'api2test', 'first_name': 'API2', 'last_name': 'Test'}
        response = self.client.post(reverse('account-list'), self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Account.objects.filter(email='api2@test.com').count(), 0)

        # Mismatched paswords
        self.data.update({'email': 'api2@test.com', 'password': 'api2test', 'username': 'api2',
                          'confirm_password': 'api2test2', 'first_name': 'API2', 'last_name': 'Test'})
        response = self.client.post(reverse('account-list'), self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Account.objects.filter(email='api2@test.com').count(), 0)

        # Complete, correct data
        self.data.update({'email': 'api2@test.com', 'password': 'api2test', 'username': 'api2',
                          'confirm_password': 'api2test', 'first_name': 'API2', 'last_name': 'Test'})
        response = self.client.post(reverse('account-list'), self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Account.objects.filter(email='api2@test.com').count(), 1)
        self.assertEqual(Account.objects.get(email='api2@test.com').get_full_name(), 'API2 Test')

    def test_api_get_account(self):
        """
        Ensure we correctly retrieve account data
        """
        data = {'username': 'api1', 'first_name': 'Api1', 'last_name': 'Test'}
        response= self.client.get('/account/api/v1/accounts/api1/')
        for key in data:
            if key != 'password':
                self.assertEqual(response.data[key], data[key])


class ReadUserTest(APITestCase):
    def setUp(self):
        Account.objects.create_superuser(email='super1@test.com', password='imsuper', confirm_password='imsuper',
                                         first_name='Ima', last_name='Super', username='super1')
        self.client.login(email='super1@test.com', password='imsuper')
        self.user = Account.objects.create_user(email='normal1@test.com', password='norma', password_confirm='norma',
                                first_name='Norma', last_name='Normal', username='normal1')
        self.data = AccountSerializer(self.user).data

    def test_can_read_user_list(self):
        response = self.client.get(reverse('account-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_read_user_detail(self):
        response = self.client.get(reverse('account-detail', args=[self.user.username]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for key in self.data:
            self.assertEqual(response.data[key], self.data[key])


class UpdateAccountTest(APITestCase):
    def setUp(self):
        """
        Setup test data with regular user account and
        change first name
        """
        self.user = Account.objects.create_user(email='api2@test.com', password='api2', confirm_password='api2',
                                                first_name='Api2', last_name='Test', username='api2')
        self.client.login(email='api2@test.com', password='api2')
        self.data = AccountSerializer(self.user).data
        self.data.update({'first_name': 'Changed',
                          'last_name': 'Changed2',
                          'new_username': 'Changed3'})

    def test_can_update_user(self):
        """
        Use API to update changes in db
        Ensure changes correctly populated to db
        """
        response = self.client.put(reverse('account-detail', args=[self.user.username]), self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user = Account.objects.get(email=self.user.email)
        self.assertEqual(self.user.get_full_name(), 'Changed Changed2')
        self.assertEqual(self.user.username, 'Changed3')

    def test_password_update(self):
        """
        Ensure update passes when passwords the same and
        fails when they don't match
        """
        # matching password
        self.data.update({'password': 'api2changed',
                          'confirm_password': 'api2changed'})
        response = self.client.put(reverse('account-detail', args=[self.user.username]), self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user = Account.objects.get(email=self.user.email)
        # make sure user can login with new password
        response = self.client.login(email='api2@test.com', password='api2changed')
        self.assertTrue(response)
        # password missing
        self.data.update({'password': '',
                          'confirm_password': 'api2changed2'})
        response = self.client.put(reverse('account-detail', args=[self.user.username]), self.data)
        # make sure pw wasn't changed
        response = self.client.login(email='api2@test.com', password='api2changed2')
        self.assertFalse(response)
        # confirm_password missing
        self.data.update({'password': 'api2changed2',
                          'confirm_password': ''})
        response = self.client.put(reverse('account-detail', args=[self.user.username]), self.data)
        # make sure pw wasn't changed
        response = self.client.login(email='api2@test.com', password='api2changed2')
        self.assertFalse(response)
        # mismatched passwords
        self.data.update({'password': 'api2',
                          'confirm_password': 'api2changed2'})
        response = self.client.put(reverse('account-detail', args=[self.user.username]), self.data)
        # make sure pw wasn't changed
        response = self.client.login(email='api2@test.com', password='api2')
        self.assertFalse(response)
        response = self.client.login(email='api2@test.com', password='api2changed')
        self.assertTrue(response)


class DeleteUserTest(APITestCase):
    def setUp(self):
        self.user = Account.objects.create_user(email='api2@test.com', password='api2', confirm_password='api2',
                                                first_name='Api2', last_name='Test', username='api2')

        self.client.login(email='api2@test.com', password='api2')

    def test_can_delete_user(self):
        response = self.client.delete(reverse('account-detail', args=[self.user.username]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

# Integration tests
class SiteTest(TestCase):

    def setUp(self):
        Account.objects.create_user(email='api1@test.com', password='api1', confirm_password='api1',
                                    first_name='Api1', last_name='Test', username='api1')

    def test_homepage(self):
        """
        Ensure the homepage loads correctly
        """
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)