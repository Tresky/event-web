import angular from 'angular'
import angularCookies from 'angular-cookie'
import satellizer from 'satellizer'
import uiRouter from 'angular-ui-router'
import _ from 'lodash'

import './styles/index.styl'

angular.module('app', [
  // 'angularMoment',
  // 'ngAnimate',
  // 'ui.bootstrap',
  angularCookies,
  satellizer,
  uiRouter
  // 'vModal'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$authProvider',
  ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) => {
    // Allow the use of HTML5 state modes
    $locationProvider.html5Mode(true)

    let loginRequired = ['$q', '$state', '$auth', ($q, $state, $auth) => {
      let deferred = $q.defer()
      if ($auth.isAuthenticated()) {
        deferred.resolve()
      } else {
        $state.go('login')
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
      .state('event', {
        url: '/event',
        template: require('./components/event/eventView.html'),
        controller: 'EventController',
        controllerAs: 'vm'
      })

    // If no states were matched, redirect to home
    $urlRouterProvider.otherwise('home')

    $authProvider.baseUrl = 'http://localhost:3000/api'
    $authProvider.loginUrl = '/auth/login'
  }])

require('./services/index.js')
require('./components/index.js')
require('./shared/index.js')
