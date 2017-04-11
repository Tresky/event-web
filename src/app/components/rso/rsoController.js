/**
 * File: RsoController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * rso page of the application.
 */

import './rsoStyles.styl'

angular.module('app')
  .controller('RsoController', function ($log, $location, Rso) {
    var vm = this
    vm.test = 'testing'

    var rsoId = $location.search().rid
    var uniId = $location.search().uid

    //TODO: enable this when backend is ready (getting 403 error atm)
    // Rso.findById(uniId,rsoId)
    //   .then((response) => {
    //     vm.rsoData = response
    //     $log.log('Success', response)
    //   }, (response) => {
    //     $log.log('Failure', response)
    //   })

    vm.rsoData = {name: "meh", description: "What do you want?", university_name: "Trump University", privacy_level: "None"}
    vm.eventData  = [{name: "event 1"}, {name: "event 2"}, {name: "event 3"}, {name: "event 4"}]

    vm.subscribe = () => {
      $log.log('Function was called')
    }
  }
)
