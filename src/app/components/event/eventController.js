/**
 * File: EventController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * event pages of the application.
 */

import './eventStyles.styl'

angular.module('app')
  .controller('EventController', function ($log, $scope) {
    var vm = this
    vm.test = 'testing'

    $scope.eventDescr=['Event1', 'Event2', 'Event3']

    vm.func = () => {
      $log.log('Function was called')
    }
  }
)
