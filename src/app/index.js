import angular from 'angular'
import uiRouter from 'angular-ui-router'

import './styles/index.styl'

angular.module('app', [
  // 'angularMoment',
  // 'ngAnimate',
  // 'ui.bootstrap',
  uiRouter
  // 'vModal'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  ($stateProvider, $urlRouterProvider, $locationProvider) => {
    // Allow the use of HTML5 state modes
    $locationProvider.html5Mode(true)

    // Define all of the application states
    $stateProvider
      .state('home', {
        url: '/',
        template: require('./components/home/homeView.html'),
        controller: 'HomeController',
        controllerAs: 'vm'
      })

    // If no states were matched, redirect to home
    $urlRouterProvider.otherwise('home')
  }])

require('./services/index.js')
require('./components/index.js')
require('./shared/index.js')
