'use strict';

/**
 * @ngdoc service
 * @name useressionService.userRequest
 * @description
 * # useressionService
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
    newUser: function(nameUser, pass) {
      // Add a new user
      return {
        name: nameUser,
        pass: pass
      };
    },
    clearUser: function() {
      window.sessionStorage.removeItem('user');      
      window.location.reload();
      window.location.href = "#/";
    }
  }
})