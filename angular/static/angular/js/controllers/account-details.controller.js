/**
* DetailsController
* @namespace app.controllers.account
**/
  'use strict';

  angular
    .module('app.controllers')
    .controller('AccountDetailsController', AccountDetailsController);

  AccountDetailsController.$inject = ['$location', '$scope', '$routeParams', 'Account', 'Alert'];

  function AccountDetailsController($location, $scope, $routeParams, Account, Alert){
    var vm = this;

    vm.account = undefined;
    vm.get = get;
    activate();

    /**
    * @name activate
    * @desc Load the account
    * @memberOf app.controllers.AccountDetailsControllers
    **/
    function activate(){

      var username = $routeParams.username.substr(1);

      vm.get(username);

    }

    /**
    * @name get
    * @desc Get the account details
    * @memberOf app.controllers.AccountDetailsControllers
    **/
    function get(username){
      Account.get(username).then(accountSuccessFn, accountErrorFn);

      /**
      * @name accountSuccessFn
      * @desc Update `account` on view model
      **/
      function accountSuccessFn(data, status, headers, config){
        vm.account = data.data;
      }

      /**
      * @name accountErrorFn
      * @desc Display error
      **/
      function accountErrorFn(data, status, headers, config){
        Alert.setAlert(data.error, 'danger');
      }
    }
  }