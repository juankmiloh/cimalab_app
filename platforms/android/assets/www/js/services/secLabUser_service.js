'use strict';

/**
 * @ngdoc service
 * @name secLabUsersService.secLabUsersRequest
 * @description
 * # secLabUsersRequest
 * Factory in the secLabUsersService.
 */
angular.module('secLabUsersService',[])
.factory('secLabUsersRequest', function ($http) {
  var path = "http://192.168.0.30:8888/cimalab_backend/";
  return {
    getSession: function (script,elemento) {
      return $http.post(path+script,elemento);
    }
  };
});