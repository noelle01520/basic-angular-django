!function(){"use strict";function e(e){function t(){return s.message}function r(){return s.type}function n(t,r){s.message=t,s.type=r,e.$broadcast("setAlert")}var s={message:"",type:"",getMessage:t,getType:r,setAlert:n};return s}angular.module("app.services").factory("Alert",e),e.$inject=["$rootScope"]}();