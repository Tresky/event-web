angular.module('app')
  .directive('eventReview', function () {
    return {
      template: require('./eventReviewView.html'),
      restrict: 'A',
      scope: {
      }
    }
  }
)
