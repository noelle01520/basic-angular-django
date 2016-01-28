from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class AccountManager(BaseUserManager):

    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('A valid email address is required.')

        if 'username' not in kwargs:
            raise ValueError('A valid username is required.')

        account = self.model(
            email=self.normalize_email(email),
            username=kwargs.get('username')
        )

        if 'first_name' in kwargs:
            account.first_name = kwargs.get('first_name')
        if 'last_name' in kwargs:
            account.last_name = kwargs.get('last_name')

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, email, password=None, **kwargs):

        account = self.create_user(email, password, **kwargs)

        account.is_admin = True
        account.save()

        return account



class Account(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)

    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

