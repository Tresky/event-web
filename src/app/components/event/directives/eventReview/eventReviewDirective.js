angular.module('app')
  .directive('eventReview', function ($log) {
    return {
      template: require('./eventReviewView.html'),
      restrict: 'A',
      scope: {
      }
    }
  }
)
