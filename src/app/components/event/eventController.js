/**
 * File: EventController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * event pages of the application.
 */

import './eventStyles.styl'

angular.module('app')
  .controller('EventController', function ($log, Event, Comment, University, $stateParams, $state, $scope, _, Notification) {
    var vm = this
    vm.test = 'testing'
    vm.uniId = $stateParams.uniId
    vm.eventId = $stateParams.eventId
    vm.eventRating = null

    vm.rateEvent = function () {
      if(!vm.eventRating)
        return

      vm.eventData.rating = parseInt(vm.eventRating)

      Event.update(vm.uniId, vm.eventData)
        .then((response) => {
          $log.log('Success', response)
          Notification.success(
            {
              message: 'Successfully rated the event.',
              positionY: 'bottom',
              positionX: 'right'
            }
          )
        }, (response) => {
          $log.log('Failure', response)
        })
    }

    $scope.$on('commentCreated', function (evt, args) {
      vm.comments.push(args)
    })

    $scope.$on('commentRemoved', function (evt, args) {
      Comment.destroy(vm.uniId, vm.eventId, args)
        .then((response) => {
          console.log(vm.comments, 'before')
          _.remove(vm.comments, function (comm) {
            return comm.id == response.id
          })
          console.log(vm.comments, 'after')
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })
    })

    $scope.$on('commentUpdated', function (evt, args) {
      let index = _.findIndex(vm.comments, {id: args.id})
      vm.comments[index]._editing = false;
      console.log(index);
    })

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
