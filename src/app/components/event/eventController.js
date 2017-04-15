/**
 * File: EventController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * event pages of the application.
 */

import './eventStyles.styl'

angular.module('app')
  .controller('EventController', function ($stateParams, $log, $state, Event) {
    var vm = this
    vm.test = 'testing'

    vm.getDate = (str) => {
      var val = new Date(str)
      return val.toLocaleDateString()
    }

    vm.getTime = (str) => {
      var val = new Date(str)
      return val.toLocaleTimeString()
    }

    vm.init = function () {
      vm.uniId = $stateParams.uniId
      vm.eventId = $stateParams.eventId

      $log.log("uniId: ", vm.uniId)
      $log.log("eventId: ", vm.eventId)

      Event.findById(vm.uniId, vm.eventId)
        .then((response) => {
          vm.eventData = response
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })

      vm.comments = [
        {
          name: 'Tyler Gauntlett',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          created_by_id: 1
        },
        {
          name: 'Frank Schiller',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          created_by_id: 2
        },
        {
          name: 'Tyler Gauntlett',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          created_by_id: 1
        },
        {
          name: 'Frank Schiller',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          created_by_id: 2
        },
        {
          name: 'Tyler Gauntlett',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          created_by_id: 1
        },
        {
          name: 'Frank Schiller',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          created_by_id: 2
        }
      ]
    }

    vm.init()

    vm.func = () => {
      $log.log('Function was called')
    }
  }
)
