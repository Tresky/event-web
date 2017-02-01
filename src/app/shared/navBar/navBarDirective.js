import './navBarStyles.styl'

angular.module('app')
  .directive('navBar', function ($log) {
    return {
      template: require('./navBarView.html'),
      restrict: 'A',
      scope: {
      }
    }
  }
)
