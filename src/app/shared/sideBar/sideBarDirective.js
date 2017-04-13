import './sideBarStyles.styl'

angular.module('app')
  .directive('sideBar', function ($rootScope, $log, $auth, University) {
    return {
      template: require('./sideBarView.html'),
      restrict: 'A',
      scope: {
      },
      controllerAs: 'sidebarCtrl',
      controller: [function () {
        let vm = this

        vm.selectedUniversity = null
        vm.universities = []

        vm.init = function () {
          if (!$rootScope.currentUser)
            return

          let payload = { userId: $rootScope.currentUser.id }
          University.findAll(payload)
            .then(function (data) {
              vm.universities = data

              if (vm.universities.length >= 1) {
                vm.selectedUniversity = vm.universities[0]
              }
            })
        }

        vm.update = function () {
          $rootScope.$broadcast('UniversityChanged', vm.selectedUniversity)
        }

        vm.init()
      }],
      link: function(scope, element, attrs) {
        scope.$watch('$root.currentUser', function() {
            $log.log("currentUser changed")
            scope.sidebarCtrl.init()
        });
      }
    }
  }
)
