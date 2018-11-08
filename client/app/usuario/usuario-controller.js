(function (ng) {
	'use strict';

	ng.module('controllers')
		.controller('UsuarioController', ['$scope', function ($scope) {
			$scope.tituloTela = 'Cadastro de Usuário';
		}]);

})(angular);
