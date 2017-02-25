angular.module('app')
  .directive('eventRating', function ($log) {
    return {
      template: require('./eventRatingView.html'),
      restrict: 'A',
      scope: {
        google: '@',
        local: '@'
      }
    }
  }
)
