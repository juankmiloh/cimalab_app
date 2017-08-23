// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cimaLabApp',
  [
    'ionic',
    'ngMaterial',
    'ngMessages',
    'ngRoute',
    'userSessionService',
    'secLabUsersService'
  ])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
  // .when("/", {
  //   templateUrl: 'views/menu.html'
  // })
  .when("/admin", {
    templateUrl: 'views/admin.html',
    controller: 'AdminCtrl',
    controllerAs: 'admin'
  })
  .when("/ingresos_almacen", {
    templateUrl : 'views/ingresos_almacen.html',
  })
  .when("/salidas_almacen", {
    templateUrl : 'views/salidas_almacen.html',
  })
  .when("/cliente", {
    templateUrl: 'views/cliente.html'
  })
  .when("/metrologo", {
    templateUrl: 'views/metrologo.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}])