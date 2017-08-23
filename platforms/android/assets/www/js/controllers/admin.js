'use strict';

/**
 * @ngdoc function
 * @name cimaLabApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the cimaLabApp
 */
angular.module('cimaLabApp')
.controller('AdminCtrl', function ($scope, $http) {
	this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
	var self = this;
	self.title="PAGINA ADMINISTRADOR";
})