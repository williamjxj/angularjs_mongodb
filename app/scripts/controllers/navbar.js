'use strict';

angular.module('afApp')
    .controller('NavbarCtrl', function ($scope, $location) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        },{
            'title': 'List',
            'link': '/list'
        }];

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
