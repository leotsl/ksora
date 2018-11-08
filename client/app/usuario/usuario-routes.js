(function (ng) {
    "use strinct"

    var app = ng.module('ksora');
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state("usuarioForm", {
                url: "/", controller: "UsuarioController",
                templateUrl: "app/usuario/usuario-form.html"
            });

        $urlRouterProvider.when('', '/');

    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ]);

}(angular));