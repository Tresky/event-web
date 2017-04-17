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

import './rssStyles.styl'

angular.module('app')
  .controller('RssController', function ($rootScope, $scope, $log, $http, $location, Notification, Rso, Event, University, RssToJson) {
      let vm = this

      vm.eventData = {}

      $scope.$on('UniversityChanged', function (events, args) {
        $log.log('Ok selected univId: ', args.id)

        vm.init(args.id)
      })

      vm.init = (univId) => {
        if (univId) {
          vm.univId = univId
        } else {
          vm.univId = $rootScope.selectedUnivId
        }

        if (!vm.univId)
          return

        Rso.findAll(vm.univId)
          .then((response) => {
            vm.rsoList = response
            $log.log('rso succ', response)
          }, (response) => {
            $log.log('rso error', response)
          })
      }

      $log.log('rssController')

      vm.loadUrl = 'http://events.ucf.edu/feed.rss'

      vm.add = (title, date, description) => {
        var datetime = new Date(date)
        vm.startDate = datetime
        vm.startTime = datetime

        vm.eventData.description = description
        vm.eventData.name = title
      }

      vm.load = () => {
        $log.log('load was called')
        RssToJson.convert(vm.loadUrl)
          .then((response) => {
            $log.log('Success', response)
            vm.rssFeed = response.items
            Notification.success(
              {
                message: 'RSS successfully loaded.',
                positionY: 'bottom',
                positionX: 'right'
              }
            )
          }, (response) => {
            $log.log('Failure', response)
            Notification.error(
              {
                message: 'RSS failed to load.',
                positionY: 'bottom',
                positionX: 'right'
              }
            )
          })
      }

      vm.createEvent = () => {
        $log.log('createEvent was called')

        if (vm.eventData.description.length > 250)
        {
          Notification.error(
            {
              message: 'Description too long. Max length: 250 characters.',
              positionY: 'bottom',
              positionX: 'right'
            }
          )
          return
        }

        if (vm.startDate && vm.startTime) {
          var start = new Date(vm.startDate.getFullYear(),
            vm.startDate.getMonth(),
            vm.startDate.getDate(),
            vm.startTime.getHours(),
            vm.startTime.getMinutes(),
            vm.startTime.getSeconds(),
            vm.startTime.getMilliseconds())

        }
        else {
          Notification.error(
            {
              message: 'Please fill start date and time.',
              positionY: 'bottom',
              positionX: 'right'
            }
          )
          return
        }

        if (vm.endDate && vm.endTime) {
          var end = new Date(vm.endDate.getFullYear(),
            vm.endDate.getMonth(),
            vm.endDate.getDate(),
            vm.endTime.getHours(),
            vm.endTime.getMinutes(),
            vm.endTime.getSeconds(),
            vm.endTime.getMilliseconds())

        }
        else {
          Notification.error(
            {
              message: 'Please fill end date and time.',
              positionY: 'bottom',
              positionX: 'right'
            }
          )
          return
        }

        vm.eventData.startTime = start
        vm.eventData.endTime = end

        $log.log('Data: ', vm.eventData)
        Event.create(vm.univId, vm.eventData)
          .then((response) => {
            $log.log('Success', response)
            Notification.success(
              {
                message: 'Event successfully created.',
                positionY: 'bottom',
                positionX: 'right'
              }
            )
            vm.eventData = {};
          }, (response) => {
            Notification.error(
              {
                message: 'Something bad happened.',
                positionY: 'bottom',
                positionX: 'right'
              }
            )
            $log.log('Failure', response)
          })
      }

      vm.init()
    }
  )
