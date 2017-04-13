/**
 * File: RsoController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * rso page of the application.
 */

import './rsoStyles.styl'

angular.module('app')
  .controller('RsoController', function ($log, $location, Rso, $stateParams, $state, University) {
    var vm = this
    vm.test = 'testing'

    vm.subscribe = () => {
      $log.log('Function was called')
    }

    vm.init = function () {

      // vm.rsoData = {name: "meh", description: "What do you want?", university_name: "Trump University", privacy_level: "Public"}
      vm.eventData  = [{name: "event 1"}, {name: "event 2"}, {name: "event 3"}, {name: "event 4"}]

      var uniId = $stateParams.uniId
      var rsoId = $stateParams.rsoId

      Rso.findById(uniId, rsoId)
        .then((response) => {
          vm.rsoData = response
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })

      University.findById(uniId)
        .then((response) => {
          vm.uniData = response
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })
    }

    vm.init()
  }
)
