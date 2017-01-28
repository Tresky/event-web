/**
 * File: HomeController.js
 * Type: ngController
 * Author: Tyler Petresky
 * Description: This controller is specific to the
 * home page of the application.
 */

import './homeStyles.styl'

angular.module('app')
  .controller('HomeController', function ($log) {
    var vm = this
    vm.test = 'testing'
    vm.func = () => {
      $log.log('Function was called')
    }
  }
)
