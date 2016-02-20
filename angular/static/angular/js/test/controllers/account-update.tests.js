'use strict';

describe('AccountUpdateController', function(){
  var AccountUpdateController, $controller;
    describe('Account Update Controller Functions', function(){

    beforeEach(angular.mock.module('app'));
    beforeEach(module('AccountMock'));
    beforeEach(module('AlertMock'));
    beforeEach(module('NavigationMock'));

    var Account;
    var Alert;
    var Navigation;
    var deferred, a_deferred, n_deferred;
    var scope;
    var params;

    beforeEach(inject(function($q, _Account_){
      deferred = $q.defer();
      Account = _Account_;
      spyOn(Account, 'create').and.returnValue(deferred.promise);
      spyOn(Account, 'destroy').and.returnValue(deferred.promise);
      spyOn(Account, 'get').and.returnValue(deferred.promise);
      spyOn(Account, 'getAuthenticatedAccount').and.callThrough();
      spyOn(Account, 'isAuthenticated').and.callThrough();
      spyOn(Account, 'login').and.returnValue(deferred.promise);
      spyOn(Account, 'logout').and.returnValue(deferred.promise);
      spyOn(Account, 'setAuthenticatedAccount').and.callThrough();
      spyOn(Account, 'unauthenticate').and.callThrough();
      spyOn(Account, 'update').and.returnValue(deferred.promise);
    }));

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

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      params = { 'username': 'testuser' };
      spyOn(scope, '$emit');
      AccountUpdateController = $controller('AccountUpdateController', {
        $scope: scope,
        Alert: Alert,
        Account: Account,
        Navigation: Navigation,
        $routeParams: params,
      });
    }));

    it('should expose a get method to retrieve account details', function(){
      expect(AccountUpdateController.get).toBeDefined();
      expect(angular.isFunction(AccountUpdateController.get)).toBe(true);
    });

    it('should call get on account', function(){
      expect(Account.get).toHaveBeenCalled();
      expect(Account.get.calls.count()).toBe(1);
    });

    it('should retrieve user data on success', function(){
      var data = { data: { 'id': 1,
                   'username': 'testuser',
                   'email': 'test@test.com',
                   'first_name': 'Testfirst',
                   'last_name': 'Testlast'
                 }};
      deferred.resolve(data);
      scope.$digest();
      //check for state on success
      expect(AccountUpdateController.account).toBe(data.data);
    });

    it('should have an undefined account value on error', function(){
      deferred.reject(400);
      scope.$digest();
      //check for error
      expect(AccountUpdateController.account.value).toBe(undefined);
    });

    it('should expose a method to delete an account', function(){
      expect(AccountUpdateController.destroy).toBeDefined();
      expect(angular.isFunction(AccountUpdateController.destroy)).toBe(true);
    });

    it('should call destroy on account', function(){
      AccountUpdateController.destroy();
      expect(Account.destroy).toHaveBeenCalled();
      expect(Account.destroy.calls.count()).toBe(1);
    });
  });
});