/**
 * File: UniversityController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * university page of the application.
 */

import './universityStyles.styl'

angular.module('app')
  .controller('UniversityController', function ($log, $location, University) {
    var vm = this
    vm.test = 'testing'
    vm.func = () => {
      $log.log('Function was called')
    }

    var uniId = $location.search().uid

    University.findById(uniId)
      .then((response) => {
        vm.uniData = response
        $log.log('Success', response)
      }, (response) => {
        $log.log('Failure', response)
      })

    vm.rsoData  = [{name: "RSOOOOO 1"}, {name: "RSOOOOO 2"}, {name: "RSOOOOO 3"}, {name: "RSOOOOO 4"}]
    //vm.uniData = {name: "Trump University", description: "Very good university", num_of_students: "0"}

  }
)
