/**
* Navigation
* @namespace app.services
**/
(function(){
  'use strict';

  angular
    .module('app.services')
    .factory('Navigation', Navigation);

  Navigation.$inject = ['$cookies', '$location', 'Alert'];

  function Navigation($cookies, $location, Alert){

    var Navigation = {
      display: display,
      goHome: goHome,
    };

    return Navigation;

    //////////////////

    function display(url,  reload, keepAlert){
      delete $cookies.remove('appMessage');
      if (keepAlert) {
        url = url + "?alert";
      }
      if (reload){
        $cookies.put('appMessage', JSON.stringify(Alert));
        window.location = url;
      } else {
        $location.path(url);
      }
    }

    function goHome(reload, keepAlert){
      display('/', reload, keepAlert);
    }

  }
})();