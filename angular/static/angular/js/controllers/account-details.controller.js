/**
* AccountDetailsController
* @namespace app.controllers
**/
(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('AccountDetailsController', AccountDetailsController);

  AccountDetailsController.$inject = ['$location', '$routeParams', 'Account'], 'Alert';

  function AccountDetailsController($location, $routeParams, Account, Alert){
    var vm = this;

    vm.account = undefined;

    activate();

    /**
    * @name activate
    * @desc Load the account
    * @memberOf app.controllers.AccountDetailsControllers
    **/
    function activate(){

      var username = $routeParams.username.substr(1);

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
})();