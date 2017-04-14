/**
 * File: RsoController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * rso page of the application.
 */

import './rsoStyles.styl'

angular.module('app')
  .controller('RsoController', function ($log, $location, Rso, $stateParams, $state, University, Event) {
    var vm = this
    vm.test = 'testing'
    vm.uniId = $stateParams.uniId
    vm.rsoId = $stateParams.rsoId

    vm.subscribe = () => {
      $log.log('Function was called')
    }

    vm.getEventDetails = function (eventId) {
      $location.path('university/' + vm.uniId + '/event/' + eventId);
    }

    vm.init = function () {

      Rso.findById(vm.uniId, vm.rsoId)
        .then((response) => {
          vm.rsoData = response
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })

      University.findById(vm.uniId)
        .then((response) => {
          vm.uniData = response
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })

      Event.findAll(vm.uniId)
        .then((response) => {
          vm.eventData = response
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })
    }

    vm.init()
  }
)
