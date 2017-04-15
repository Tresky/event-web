angular.module('app')
  .directive('eventDetail', function () {
    return {
      template: require('./eventDetailView.html'),
      restrict: 'A',
      scope: {
        startDate: '@',
        startTime: '@',
        endDate: '@',
        endTime: '@',
        phone: '@',
        email: '@',
        privacyLevel: '='
      }
    }
  }
)
