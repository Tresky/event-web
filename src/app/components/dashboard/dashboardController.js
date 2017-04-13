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
  .controller('DashboardController', function ($log, $http, $scope, Rso) {
    let vm = this

    $scope.$on('UniversityChanged', function(events, args){
      $log.log('Ok selected univId: ', args.id);

    })

    vm.rsoFeed = [{event: 'Face Painting 1', rso: 'SGA', date: '10/20/2017', university: 'University of Central Florida', proximity: '0 MI'},
                  {event: 'Face Painting 2', rso: 'SGA', date: '10/20/2017', university: 'University of Central Florida', proximity: '0 MI'},
                  {event: 'Face Painting 3', rso: 'SGA', date: '10/20/2017', university: 'University of Central Florida', proximity: '0 MI'}]

    $log.log('DashboardController')

    vm.requestRso = () => {
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
        }, (response) => {
          $log.log('Failure', response)
        })
    }

    vm.createEvent = () => {
      $log.log('createEvent was called')
      $log.log('Data: ', vm.eventData)
    }
  }
)
