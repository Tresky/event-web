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
      .state('login', {
        url: '/login',
        template: require('./components/login/loginView.html'),
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('event', {
        url: '/event',
        template: require('./components/event/eventView.html'),
        controller: 'EventController',
        controllerAs: 'vm'
      })
      .state('register', {
        url: '/register',
        template: require('./components/register/registerView.html'),
        controller: 'RegisterController',
        controllerAs: 'registerCtrl'
      })
      .state('universityRegister', {
        url: '/university-register',
        template: require('./components/universityRegister/universityRegisterView.html'),
        controller: 'UniversityRegisterController',
        controllerAs: 'univRegisterCtrl'
      })

    // If no states were matched, redirect to home
    $urlRouterProvider.otherwise('home')
  }])

require('./services/index.js')
require('./components/index.js')
require('./shared/index.js')
