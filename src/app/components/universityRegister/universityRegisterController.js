/**
 * File: LoginController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * university register page of the application.
 */

import './universityRegisterStyles.styl'

angular.module('app')
  .controller('UniversityRegisterController', function ($log, $auth) {
    var vm = this
    vm.test = 'testing'

    //Log the user out
    $auth.logout()

    //register call
    vm.register = () => {
      $log.log('Data: ', vm.signupData)
    }
  }
)
