/**
* Alert
* @namespace app.directives
**/
  'use strict';

  angular
    .module('app.directives')
    .directive('alert', alert);

  function alert(){

    var directive = {
      controller: 'AlertController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        message: '=',
        type: '='
      },
      templateUrl: '/static/templates/layout/alert.html'
    };

    return directive;
  }