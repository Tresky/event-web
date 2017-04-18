angular.module('app')
  .directive('eventChat', function ($compile, $log, $auth, Comment, $stateParams, $rootScope) {
    return {
      template: require('./eventChatView.html'),
      restrict: 'A',
      scope: {
        comments: '='
      },
      controllerAs: 'eventChatCtrl',
      controller: ['$scope', '$rootScope', 'Notification', function ($scope, $rootScope, Notification) {
        let vm = this

        vm.uniId = $stateParams.uniId
        vm.eventId = $stateParams.eventId

        vm.createComment = function () {
          if(!vm.commentText)
            return
          let request = {
            message: vm.commentText,
            name: $rootScope.currentUser.firstName + ' ' + $rootScope.currentUser.lastName
          }

          Comment.create(vm.uniId, vm.eventId, request)
            .then((response) => {
              vm.newComment = response
              vm.newComment.user = $rootScope.currentUser
              $scope.$emit('commentCreated', vm.newComment)
              Notification.success(
                {
                  message: 'Successfully created a comment.',
                  positionY: 'bottom',
                  positionX: 'right'
                }
              )
              $log.log('Success', response)
            }, (response) => {
              $log.log('Failure', response)
              $state.go('dashboard')
            })
          vm.commentText = ''
        }

        vm.editComment = function (commentId) {
          // $scope.$emit('commentEdited', commentId)

          console.log('edit', commentId)
        }

        vm.saveComment = function (comment) {
          console.log(comment)
          // $scope.$emit('commentEdited', commentId)
          Comment.update(vm.uniId, vm.eventId, { id: comment.id, message: comment.message})
            .then((response) => {
              vm.newComment = response
              vm.newComment.user = $rootScope.currentUser
              $scope.$emit('commentUpdated', vm.newComment)
              Notification.success(
                {
                  message: 'Successfully updated a comment',
                  positionY: 'bottom',
                  positionX: 'right'
                }
              )
              $log.log('Success', response)
            }, (response) => {
              $log.log('Failure', response)
              $state.go('dashboard')
            })
        }

        vm.removeComment = function (commentId) {
          $scope.$emit('commentRemoved', commentId)
          Notification.success(
            {
              message: 'Successfully removed a comment',
              positionY: 'bottom',
              positionX: 'right'
            }
          )
        }

      }]
    }
  }
)
