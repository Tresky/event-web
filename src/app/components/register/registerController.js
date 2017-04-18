/**
 * File: RegisterController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * register page of the application.
 */

import './registerStyles.styl'

angular.module('app')
  .controller('RegisterController', function ($log, $timeout, $auth, $location, $window, $rootScope, Auth, University) {
    var vm = this

    // Log the user out
    $auth.logout()

    // get universities list
    University.findAll()
      .then((uni) => {
        $log.log(uni)
        vm.universities = uni
      })

    // sign up call
    vm.submit = () => {
      Auth.signup(vm.signupData)
        .then((response) => {
          $log.log('Success', response)

          // set the token
          $auth.setToken(response.token)

          //update rootscope
          $window.localStorage.currentUser = angular.toJson(response.user)
          $rootScope.currentUser = angular.fromJson($window.localStorage.currentUser)

          // redirect to dash
          $timeout(() => {
            $location.path('/dashboard')
          })
        }, (response) => {
          $log.log('Failure', response)
        })
    }
  }
)

// registerCtrl
