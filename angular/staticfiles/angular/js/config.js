
  angular
    .module('app.config')
    .config(config);

  config.$inject = ['$locationProvider'];

  function config($locationProvider){
    $locationProvider.html5Mode(true);
  }
