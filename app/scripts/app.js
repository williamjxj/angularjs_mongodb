'use strict';

// http://jsfiddle.net/sawsa/11/
// http://jsfiddle.net/2zzzb/56/
var EmailApp = angular.module('afApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/main',
                controller: 'MainCtrl'
            })
            .when('/list', {
                templateUrl: 'partials/list',
                controller: 'ListCtrl',
                resolve: {
                    'MyServiceData': function(MyService) {
                        return MyService.promise;
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    })
    .constant('sortingOrder','name');

EmailApp.factory('Email', ['$resource', function($resource) {
    return $resource('/api/Email/:id', { id: '@id' }, { update: { method: 'PUT' } });
}]);

//http://plnkr.co/edit/GKg21XH0RwCMEQGUdZKH?p=preview
EmailApp.service('MyService', function($http){
    var myData = null;
    var promise = $http.get('/api/Email').success(function(data) {
        myData = data;
    });

    return {
        promise: promise,
        setData: function(data) {
            myData = data;
        },
        doStuff: function() {
            return myData;
        }
    }
})
var ListCtrl = function ListCtrl($scope, $filter, sortingOrder, Email, MyService) {
    // init
    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    /* not work
    Email.query(function(data) {
        console.log('++++++++++++++++++');
        console.log(data);
        $scope.items = data;
    });
    */

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        if(typeof haystack !== 'string'){
            haystack = haystack.toString();
        }
        if(typeof needle !== 'string') {
            needle = needle.toString();
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        if(! $scope.items) {
            $scope.items = MyService.doStuff();
        }

        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };

    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();

    // change sorting order
    $scope.sort_by = function(newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

        // icon setup
        $('th i').each(function(){
            // icon reset
            $(this).removeClass().addClass('icon-sort');
        });
        if ($scope.reverse)
            $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-up');
        else
            $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-down');
    };
};

ListCtrl.$inject = ['$scope', '$filter', 'sortingOrder', 'Email', 'MyService'];
