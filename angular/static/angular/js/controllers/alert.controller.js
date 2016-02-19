/**
* AlertController
* @namespace app.controllers
**/
  'use strict';

  angular
    .module('app.controllers')
    .controller('AlertController', AlertController);

  AlertController.$inject = ['$cookies', '$scope', 'Alert', 'Navigation'];

  function AlertController($cookies, $scope, Alert, Navigation){
    var vm = this;

    vm.message = Alert.getMessage();
    vm.type = Alert.getType();

    activate();

    /**
    * @name activate
    * @desc Populate message and type
    * @memberOf app.controllers.AlertController
    **/
    function activate(){

      $scope.$on('setAlert', function(){
        vm.message = Alert.getMessage();
        vm.type = Alert.getType();
      });

      $scope.$on('$routeChangeSuccess', function(event, data){
        if (data && data.params && !data.params.alert){
          vm.message = '';
          vm.type = '';
        }
      });

      if(!vm.message && $cookies.get('appMessage')){
        var appMessage = JSON.parse($cookies.get('appMessage'))
        vm.message = appMessage.message;
        vm.type = appMessage.type;
      }
    }
  }