(function (ng) {
    'use strict';
    
    ng.module('componentes')
    .directive('botao-menu-usuario', function() {
        return {
            restrict: 'E',
            scope: {
               
            },
            template: 'botao-menu-usuario.html'
        };
    })


})(angular);