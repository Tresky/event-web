/**
 * File: loginController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * login page of the application.
 */

import './loginStyles.styl'

angular.module('app')
  .controller('LoginController', function ($log, $timeout, $auth, $location) {
    let vm = this

    vm.submit = () => {
      $auth.login(vm.loginData)
        .then((response) => {
          $log.log('Success', response)
          $timeout(() => {
            $location.path('/dashboard')
          })
        }, (response) => {
          $log.log('Failure', response)
        })
    }
  }
)
