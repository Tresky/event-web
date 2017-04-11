import './sideBarStyles.styl'

angular.module('app')
  .directive('sideBar', function ($log, $auth, University) {
    return {
      template: require('./sideBarView.html'),
      restrict: 'A',
      scope: {
        control: '='
      },
      controllerAs: 'sidebarCtrl',
      controller: [function () {
        let vm = this

        vm.selectedUniversity = null;
        vm.universities = [];

        vm.init = function () {
          University.findAll().then(function (data) {
            vm.universities = data;

            if(vm.universities.length >= 1)
              vm.selectedUniversity = vm.universities[0];
          });
        }

        vm.init();
      }]
    }
  }
)
