/**
* AccountUpdateController
* @namespace app.controllers
**/
(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('AccountUpdateController', AccountUpdateController);

  AccountUpdateController.$inject = ['$location', '$routeParams', '$sce', 'Account', 'Alert', 'Navigation'];

  function AccountUpdateController($location, $routeParams, $sce, Account, Alert, Navigation){
    var vm = this;

    vm.account = undefined;

    vm.destroy = destroy;
    vm.get = get;
    vm.update = update;

    activate();

    /**
    * @name activate
    * @desc verify authenticated account
    * @memberOf app.controllers.AccountUpdateController
    **/
    function activate(){
      var authenticatedAccount = Account.getAuthenticatedAccount();
      var username = $routeParams.username.substr(1);

      if(!authenticatedAccount || authenticatedAccount.username != username){
        Navigation.goHome('There was an error accessing that account.', 'alert alert-danger alert-dismissible', false);
      }

      vm.get(username);

    }

    /**
    * @name get
    * @desc refresh account info
    * @param {string} username The username of the account
    * @memberOf app.controllers.AccountUpdateController
    **/
    function get(username){

      vm.account = Account.get(username).then(accountSuccessFn, accountErrorFn);

      /**
      * @name accountSuccessFn
      * @desc Update `account` for view
      **/
      function accountSuccessFn(data, status, headers, config){
        vm.account = data.data;
        vm.account.new_username = vm.account.username;
      }

      /**
      * @name accountErrorFn
      * @desc Display error message
      **/
      function accountErrorFn(data, status, headers, config){
        Alert.setAlert(data.error, 'danger');
      }
    }

    /**
    * @name destroy
    * @desc Delete this user's profile
    * @memberOf app.controllersAccountUpdateController
    **/
    function destroy(){
      Account.destroy(vm.account).then(accountSuccessFn, accountErrorFn);

      /**
      * @name accountSuccessFn
      * @desc Redirect to index and display success message
      **/
      function accountSuccessFn(data, status, headers, config){
        Account.unauthenticate();
        Alert.setAlert('Account successfully deleted.', 'success');
        Navigation.goHome(true);
      }

      /**
      * @name accountErrorFn
      * @desc Display error message
      **/
      function accountErrorFn(data, status, headers, config){
        Alert.setAlert(data.error, 'danger');
      }
    }

    /**
    * @name update
    * @desc Update the user's account
    * @memeberOf app.controllers.AccountUpdateController
    **/
    function update(){
      Account.update(vm.account).then(accountSuccessFn, accountErrorFn);

      /**
      * @name accountSuccessFn
      * @desc Display success message
      **/
      function accountSuccessFn(data, status, headers, config){
        Account.setAuthenticatedAccount(data.data);
        Alert.setAlert('Account successfully updated.', 'success');
        // in case username was updated
        Navigation.display('/account/+' + data.data.username + '/update',  true, true);
      }

      /**
      * @name accountErrorFn
      * @desc Display error message
      **/
      function accountErrorFn(data, status, headers, config){
        var messages = '';
        for (var error in data.data){
          messages = messages + data.data[error] + '\n';
        }
        Alert.setAlert(messages, 'danger');
      }
    }
  }
})();