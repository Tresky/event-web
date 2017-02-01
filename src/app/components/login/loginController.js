/**
 * File: LoginController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * login page of the application.
 */

import './loginStyles.styl'

angular.module('app')
  .controller('LoginController', function ($log) {
    var vm = this
    vm.test = 'testing'
    vm.func = () => {
      $log.log('Function was called')
    }
  }
)
