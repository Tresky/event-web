/**
 * File: LoginController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * university register page of the application.
 */

import './universityRegisterStyles.styl'

angular.module('app')
  .controller('UniversityRegisterController', function ($log) {
    var vm = this
    vm.test = 'testing'
    vm.func = () => {
      $log.log('Function was called')
    }
  }
)
