angular.module('app')
  .directive('eventChat', function ($log, $auth) {
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

        vm.toggleDropdown = function($event) {
          console.log('asdf')
          vm.status.isopen = !vm.status.isopen;
        };

      }]
    }
  }
)
