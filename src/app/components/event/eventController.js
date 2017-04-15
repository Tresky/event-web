/**
 * File: EventController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * event pages of the application.
 */

import './eventStyles.styl'

angular.module('app')
  .controller('EventController', function ($log, Event, Comment, University, $stateParams, $state) {
    var vm = this
    vm.test = 'testing'
    vm.uniId = $stateParams.uniId
    vm.eventId = $stateParams.eventId

    vm.getDate = (str) => {
      var val = new Date(str)
      return val.toLocaleDateString()
    }

    vm.getTime = (str) => {
      var val = new Date(str)
      return val.toLocaleTimeString()
    }

    vm.init = function () {

      Event.findById(vm.uniId, vm.eventId)
        .then((response) => {
          vm.eventData = response
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

      Comment.findAll(vm.uniId, vm.eventId)
        .then((response) => {
          vm.comments = response
          console.log('asdf');
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })
    }

    vm.init()

    vm.func = () => {
      $log.log('Function was called')
    }
  }
)
