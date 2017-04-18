angular.module('app')
  .directive('eventRating', function () {
    return {
      template: require('./eventRatingView.html'),
      restrict: 'A',
      scope: {
        local: '@'
      }
    }
  }
)
