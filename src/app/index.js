import angular from 'angular'
import uiRouter from 'angular-ui-router'
import * as _ from 'lodash'

import './styles/index.styl'

angular.module('app', [
  // 'angularMoment',
  // 'ngAnimate',
  // 'ui.bootstrap',
  uiRouter
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
        .state('logout', {
          url: '/logout',
          onEnter: ['$state', '$auth', ($state, $auth) => {
            $auth.logout()
            $state.go('login')
          }]
        })

      // If no states were matched, redirect to home
      $urlRouterProvider.otherwise('enter')

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

require('./services/index.js')
require('./components/index.js')
require('./shared/index.js')
