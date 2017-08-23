'use strict';
/**
 * @ngdoc function
 * @name cimaLabApp.controller:menuCtrl
 * @description
 * # menuCtrl
 * Controller of the cimaLabApp
 */
angular.module('cimaLabApp')
.controller('menuCtrl', function($scope, $timeout, $ionicModal, $http, $ionicSideMenuDelegate, userRequest, secLabUsersRequest) {
  //FUNCION PARA ABRIR EL MENU LATERAL IZQUIERDO
  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  //FUNCION PARA ABRIR LA VISTA SELECCIONADA
  $scope.selectView = function(view) {
    $scope.activeView = view; //DEJAR SOMBREADA LA VISTA
    window.location.href = "#/"+view.url+"";
    $scope.vistaSelect = view.name;
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  $scope.showHints = true;

  /*=============================================
  * CREACIÓN DE SESIÓN DE USUARIO EN EL DISPOSITIVO
  *==============================================*/

  // CARGAR O INICIALIZAR USUARIO
  $scope.user = userRequest.all();
  console.log($scope.user);
  if($scope.user.length != 0) {
    $scope.nombreUsuario = ($scope.user.name).toUpperCase();
    $scope.rolUsuario = ($scope.user.rol).toUpperCase();
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
  $scope.createUser = function(new_user) {
    console.log(new_user);
    var userName = new_user.name;
    var userRol = new_user.rol;
    userRequest.save(new_user);
    $scope.nombreUsuario = userName.toUpperCase();
    $scope.rolUsuario = userRol.toUpperCase();
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

  /*=============================================
  * VALIDACIÓN DEL USUARIO CON LA BD
  *==============================================*/

  $scope.validarUsuario = function(data_user) {
    var userName = data_user.name;
    var pass = data_user.pass;
    var parametros = {user : userName, password : pass};
    secLabUsersRequest.getSession('iniciar_sesion.php',parametros)
    .then(function(response) {
      console.log(response.data);
      var estado = response.data[0].estado;
      var rol = response.data[0].rol_usuario;

      if (estado == "logueado") {
        var newUser = userRequest.newUser(userName, pass, rol);
        $scope.createUser(newUser);
        if (rol == "Administrador") {
          //JSON DE LAS VISTAS DISPONIBLES EN EL MENU LATERAL
          $scope.views = [
                          {name : 'Ingresos a almacen', url: 'ingresos_almacen'},
                          {name : 'Salidas del almacen', url: 'salidas_almacen'},
                          {name : 'Verificar Proceso', url: 'verificar_proceso'}
                         ];
          window.location.href = "#/admin";
        }
        if (rol == "Clientes") {
          //JSON DE LAS VISTAS DISPONIBLES EN EL MENU LATERAL
          $scope.views = [
                          {name : 'Consultar Equipo', url: 'consultar_equipo'},
                          {name : 'Consultar Ordenes', url: 'consultar_ordenes'},
                          {name : 'Solicitudes', url: 'solicitudes'}
                         ];
          window.location.href = "#/cliente";
        }
        if (rol == "Metrologos") {
          //JSON DE LAS VISTAS DISPONIBLES EN EL MENU LATERAL
          $scope.views = [
                          {name : 'Ingresos a almacen', url: 'ingresos_almacen'},
                          {name : 'Salidas del almacen', url: 'salidas_almacen'},
                          {name : 'Verificar Proceso', url: 'verificar_proceso'}
                         ];
          window.location.href = "#/metrologo";
        }
      }
      if (estado == "Contraseña Incorrecta." || estado == "Usuario no existe.") {
        $scope.validar_usuario = estado;
      }
    });
  }

  $scope.esconderTextoValidar = function() {
    $scope.validar_usuario = "";
  }
})