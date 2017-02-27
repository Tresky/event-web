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
  .controller('DashboardController', function ($log) {
    let vm = this

    $log.log('DashboardController')
  }
)
