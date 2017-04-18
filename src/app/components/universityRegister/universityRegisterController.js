/**
 * File: LoginController.js
 * Type: ngController
 * Author: Tyler Gauntlett
 * Description: This controller is specific to the
 * university register page of the application.
 */

import './universityRegisterStyles.styl'

angular.module('app')
  .controller('UniversityRegisterController', function ($log, $auth, $location, $timeout, $window, $rootScope, Auth) {
    var vm = this
    vm.test = 'testing'

    //Log the user out
    $auth.logout()

    vm.signupData = { 'permissionLevel': 1 } //SUPERADMIN

    //sign up call
    vm.register = () => {
      Auth.signup(vm.signupData)
        .then((response) => {
          $log.log('Success', response)

          //set the token
          $auth.setToken(response.token)

          //update rootscope
          $window.localStorage.currentUser = angular.toJson(response.user)
          $rootScope.currentUser = angular.fromJson($window.localStorage.currentUser)

          //redirect to dash
          $timeout(() => {
            $location.path('/dashboard')
          })
        }, (response) => {
          $log.log('Failure', response)
        })
    }
  }
)
