/**
* Account
* @namespace app.services
* @desc Provide objects for interacting with django Account api
**/
  'use strict';

  angular
    .module('app.services')
    .factory('Account', Account)

  Account.$inject = ['$cookies', '$http', 'Navigation', 'Alert'];

  /**
  * @namespace Account
  * @returns {Factory}
  **/
  function Account($cookies, $http, Navigation, Alert){

    var Account = {
      create: create,
      destroy: destroy,
      get: get,
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate,
      update: update

    };

    return Account;

    /////////////// API interaction methods //////////
    /**
    * @name create
    * @desc Try to create a new account object to be sent to django api for creation in db
    * @param {string} username For the new account
    * @param {string} password
    * @param {string} email
    * @param {string} first_name (optional)
    * @param {string} last_name (optional)
    * @returns {Promise}
    * @memberOf app.services.Account
    **/
    function create(email, password, username, first_name, last_name){
      return $http.post('/account/api/v1/accounts/', {
        username: username,
        password: password,
        email: email,
        first_name: first_name,
        last_name: last_name
      }).then(createSuccessFn, createErrorFn);

      /**
      * @name createSuccessFn
      * @desc Log in user after account created
      **/
      function createSuccessFn(data, status, headers, config){
        Account.login(email, password);
      }

      /**
      * @name createErrorFn
      * @desc Display error
      **/
      function createErrorFn(data, status, headers, config){
        Alert.setMessage(data.data.details, 'danger');
      }
    }

    /**
    * @name destroy
    * @desc Deletes the given account
    * @param {object} The account to be deleted
    * @returns {Promise}
    * @memberOf app.services.Account
    **/
    function destroy(account){
      return $http.delete('/account/api/v1/accounts/' + account.username + '/');
    }

    /**
    * @name get
    * @desc Gets the account with the username `username`
    * @param {string} username The username of the account to get
    * @returns {Promise}
    * @memberOf app.services.Account
    **/
    function get(username){
      return $http.get('/account/api/v1/accounts/' + username + '/');
    }

    /**
    * @name getAuthenticatedAccount
    * @desc Return current authenticated account object
    * @returns {object|undefined} Authenticated account if it exists, else `undefined`
    * @memberOf app.services.Account
    **/
    function getAuthenticatedAccount(){
      if(!$cookies.get('authenticatedAccount')){
        return
      }
      return JSON.parse($cookies.get('authenticatedAccount'));
    }

    /**
    * @name isAuthenticated
    * @desc Check if the current user is authenticated
    * @returns {boolean} True if user is authenticated, else false
    * @memberOf app.services.Account
    **/
    function isAuthenticated(){
      return !!$cookies.get('authenticatedAccount');
    }

    /**
    * @name login
    * @desc Send login info to django api
    * @param {string} email The email entered by the user
    * @param {string} password The password entered by the user
    * @returns {Promise}
    * @memberOf app.services.Account
    **/
    function login(email, password){
      return $http.post('/account/api/v1/auth/login/', {
        email: email,
        password: password
      }).then(loginSuccessFn, loginErrorFn);

      /**
      * @name loginSuccessFn
      * @desc Set the authenticated account and redirect back
      **/
      function loginSuccessFn(data, status, headers, config){
        Account.setAuthenticatedAccount(data.data);
        Alert.setAlert('User ' + email + ' successfully logged in.', 'success');
        Navigation.goHome(true, true);
      }

      /**
      * @name loginErrorFn
      * @desc Display error message
      **/
      function loginErrorFn(data, status ,headers, config){
        Alert.setAlert(data.data.message, 'danger');
        Navigation.display('/account/login', false);
      }
    }

    /**
    * @name logout
    * @desc Log the user out
    * @returns {Promise}
    * @memberOf app.services.Account
    **/
    function logout(){
      return $http.post('/account/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

        /**
        * @name logoutSuccessFn
        * @desc Unauthenticate user and redirect to index w/ reload
        **/
        function logoutSuccessFn(data, headers, status, config){
          Account.unauthenticate();
          Alert.setAlert('User successfully logged out.', 'success');
          Navigation.goHome(true, true);
        }

        /**
        * @name logoutErrorFn
        * @desc Display error message
        **/
        function logoutErrorFn(data, headers, status, config){
          Alert.setAlert(data.error, 'danger');
        }
    }

    /**
    * @name setAuthenticatedAccount
    * @desc Stringify account object and store as a cookie
    * @param {Object} user The account object to be stored
    * @memeberOf app.services.Account
    **/
    function setAuthenticatedAccount(account){
      $cookies.put('authenticatedAccount', JSON.stringify(account));
    }

    /**
    * @name unauthenticate
    * @desc Delete the user object coookie
    * @memberOf app.services.Account
    **/
    function unauthenticate(){
      delete $cookies.authenticatedAccount;
    }

    /**
    * @name update
    * @desc Update the account
    * @param {Object} account The account to be updated
    * @returns {Promise}
    * @memberOf app.services.Account
    **/
    function update(account){
      return $http.put('/account/api/v1/accounts/' + account.username + '/', account);
    }
  }