import './navBarStyles.styl'

angular.module('app')
  .directive('navBar', function ($log, $auth) {
    return {
      template: require('./navBarView.html'),
      restrict: 'A',
      controllerAs: 'navbarCtrl',
      controller: [function () {
        let vm = this

        vm.isAuthenticated = () => {
          return $auth.isAuthenticated()
        }
      }]
    }
  }
)
