/// <reference path="bower_components/angular/angular.js" />

var app = angular.module('RealEstateApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '../views/Home.html',
            controller: 'homeController'
        })
        .when('/trendingProp', {
            templateUrl: '../views/TrendingProp.html',
            controller: 'trendingPropController'
        })
        .when('/viewProp/:id', {
            templateUrl: '../views/ViewProperty.html',
            controller: 'viewPropController'
        })
        .when('/submitProperty', {
            templateUrl: '../views/SubmitProperty.html',
            controller: 'submitPropertyController'
        })
        .when('/showProperties/:type/:location/:rent/:buy', {
            templateUrl: '../views/ShowProperties.html',
            controller: 'showPropertiesController'
        })
        .when('/register', {
            templateUrl: '../views/register.html',
            controller: 'registerController'
        })
        .otherwise({
            redirectTo: '/home'
        })

}])
app.run(function($rootScope) {
    $rootScope.loggedIn = false;
})