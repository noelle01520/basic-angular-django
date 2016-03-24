'use strict';

describe('LayoutController', function(){
  var LayoutController, $controller;

  beforeEach(angular.mock.module('app'));
  beforeEach(module('AccountMock'));
  beforeEach(module('AlertMock'));
  beforeEach(module('NavigationMock'));

  describe('Controller Functions', function(){
    var Account;
    var Alert;
    var Navigation;
    var deferred;
    var scope;

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
      deferred = $q.defer();
      Alert = _Alert_;
      spyOn(Alert, 'getMessage').and.callThrough();
      spyOn(Alert, 'getType').and.callThrough();
      spyOn(Alert, 'setAlert').and.callThrough();
    }));

    beforeEach(inject(function($q, _Navigation_) {
      deferred = $q.defer();
      Navigation = _Navigation_;
      spyOn(Navigation, 'display').and.callThrough();
      spyOn(Navigation, 'goHome').and.callThrough();
    }));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      spyOn(scope, '$emit');
      LayoutController = $controller('LayoutController', {
        $scope: scope,
        Alert: Alert,
        Navigation: Navigation,
      });

    }));

    it('should expose a method to redirect to the index', function(){
      expect(LayoutController.index).toBeDefined();
      expect(angular.isFunction(LayoutController.index)).toBe(true);
    });

    it('should expose a method to log the user out', function(){
      expect(LayoutController.logout).toBeDefined();
      expect(angular.isFunction(LayoutController.logout)).toBe(true);
    });

    it('should call index', function(){
      LayoutController.index();
      expect(Alert.setAlert).toHaveBeenCalled();
      expect(Alert.setAlert.calls.count()).toBe(1);
      expect(Navigation.goHome).toHaveBeenCalled();
      expect(Navigation.goHome.calls.count()).toBe(1);
    });

    it('should call function to log out user', function(){
      LayoutController.logout();
      expect(Account.logout).toHaveBeenCalled();
      expect(Account.logout.calls.count()).toBe(1);
    });
  });
});