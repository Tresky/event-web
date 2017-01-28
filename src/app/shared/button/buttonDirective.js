angular.module('app')
  .directive('button', function ($log) {
    return {
      template: '<div>My Directive</div>',
      restrict: 'A',
      scope: {
        flag: '='
      },
      link: (scope, elem) => {

      }
    }
  }
)
