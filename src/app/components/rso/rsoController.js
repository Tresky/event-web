/**
 * File: RsoController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * rso page of the application.
 */

import './rsoStyles.styl'

angular.module('app')
  .controller('RsoController', function ($log, $location, Rso, $stateParams, $state, University, Subscription, Event) {
    var vm = this
    vm.test = 'testing'
    vm.uniId = $stateParams.uniId
    vm.rsoId = $stateParams.rsoId

    vm.subscribe = () => {
      var request = {
        rsoId: $stateParams.rsoId,
      }

      Subscription.create(request)
        .then((response) => {
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
        })
    }

    vm.viewEvent = (eventId) => {
      $location.path('/university/' + $stateParams.uniId + "/event/" + eventId);
    }

    vm.getEventDetails = function (eventId) {
      $location.path('university/' + vm.uniId + '/event/' + eventId);
    }

    vm.init = function () {

      Rso.findById(vm.uniId, vm.rsoId)
        .then((response) => {
          vm.rsoData = response
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })

      University.findById(vm.uniId)
        .then((response) => {
          vm.uniData = response
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })

      Event.findAll(uniId, {rsoId: vm.rsoId})
        .then((eventRes) => {
          vm.eventData = eventRes
        }, (eventRes) => {
          $log.log('Event findall Failure', eventRes)
        })
    }

    vm.init()
  }
)
