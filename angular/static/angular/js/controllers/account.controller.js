/**
* AccountController
* @namespace app.controllers
* @desc Provides create, update, login, logout for Account
**/
  'use strict';
  angular
    .module('app.controllers')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['$location', '$scope', 'Account', 'Navigation'];

  function AccountController($location, $scope, Account, Navigation){
    var vm = this;

    vm.create = create;
    vm.login = login;

    /**
    * @name create
    * @desc Create a new user
    * @memberOf app.controllers.AccountController
    **/
    function create(){
      Account.create(vm.email, vm.password, vm.username, vm.first_name, vm.last_name);
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