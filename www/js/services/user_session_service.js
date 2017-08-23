'use strict';

/**
 * @ngdoc service
 * @name userSessionService.userRequest
 * @description
 * # userSessionService
 * Factory in the userRequest.
 */
angular.module('userSessionService', [])
/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('userRequest', function() {
  return {
    all: function() {
      var usertring = window.sessionStorage['user'];
      if(usertring) {
        return angular.fromJson(usertring);
      }
      return [];
    },
    save: function(user) {
      window.sessionStorage['user'] = angular.toJson(user);
    },
    newUser: function(nameUser, password, tipoUser) {
      // Add a new user
      return {
        name: nameUser,
        pass: password,
        rol: tipoUser
      };
    },
    clearUser: function() {
      window.sessionStorage.removeItem('user');      
      window.location.reload();
      // window.location.href = "#/";
    }
  }
})