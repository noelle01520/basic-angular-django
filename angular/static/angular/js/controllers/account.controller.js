/**
* AccountController
* @namespace app.controllers
* @desc Provides create, update, login, logout for Account
**/
(function(){
  'use strict';
  angular
    .module('app.controllers')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['$location', '$scope', 'Account', 'Navigation', 'Alert'];

  function AccountController($location, $scope, Account, Navigation, Alert){
    var vm = this;

    vm.create = create;
    vm.login = login;

    /**
    * @name create
    * @desc Create a new user
    * @memberOf app.controllers.AccountController
    **/
    function create(){
      Account.create(vm.email, vm.password, vm.confirm_password, vm.username, vm.first_name, vm.last_name)
        .then(createSuccessFn, createErrorFn);

      /**
      * @name createSuccessFn
      * @desc Log in user after account created
      **/
      function createSuccessFn(data, status, headers, config){
        Account.login(vm.email, vm.password);
      }

      /**
      * @name createErrorFn
      * @desc Display error
      **/
      function createErrorFn(data, status, headers, config){
        var messages = '';
        for (var error in data.data){
          messages = messages + data.data[error] + '\n';
        }
        Alert.setAlert(messages, 'danger');
      }
    }

    /**
    * @name login
    * @desc Log the user in
    * @memberOf app.controllers.AccountController
    **/
    function login(){
      Account.login(vm.email, vm.password);
    }
  }
})();