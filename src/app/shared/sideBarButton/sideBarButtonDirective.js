import './sideBarButtonStyles.styl'

angular.module('app')
  .directive('sideBarButton', function ($log, $auth) {
    return {
      template: require('./sideBarButtonView.html'),
      restrict: 'A',
      controllerAs: 'sidebarButtonCtrl',
      controller: [function () {
        let vm = this

        vm.toggle = function () {
          $("#wrapper").toggleClass("toggled");
        }
      }]
    }
  }
)
