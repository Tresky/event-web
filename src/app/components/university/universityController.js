/**
 * File: UniversityController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * university page of the application.
 */

import './universityStyles.styl'

angular.module('app')
  .controller('UniversityController', function ($log, $location, University, $stateParams, $state, Rso, Membership, $rootScope) {
    var vm = this
    vm.uniId = null;

    vm.test = 'testing'
    vm.func = () => {
      $log.log('Function was called')
    }

    vm.subscribe = function (rsoId) {

      var request = {
        rsoID: rsoId,
        // userId: $rootScope.currentUser.id
      }

      // Membership.create(rsoId)
      //   .then((response) => {
      //     console.log(response)
      //     $log.log('Success', response)
      //   }, (response) => {
      //     $log.log('Failure', response)
      //     $state.go('dashboard')
      //   })
    }

    vm.details = function (rsoId) {
      // Send them to the rso page.
      $location.path('university/' + vm.uniId + "/rso/" + rsoId);
    }

    vm.init = function () {
      // Get the uni id from the url
      vm.uniId = $stateParams.uniId

      University.findById(vm.uniId)
        .then((response) => {
          vm.uniData = response
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })

      Rso.findAll(vm.uniId)
        .then((response) => {
          vm.rsoData = response
          $log.log('Success', response)
        }, (response) => {
          $log.log('Failure', response)
          $state.go('dashboard')
        })
    }

    vm.init()
    //vm.uniData = {name: "Trump University", description: "Very good university", num_of_students: "0"}

  }
)
