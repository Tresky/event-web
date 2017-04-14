angular.module('app')
  .directive('eventChat', function ($log, $auth, Comment, $stateParams) {
    return {
      template: require('./eventChatView.html'),
      restrict: 'A',
      scope: {
        comments: '='
      },
      controllerAs: 'eventChatCtrl',
      controller: [function () {
        let vm = this

        vm.uniId = $stateParams.uniId
        vm.eventId = $stateParams.eventId

        vm.status = {
          isopen: false
        };

        vm.sendComment = function () {
          console.log(vm.commentText)
          vm.commentText = ''
        }

        vm.toggleDropdown = function($event) {
          console.log('asdf')
          vm.status.isopen = !vm.status.isopen;
        };

      }]
    }
  }
)
