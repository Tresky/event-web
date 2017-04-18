angular.module('app')
  .directive('socialMedia', function () {
    return {
      template: require('./socialMediaView.html'),
      restrict: 'A',
      scope: {
        message: '@',
        link: '@'
      }
    }
  }
)
