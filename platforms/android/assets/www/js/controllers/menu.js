'use strict';
/**
 * @ngdoc function
 * @name cimaLabApp.controller:menuCtrl
 * @description
 * # menuCtrl
 * Controller of the cimaLabApp
 */
angular.module('cimaLabApp')
/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('Users', function() {
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
.controller('menuCtrl', function($scope, $timeout, $ionicModal, Users, $ionicSideMenuDelegate) {
  //JSON DE LAS VISTAS DISPONIBLES EN EL MENU LATERAL
  $scope.views = [
                  {url: 'main'},
                  {url: 'london'},
                  {url: 'paris'}
                 ];

  //FUNCION PARA ABRIR EL MENU LATERAL IZQUIERDO
  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  //FUNCION PARA ABRIR LA VISTA SELECCIONADA
  $scope.selectView = function(view) {
    $scope.activeView = view; //DEJAR SOMBREADA LA VISTA
    var vista = view.url;
    window.location.href = "#/"+vista+"";
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  /*=============================================
  * CREACIÓN DE SESIÓN DE USUARIO
  *==============================================*/

  // CARGAR O INICIALIZAR USUARIO
  $scope.users = Users.all();
  console.log($scope.users);

  // FUNCION PARA CREAR UNA NUEVA SESION DE USUARIO
  var createUser = function(userName, pass) {
    var newUser = Users.newUser(userName, pass);
    $scope.users.push(newUser);
    Users.save($scope.users);
  }

  // FUNCION PARA ELIMINAR LA SESION DE USUARIO
  $scope.logoutUser = function() {
    Users.clearUser();
  }

  // FUNCION PARA CREAR LA SESION DE USUARIO SE UTILIZA $timeout PARA APLAZAR LA EJECUCION
  // PARA QUE TODO SE INICIALICE CORRECTAMENTE
  $timeout(function() {
    if($scope.users.length == 0) {
      while(true) {
        var userName = prompt('Ingrese su usuario:');
        var pass = prompt('Ingrese su contraseña:');
        if(userName && pass) {
          createUser(userName, pass);
          break;
        }
      }
    }
  }, 1000);
})