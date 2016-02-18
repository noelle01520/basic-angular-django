angular.module('NavigationMock', [])
  .provider('Navigation', function(){
    this.$get = function() {
      return {
        display: function() {},
        goHome: function() {},
      };
    };
  });