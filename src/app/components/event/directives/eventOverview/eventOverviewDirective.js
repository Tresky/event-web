angular.module('app')
  .directive('eventOverview', function ($log) {
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
