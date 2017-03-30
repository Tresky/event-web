/**
 * File: RsoController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * rso page of the application.
 */

import './rsoStyles.styl'

angular.module('app')
  .controller('RsoController', function ($log) {
    var vm = this
    vm.test = 'testing'
    vm.func = () => {
      $log.log('Function was called')
    }
  }
)
