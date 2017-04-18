/**
 * File: RsoController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * rso page of the application.
 */

import './rsoStyles.styl'

angular.module('app')
  .controller('RsoController', function ($log, $location, Rso, $stateParams, $rootScope, $state, University, Subscription, Event) {
    var vm = this
    vm.test = 'testing'
    vm.uniId = $stateParams.uniId
    vm.rsoId = $stateParams.rsoId

    vm.subscribe = () => {
      var request = {
        rsoId: $stateParams.rsoId
      }

      Subscription.create(request)
        .then((response) => {

          vm.rsoData.subscribed = true
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
        })
    }

    vm.unsubscribe = function () {
      var subIndex = _.findIndex(vm.subList, {rsoId: vm.rsoData.id});

      Subscription.destroy(vm.subList[subIndex].id)
        .then((response) => {

          vm.rsoData.subscribed = false
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })
    }

    vm.viewEvent = (eventId) => {
      $location.path('/university/' + $stateParams.uniId + "/event/" + eventId)
    }

    vm.init = function () {
      Rso.findById(vm.uniId, vm.rsoId)
        .then((response) => {
          vm.rsoData = response
          let payload = {userId: $rootScope.currentUser.id}
          Subscription.findAll(payload)
            .then((response) => {
              vm.subList = response
              vm.rsoData.subscribed = !!_.find(vm.subList, {rsoId: vm.rsoData.id})

            }, (response) => {
              $log.log('Subscription findall Failure', response)
            })
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

      console.log('asdfajosdfasjdofiajs;df')
      Event.findAll(vm.uniId, {rsoId: vm.rsoId})
        .then((eventRes) => {
          vm.eventData = eventRes
        }, (eventRes) => {
          $log.log('Event findall Failure', eventRes)
        })
    }

    vm.init()
  }
)
