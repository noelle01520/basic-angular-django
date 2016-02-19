'use strict';

describe('AccountDetailsController', function(){
  var AccountDetailsController, $controller;
    describe('Account Details Controller Functions', function(){

  beforeEach(angular.mock.module('app'));
  beforeEach(module('AccountMock'));
  beforeEach(module('AlertMock'));

  var Account;
  var Alert;
  var deferred;
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
    //deferred = $q.defer();
    Alert = _Alert_;
    spyOn(Alert, 'getMessage').and.callThrough();
    spyOn(Alert, 'getType').and.callThrough();
    spyOn(Alert, 'setAlert').and.callThrough();
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    params = { 'username': 'testuser' };
    spyOn(scope, '$emit');
    AccountDetailsController = $controller('AccountDetailsController', {
      $scope: scope,
      Alert: Alert,
      Account: Account,
      $routeParams: params,
    });
  }));


    it('should expose a initialize method to retrieve account details', function(){
      expect(AccountDetailsController.get).toBeDefined();
      expect(angular.isFunction(AccountDetailsController.get)).toBe(true);
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
      expect(AccountDetailsController.account).toBe(data.data);
    });

    it('should have na undefined account on error', function(){
      deferred.reject(400);
      scope.$digest();
      //check for error
      expect(AccountDetailsController.account).toBe(undefined);
    });
  });

});