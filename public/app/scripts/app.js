'use strict';

/**
 * @ngdoc overview
 * @name petsApp
 * @description
 * # petsApp
 *
 * Main module of the application.
 */
angular
  .module('petsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'datatables',
    'datatables.bootstrap'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/pets', {
        templateUrl: 'views/pets.html',
        controller: 'PetsCtrl',
        controllerAs: 'pets'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
