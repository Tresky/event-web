import angular from 'angular'
import satellizer from 'satellizer'
import uiRouter from 'angular-ui-router'
import ngMap from 'ngmap'
import uiNotification from 'angular-ui-notification'
//import bootstrapUi from 'angular-ui-bootstrap'
import socialshare from 'angular-socialshare'

import * as _ from 'lodash'

import './styles/index.styl'

angular.module('app', [
  // 'angularMoment',
  // 'ngAnimate',
  // 'ui.bootstrap',
  ngMap,
  satellizer,
  uiRouter,
  uiNotification,
  socialshare
  //bootstrapUi,
  // 'vModal'

]).constant('_', _)
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$authProvider',
    '$windowProvider',
    ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $windowProvider) => {
      // Allow the use of HTML5 state modes
      $locationProvider.html5Mode(true)

      let loginRequired = ['$q', '$location', '$auth', ($q, $location, $auth) => {
        let deferred = $q.defer()
        if ($auth.isAuthenticated()) {
          deferred.resolve()
        } else {
          $location.path('/login')
        }
        return deferred.promise
      }]

      // Define all of the application states
      $stateProvider
        .state('home', {
          url: '/',
          template: require('./components/home/homeView.html'),
          controller: 'HomeController',
          controllerAs: 'homeCtrl',
          onEnter: ['$state', '$auth', ($state, $auth) => {
            if ($auth.isAuthenticated()) {
              $state.go('dashboard')
            }
          }]
        })
        .state('dashboard', {
          url: '/dashboard',
          template: require('./components/dashboard/dashboardView.html'),
          controller: 'DashboardController',
          controllerAs: 'dashCtrl',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('login', {
          url: '/login',
          template: require('./components/login/loginView.html'),
          controller: 'LoginController',
          controllerAs: 'loginCtrl',
          onEnter: ['$state', '$auth', ($state, $auth) => {
            if ($auth.isAuthenticated()) {
              $state.go('dashboard')
            }
          }]
        })
        .state('event', {
          url: '/university/:uniId/event/:eventId',
          template: require('./components/event/eventView.html'),
          controller: 'EventController',
          controllerAs: 'eventCtrl',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('university', {
          url: '/university/:uniId',
          template: require('./components/university/universityView.html'),
          controller: 'UniversityController',
          controllerAs: 'univCtrl',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('rso', {
          url: '/university/:uniId/rso/:rsoId',
          template: require('./components/rso/rsoView.html'),
          controller: 'RsoController',
          controllerAs: 'rsoCtrl',
          resolve: {
            loginRequired: loginRequired
          }
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
        .state('logout', {
          url: '/logout',
          onEnter: ['$state', '$auth', ($state, $auth) => {
            $auth.logout()
            $state.go('login')
          }]
        })

      // If no states were matched, redirect to home
      $urlRouterProvider.otherwise('home')

      let $window = $windowProvider.$get()

      // There isn't a better way to set this value more dynamically
      // due to contraints provided by the Satellizer package and Angular.
      let localUrls = ['localhost', '127.0.0.1', '192.168']
      if (_.includes(localUrls, $window.location.hostname)) {
        $authProvider.baseUrl = 'http://localhost:3000/api'
      } else {
        $authProvider.baseUrl = '/'
      }
      $authProvider.loginUrl = '/auth/login'
    }])
    .run(['$rootScope', '$auth', '$window', ($rootScope, $auth, $window) => {
      if ($auth.isAuthenticated()) {
        $rootScope.currentUser = angular.fromJson($window.localStorage.currentUser)
      }
    }])

require('./services/index.js')
require('./components/index.js')
require('./shared/index.js')
