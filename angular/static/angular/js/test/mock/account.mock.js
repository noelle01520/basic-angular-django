angular.module('AccountMock', [])
  .provider('Account', function(){
    this.$get = function() {
      return {
        create: function() {},
        destroy: function() {},
        get: function() {},
        getAuthenticatedAccount: function(){},
        isAuthenticated: function(){},
        login: function(){},
        logout: function(){},
        setAuthenticatedAccount: function(){},
        unauthenticate: function(){},
        update: function(){}
      };
    };
  });