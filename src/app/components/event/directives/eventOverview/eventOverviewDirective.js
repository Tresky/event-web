angular.module('app')
  .directive('eventOverview', function () {
    return {
      template: require('./eventOverviewView.html'),
      restrict: 'A',
      scope: {
        name: '@',
        uni: '@',
        descr: '@'
      }
    }
  }
)
