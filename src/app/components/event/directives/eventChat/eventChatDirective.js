angular.module('app')
  .directive('eventChat', function ($log, $auth, Comment) {
    return {
      template: require('./eventChatView.html'),
      restrict: 'A',
      scope: {
        comments: '='
      },
      controllerAs: 'eventChatCtrl',
      controller: [function () {
        let vm = this

        vm.status = {
          isopen: false
        };

        vm.sendComment = function () {
          console.log(vm.commentText)
          Comment.create()
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
