'use strict';
/**
 * @ngdoc function
 * @name cimaLabApp.controller:menuCtrl
 * @description
 * # menuCtrl
 * Controller of the cimaLabApp
 */
angular.module('cimaLabApp')
.controller('menuCtrl', function($scope, $timeout, $ionicModal, userRequest, $ionicSideMenuDelegate) {
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

  $scope.showHints = true;

  /*=============================================
  * CREACIÓN DE SESIÓN DE USUARIO
  *==============================================*/

  // CARGAR O INICIALIZAR USUARIO
  $scope.user = userRequest.all();
  console.log($scope.user);
  if($scope.user.length != 0) {
    $scope.nombreUsuario = ($scope.user.name).toUpperCase();
  }else{
    // FUNCION PARA CREAR LA SESION DE USUARIO SE UTILIZA $timeout PARA APLAZAR LA EJECUCION
    // PARA QUE TODO SE INICIALICE CORRECTAMENTE
    $timeout(function() {
      if($scope.user.length == 0) {
        while(true) {
          abrirLoginModal();
          break;
        }
      }
    }, 1000);
  }

  // FUNCION PARA CREAR UNA NUEVA SESION DE USUARIO
  $scope.createUser = function(data_user) {
    var userName = data_user.name;
    var pass = data_user.pass;
    var newUser = userRequest.newUser(userName, pass);
    userRequest.save(newUser);
    $scope.nombreUsuario = userName.toUpperCase();
    closeLoginModal();
  }

  // FUNCION PARA ELIMINAR LA SESION DE USUARIO
  $scope.logoutUser = function() {
    userRequest.clearUser();
  }

  /*=============================================
  * OPCIONES MODAL LOGIN USUARIO
  *==============================================*/

  //CREAMOS EL MODAL
  $ionicModal.fromTemplateUrl('./views/login.html', function(modal) {
    $scope.loginModal = modal;
  }, {
    scope: $scope
  });

  var abrirLoginModal = function() {
    $scope.loginModal.show();
  };

  var closeLoginModal = function() {
    $scope.loginModal.hide();
  }
})