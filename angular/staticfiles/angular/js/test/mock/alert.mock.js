angular.module('AlertMock', [])
  .provider('Alert', function(){
    this.$get = function() {
      return {
        getMessage: function() {},
        getType: function() {},
        setAlert: function(message, type) {}
      };
    };
  });