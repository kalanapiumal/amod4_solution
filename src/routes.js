(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/templates/home.template.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/templates/categories.template.html',
                controller: 'CategoryController',
                controllerAs: 'ctrl',
                resolve: {
                    categoriesList: ['MenuDataService', function (MenuDataService) {
                        var result = MenuDataService.getAllCategories();
                        return result;
                    }]
                }
            })
            .state('items', {
                url: '/items/{shortname}',
                templateUrl: 'src/templates/items.template.html',
                controller: 'ItemsController',
                controllerAs: 'ctrl',
                resolve: {
                    itemsList: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        var result =  MenuDataService.getItemsForCategory($stateParams.shortname);
                        return result;
                    }],
                }
            });
    }
})()
