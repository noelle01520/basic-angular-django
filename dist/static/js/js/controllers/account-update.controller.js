!function(){"use strict";function t(t,e,n,c,a,r){function o(){function t(t,e,n,c){i.account=t.data}function n(t,e,n,c){a.setAlert(t.error,"danger")}var o=c.getAuthenticatedAccount(),u=e.username.substr(1);o&&o.username==u||r.goHome("There was an error accessing that account.","alert alert-danger alert-dismissible",!1),i.account=c.get(u).then(t,n)}function u(){function t(t,e,n,o){c.unauthenticate(),a.setAlert("Account successfully deleted.","success"),r.goHome(!0)}function e(t,e,n,c){a.setAlert(t.error,"danger")}c.destroy(i.account).then(t,e)}function s(){function t(t,e,n,c){a.setAlert("Account successfully updated.","success")}function e(t,e,c,r){var o=[],u=t.config.data;for(var s in u)t.data[s]&&o.push(s.charAt(0).toUpperCase()+s.slice(1)+": "+t.data[s]+"<br />");a.setAlert(n.trustAsHtml(o),"danger")}c.update(i.account).then(t,e)}var i=this;i.account=void 0,i.destroy=u,i.update=s,o()}angular.module("app.controllers").controller("AccountUpdateController",t),t.$inject=["$location","$routeParams","$sce","Account","Alert","Navigation"]}();