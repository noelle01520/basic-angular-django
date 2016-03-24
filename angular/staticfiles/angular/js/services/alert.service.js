/**
* Alert
**/
  'use strict';

  angular
    .module('app.services')
    .factory('Alert', Alert);

  Alert.$inject = ['$rootScope'];

  function Alert($rootScope){
    var Alert = {
      message: '',
      type: '',
      getMessage: getMessage,
      getType: getType,
      setAlert: setAlert
    };

    return Alert;

    ///////////////////

    /**
    * @name getMessage
    * @desc Return alert message text
    * @memberOf app.services.Alert
    **/
    function getMessage(){
      return Alert.message;
    }

    /**
    * @name getType
    * @desc Return the type of this alert
    * @memberOf app.services.Alert
    **/
    function getType(){
      return Alert.type;
    }

    /**
    * @name setMessage
    * @desc Set the message values
    * @memberOf app.services.Alert
    **/
    function setAlert(message, type){
      Alert.message = message;
      Alert.type = type;
      $rootScope.$broadcast('setAlert');
    }
  }