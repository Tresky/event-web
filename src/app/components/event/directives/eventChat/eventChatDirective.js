angular.module('app')
  .directive('eventChat', function ($log) {
    return {
      template: require('./eventChatView.html'),
      restrict: 'A',
      scope: {
      }
    }
  }
)
