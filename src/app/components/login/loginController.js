/**
 * File: loginController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * login page of the application.
 */

import './loginStyles.styl'

angular.module('app')
  .controller('LoginController', function ($log, $timeout, $auth, $location, $window, $rootScope) {
    let vm = this

    vm.submit = () => {
      $auth.login(vm.loginData)
        .then((response) => {
          $log.log('Success', response)
          $window.localStorage.currentUser = angular.toJson(response.data.user)
          $rootScope.currentUser = angular.fromJson($window.localStorage.currentUser)
          $timeout(() => {
            $location.path('/dashboard')
          })
        })
        .catch((response) => {
          $log.log('Failed to login', response)
        })
    }
  }
)
