'use strict';

describe('AccountController', function(){
  var AccountController, $controller;

  beforeEach(angular.mock.module('app'));
  beforeEach(module('AccountMock'));
  beforeEach(module('NavigationMock'));

  describe('Controller Functions', function(){
    var Navigation;
    var Account;
    var deferred;
    var scope;

    beforeEach(inject(function($q, _Navigation_) {
      deferred = $q.defer();
      Navigation = _Navigation_;
      spyOn(Navigation, 'display').and.callThrough();
      spyOn(Navigation, 'goHome').and.callThrough();
    }));

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

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      spyOn(scope, '$emit');
      AccountController = $controller('AccountController', {
        $scope: scope,
        Navigation: Navigation,
        Account: Account
      });
    }));

    it('should expose a method to create an account', function(){
      expect(AccountController.create).toBeDefined();
      expect(angular.isFunction(AccountController.create)).toBe(true);
    });

    it('should expose a method to log the user in', function(){
      expect(AccountController.login).toBeDefined(),
      expect(angular.isFunction(AccountController.login)).toBe(true);
    });

    it('should call login on account', function(){
      AccountController.login();
      expect(Account.login).toHaveBeenCalled();
      expect(Account.login.calls.count()).toBe(1);
    });

    it('should call create account', function(){
      AccountController.create();
      expect(Account.create).toHaveBeenCalled();
      expect(Account.create.calls.count()).toBe(1);
    });

  });
});