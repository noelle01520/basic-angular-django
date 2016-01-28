(function(){
  'use strict';

  angular
    .module('app.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  **/
  function config($routeProvider){
    $routeProvider
      .when('/account/create', {
        controller: 'AccountController',
        controllerAs: 'vm',
        templateUrl: '/static/templates/account/create.html'
      })
      .when('/account/login', {
        controller: 'AccountController',
        controllerAs: 'vm',
        templateUrl: '/static/templates/account/login.html'
      })
      .when('/', {
        controller: 'LayoutController',
        controllerAs: 'vm',
        templateUrl: '/static/templates/layout/index.html'
      })
      .when('/account/+:username', {
        controller: 'AccountDetailsController',
        controllerAs: 'vm',
        templateUrl: '/static/templates/account/account.html'
      })
      .when('/account/+:username/update', {
        controller: 'AccountUpdateController',
        controllerAs: 'vm',
        templateUrl: '/static/templates/account/update.html'
      })
      .otherwise('/');
  }
})();