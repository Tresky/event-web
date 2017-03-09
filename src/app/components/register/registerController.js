/**
 * File: RegisterController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * register page of the application.
 */

import './registerStyles.styl'

angular.module('app')
  .controller('RegisterController', function ($log) {
    var vm = this
    vm.test = 'testing'
    vm.func = () => {
      $log.log('Function was called')
    }
  }
)
