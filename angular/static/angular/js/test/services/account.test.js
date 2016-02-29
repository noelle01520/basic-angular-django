'use strict';

describe('Service: Account', function(){
  beforeEach(module('app'));
  beforeEach(module('AlertMock'));
  beforeEach(module('NavigationMock'))

  var Account;
  var Alert;
  var Navigation
  var httpBackend;
  var returnValue;
  var errorStatus;
  var handler;
  var deferred, a_deferred, n_deferred;

  beforeEach(inject(function($httpBackend, _Account_, _Alert_, _Navigation_) {
    Account = _Account_;
    httpBackend = $httpBackend;
  }));

  beforeEach(function(){
    returnValue = undefined;
    errorStatus = '';
    handler = {
      success: function(data){
        returnValue = data;
      },
      error: function(data){
        errorStatus = data;
      }
    };
    spyOn(handler, 'success').and.callThrough();
    spyOn(handler, 'error').and.callThrough();
    spyOn(Account, 'login').and.callThrough();
    spyOn(Account, 'unauthenticate').and.callThrough();
    spyOn(Account, 'setAuthenticatedAccount').and.callThrough();
  });

    beforeEach(inject(function($q, _Alert_) {
      a_deferred = $q.defer();
      Alert = _Alert_;
      spyOn(Alert, 'getMessage').and.callThrough();
      spyOn(Alert, 'getType').and.callThrough();
      spyOn(Alert, 'setAlert').and.callThrough();
    }));

    beforeEach(inject(function($q, _Navigation_){
      n_deferred = $q.defer();
      Navigation = _Navigation_;
      spyOn(Navigation, 'display').and.callThrough();
      spyOn(Navigation, 'goHome').and.callThrough();
    }));

  describe('HTTP calls', function(){
    afterEach(function(){
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should call get on the API', function(){
      httpBackend.expectGET('/account/api/v1/accounts/testuser/').respond('');
      Account.get('testuser');
      httpBackend.flush();
    });

    it('should return a promise from api get', function(){
      var testuser = { 'id': 1,
                        'username': 'testuser',
                        'email': 'test@test.com',
                        'first_name': 'Testfirst',
                        'last_name': 'Testlast'
                     };
      httpBackend.expectGET('/account/api/v1/accounts/testuser/').respond(testuser);
      Account.get('testuser').then(handler.success, handler.error);
      httpBackend.flush();

      expect(handler.success).toHaveBeenCalled();
      expect(returnValue.data).toEqual(testuser);
      expect(handler.error).not.toHaveBeenCalled();
      expect(errorStatus).toEqual('');
    });

    it('should call post on the API create method, followed by login', function(){
      var newuser = { 'email': 'test@test.com',
                      'password': 'test',
                      'username': 'testuser',
                      'first_name': 'Test1',
                      'last_name': 'Test2'
                      };
      var login = {
        'email': 'test@test.com',
        'password': 'test'
      };
      httpBackend.expectPOST('/account/api/v1/accounts/', newuser).respond(200);
      Account.create('test@test.com', 'test', 'testuser', 'Test1', 'Test2')
      httpBackend.expectPOST('/account/api/v1/auth/login/', login).respond(200);
      httpBackend.flush();

      expect(Account.login).toHaveBeenCalled();
      expect(Account.login.calls.count()).toBe(1);
    });

    it('should call post on the API destroy method', function(){
      var user = { 'email': 'test@test.com',
                   'password': 'test',
                   'username': 'testuser',
                   'first_name': 'Test1',
                   'last_name': 'Test2'
                 };
      httpBackend.expectDELETE('/account/api/v1/accounts/testuser/').respond(200);
      Account.destroy(user);
      httpBackend.flush();
    });

    it('should return undefined from getAuthenticatedAccount', function(){
      expect(Account.getAuthenticatedAccount()).toBe(undefined);
    });

    it('should return false from isAuthenticated', function(){
      expect(Account.isAuthenticated()).toBe(false);
    });

    it('should call login and the services from the success function', function(){
      var login_creds = {
        'email': 'test@test.com',
        'password': 'test'
      };
      var user = { 'email': 'test@test.com',
                   'password': 'test',
                   'username': 'testuser',
                   'first_name': 'Test1',
                   'last_name': 'Test2'
                 };
      httpBackend.expectPOST('/account/api/v1/auth/login/', login_creds).respond(200);

      Account.login(login_creds['email'], login_creds['password']);
      httpBackend.flush();

      expect(Account.setAuthenticatedAccount).toHaveBeenCalled();
      expect(Account.setAuthenticatedAccount.calls.count()).toBe(1);
      expect(Alert.setAlert).toHaveBeenCalled();
      expect(Alert.setAlert.calls.count()).toBe(1);
      expect(Navigation.goHome).toHaveBeenCalled();
      expect(Navigation.goHome.calls.count()).toBe(1);

    });

    it('should call logout and the services from the success function', function(){

      httpBackend.expectPOST('/account/api/v1/auth/logout/').respond();

      Account.logout();
      httpBackend.flush();
      expect(Account.unauthenticate).toHaveBeenCalled();
      expect(Account.unauthenticate.calls.count()).toBe(1);
      expect(Alert.setAlert).toHaveBeenCalled();
      expect(Alert.setAlert.calls.count()).toBe(1);
      expect(Navigation.goHome).toHaveBeenCalled();
      expect(Navigation.goHome.calls.count()).toBe(1);

    });

    it('should return undefined from setAuthenticatedAccount', function(){
      expect(Account.setAuthenticatedAccount()).toBe(undefined);
    });

    it('should return undefined from unauthenticate', function(){
      expect(Account.unauthenticate()).toBe(undefined);
    });

    it('should return a promise from api update', function(){
      var testuser = { 'id': 1,
                        'username': 'testuser',
                        'email': 'test@test.com',
                        'first_name': 'Testfirst',
                        'last_name': 'Testlast'
                     };
      httpBackend.expectPUT('/account/api/v1/accounts/testuser/', testuser).respond(200);
      Account.update(testuser).then(handler.success, handler.error);
      httpBackend.flush();

      expect(handler.success).toHaveBeenCalled();
      expect(returnValue.data).toEqual(undefined);
      expect(handler.error).not.toHaveBeenCalled();
      expect(errorStatus).toEqual('');
    });
  });
});