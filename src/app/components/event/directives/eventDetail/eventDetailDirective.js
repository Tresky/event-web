angular.module('app')
  .directive('eventDetail', function ($log) {
    return {
      template: require('./eventDetailView.html'),
      restrict: 'A',
      scope: {
        date: '@',
        time: '@',
        phone: '@',
        email: '@'
      }
    }
  }
)
