'use strict';
/**
 * @ngdoc function
 * @name cimaLabApp.controller:menuCtrl
 * @description
 * # menuCtrl
 * Controller of the cimaLabApp
 */
angular.module('cimaLabApp')
.controller('menuCtrl', function($scope, $timeout, $ionicModal, usersRequest, $ionicSideMenuDelegate) {
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
    $scope.vistaSelect = vista;
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  /*=============================================
  * CREACIÓN DE SESIÓN DE USUARIO
  *==============================================*/

  // CARGAR O INICIALIZAR USUARIO
  $scope.users = usersRequest.all();
  console.log($scope.users);

  // FUNCION PARA CREAR UNA NUEVA SESION DE USUARIO
  var createUser = function(userName, pass) {
    var newUser = usersRequest.newUser(userName, pass);
    $scope.users.push(newUser);
    usersRequest.save($scope.users);
    $scope.nombreUsuario = userName.toUpperCase();
  }

  // FUNCION PARA ELIMINAR LA SESION DE USUARIO
  $scope.logoutUser = function() {
    usersRequest.clearUser();
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