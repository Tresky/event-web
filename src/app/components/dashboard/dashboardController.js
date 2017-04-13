/**
 * File: dashboardController.js
 * Type: ngController
 * Author: Tyler Petresky
 * Description: This controller is the landing page
 * for an authenticated user. If a user is not logged
 * in, they should be directed to the 'home' state.
 * This page contains the primary functionalies and
 * views for users of the application.
 */

import './dashboardStyles.styl'

angular.module('app')
  .controller('DashboardController', function ($log, $http, Rso, $scope, Notification) {
    let vm = this

    $scope.$on('UniversityChanged', function(events, args){
      $log.log('Ok selected univId: ', args.id)
      vm.univId = args.id

      Rso.findAll(vm.univId)
        .then((response) => {
          $log.log('RSO findall Success', response)
        }, (response) => {
          $log.log('RSO findall Failure', response)
        })
    })

    $log.log('DashboardController')

    vm.requestRso = () => {
      if(vm.rsoEmail1 && vm.rsoEmail2 && vm.rsoEmail3 && vm.rsoEmail4 && vm.rsoEmail5)
      {
        vm.rsoData.memberEmails = []
        vm.rsoData.memberEmails.push(vm.rsoEmail1)
        vm.rsoData.memberEmails.push(vm.rsoEmail2)
        vm.rsoData.memberEmails.push(vm.rsoEmail3)
        vm.rsoData.memberEmails.push(vm.rsoEmail4)
        vm.rsoData.memberEmails.push(vm.rsoEmail5)

        $log.log('requestRso was called')
        $log.log('Data: ', vm.rsoData)

        //TODO: Change hardcoded value to dropdown box
        Rso.create(1,vm.rsoData)
          .then((response) => {
            $log.log('Success', response)
            Notification.success(
              {
                message: 'Rso successfully created.',
                positionY: 'bottom',
                positionX: 'right'
              }
            )
          }, (response) => {
            $log.log('Failure', response)
          })
      } else {
        Notification.error(
          {
            message: 'Please fill out the form.',
            positionY: 'bottom',
            positionX: 'right'
          }
        )
      }
    }

    vm.createEvent = () => {
      $log.log('createEvent was called')
      $log.log('Data: ', vm.eventData)
    }

    vm.init = function () {
      vm.rsoFeed = [{event: 'Face Painting 1', rso: 'SGA', date: '10/20/2017', university: 'University of Central Florida', proximity: '0 MI'},
        {event: 'Face Painting 2', rso: 'SGA', date: '10/20/2017', university: 'University of Central Florida', proximity: '0 MI'},
        {event: 'Face Painting 3', rso: 'SGA', date: '10/20/2017', university: 'University of Central Florida', proximity: '0 MI'}]

    }

    vm.init()
  }
)
