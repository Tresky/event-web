/**
 * File: UniversityController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * university page of the application.
 */

import './universityStyles.styl'

angular.module('app')
  .controller('UniversityController', function ($log) {
    var vm = this
    vm.test = 'testing'
    vm.func = () => {
      $log.log('Function was called')
    }
  }
)
