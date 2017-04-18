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
  .controller('DashboardController', function ($rootScope, $scope, $log, $http, $location, Notification, Rso, Event, University, Subscription) {
      let vm = this

      vm.rsoList = {}

      $scope.$on('UniversityChanged', function (events, args) {
        $log.log('Ok selected univId: ', args.id)
        vm.univId = args.id

        vm.init()
      })

      $log.log('DashboardController')

      vm.requestRso = () => {
        if (vm.rsoEmail1 && vm.rsoEmail2 && vm.rsoEmail3 && vm.rsoEmail4 && vm.rsoEmail5) {
          vm.rsoData.memberEmails = []
          vm.rsoData.memberEmails.push(vm.rsoEmail1)
          vm.rsoData.memberEmails.push(vm.rsoEmail2)
          vm.rsoData.memberEmails.push(vm.rsoEmail3)
          vm.rsoData.memberEmails.push(vm.rsoEmail4)
          vm.rsoData.memberEmails.push(vm.rsoEmail5)

          $log.log('requestRso was called')
          $log.log('Data: ', vm.rsoData)

          Rso.create(vm.univId, vm.rsoData)
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

      vm.getRsoName = (rsoId) => {
        for (var i = 0, len = vm.rsoList.length; i < len; i++) {
          if (vm.rsoList[i].id == rsoId) {
            return vm.rsoList[i].name
          }
        }
        return 'unknow rso'
      }
      vm.init = function () {
        var request = {
          userId: $rootScope.currentUser.id
        }

        vm.getUniversityName = (univId) => {
          for (var i = 0, len = vm.univList.length; i < len; i++) {
            if (vm.univList[i].id == univId) {
              return vm.univList[i].name
            }
          }
          return 'unknow univ'
        }

        vm.getDateTime = (str) => {
          var val = new Date(str)
          return val.toLocaleDateString()
        }

        vm.getPrivacyStr = (pri) => {
          switch (pri) {
            case 1:
              return 'RSO Only'
            case 2:
              return 'Private'
            case 3:
              return 'Public'
            default:
              return 'unknow'
          }
        }

        vm.viewEvent = (eventId) => {
          $location.path('/university/' + vm.univId + "/event/" + eventId);
        }

        vm.viewRso = (rsoId) => {
          $location.path('/university/' + vm.univId + "/rso/" + rsoId);
        }

        $scope.$on('UniversityChanged', function (events, args) {
          $log.log('Ok selected univId: ', args.id)
          vm.init(args.id)
        })

        vm.setFeed = (uniId) => {
          vm.rsoFeed = []

          if (uniId) {
            vm.univId = uniId
          } else {
            vm.univId = $rootScope.selectedUnivId
          }

          if (!vm.univId)
            return

          Rso.findAll(vm.univId)
            .then((response) => {
              vm.rsoList = response
            }, (response) => {
              $log.log('asdf', response)
            })

          University.findAll({userId: $rootScope.currentUser.id})
            .then((data) => {
              vm.univList = data
            })

          Event.findAll(vm.univId, { privacy: 3})
            .then((publicEvents) => {
              vm.rsoFeed = publicEvents

              if (Service.isJoined()) {
                vm.rsoFeed = _.concat(vm.rsoFeed, [{
                  createById: 1,
                  name: 'Secret Event',
                  description: 'Secret Description',
                  latitude: 0,
                  longitude: 0,
                  imageUrl: 'https://anchore.com/wp-content/uploads/2017/02/Interview-Secrets.jpg',
                  startTime: new Date(),
                  endTime: new Date(),
                  privacy: 1,
                  rating: 5,
                  category: 'Secret Society',
                  rsoId: 1,
                  universityId: 1
                }])
              }
            })

          //get RSO subscription
          let payload = {userId: $rootScope.currentUser.id}
          Subscription.findAll(payload)
            .then((response) => {
              vm.subList = response

              console.log('SUBS', response)
              _.each(vm.subList, function(sub) {
                Event.findAll(vm.univId, {rsoId: sub.rsoId})
                  .then((eventRes) => {
                    console.log('EVENTS', eventRes)
                    vm.rsoFeed = _.uniqBy(_.concat(vm.rsoFeed, eventRes), 'id')
                    // rsoFeed = rsoFeed.concat(eventRes)
                    // vm.rsoFeed = rsoFeed
                  }, (eventRes) => {
                    $log.log('Event findall Failure', eventRes)
                  })
              })

              // // var rsoFeed = []
              // for (var i = 0, len = response.length; i < len; i++) {
              // }
            }, (response) => {
              $log.log('Subscription findall Failure', response)
            })
        }
        vm.setFeed()
      }
      vm.init()
    }
  )
