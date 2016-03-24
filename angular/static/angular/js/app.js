  'use strict';

  angular
    .module('app', [
      'app.config',
      'app.controllers',
      'app.directives',
      'app.routes',
      'app.services',
    ]);

  /*
  * Config
  */
  angular
    .module('app.config', []);

  /*
  * Controllers
  */
  angular
    .module('app.controllers', ['ngCookies']);

  /*
  * Directives
  */
  angular
    .module('app.directives', []);
  /*
  * Routes
  */
  angular
    .module('app.routes', ['ngRoute']);

  /*
  * Services
  */
  angular
    .module('app.services', ['ngCookies']);

  /*
  * Application
  */
  angular
    .module('app')
    .run(run);

  run.$inject = ['$http', '$cookies'];

  /**
  * @name run
  * @desc Update xsrf $http headers to align with Django's defaults
  **/
  function run($http, $cookies){
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
    $http.defaults.withCredentials = true;
  }
