/**
* LayoutController
* @namespace app.controllers
**/
  'use strict';

  angular
    .module('app.controllers')
    .controller('LayoutController', LayoutController);

  LayoutController.$inject = ['$cookies', '$scope', 'Account', 'Navigation', 'Alert'];

  function LayoutController($cookies, $scope, Account, Navigation, Alert){
    var vm = this;

    vm.index = index;
    vm.logout = logout;

    activate();

    /**
    * @name activate
    * @desc Load alert message data
    * @memberOf app.controllers.LayoutController
    **/
    function activate(){

    }

    /**
    * @name index
    * @desc Display the index page
    * @memberOf app.controllers.LayoutController
    **/
    function index(){
      delete $cookies.appMessage;
      Alert.setAlert('','');
      Navigation.goHome(false);
    }

    /**
    * @name logout
    * @desc Log the user out
    * @memberOf app.controllers.LayoutController
    **/
    function logout(){
      Account.logout();
    }
  }