!function(){"use strict";function t(t,n,o,r){function c(){function t(t,n,o,r){e.account=t.data}function c(t,n,o,c){r.setAlert(t.error,"danger")}var a=n.username.substr(1);o.get(a).then(t,c)}var e=this;e.account=void 0,c()}angular.module("app.controllers").controller("AccountDetailsController",t),t.$inject=["$location","$routeParams","Account"],"Alert",t.$inject=["$location","$routeParams","Account","Alert"]}();