/**
 * File: EventController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * event pages of the application.
 */

import './eventStyles.styl'

angular.module('app')
  .controller('EventController', function ($log, Event, Comment, University, $stateParams) {
    var vm = this
    vm.test = 'testing'
    vm.uniId = $stateParams.uniId
    vm.eventId = $stateParams.eventId

    vm.eventDescr = ['Event1', 'Event2', 'Event3']

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
