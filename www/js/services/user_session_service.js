'use strict';

/**
 * @ngdoc service
 * @name userSessionService.usersRequest
 * @description
 * # userSessionService
 * Factory in the usersRequest.
 */
angular.module('userSessionService', [])
/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('usersRequest', function() {
  return {
    all: function() {
      var userString = window.sessionStorage['users'];
      if(userString) {
        return angular.fromJson(userString);
      }
      return [];
    },
    save: function(users) {
      window.sessionStorage['users'] = angular.toJson(users);
    },
    newUser: function(nameUser, pass) {
      // Add a new user
      return {
        name: nameUser,
        pass: pass
      };
    },
    clearUser: function() {
      window.sessionStorage.removeItem('users');
      window.location.reload();
    }
  }
})