beforeEach(module('app'));

var $controller;

beforeEach(inject(function(_$controller_){
  // The injector unwraps the underscores (_) from around the parameter names when matching
  $controller = _$controller_;
}));

describe('EventController', function () {
  var $scope, controller;

  // Instantiate a $scope for each controller
  beforeEach(function() {
    $scope = {};
    controller = $controller('EventController', { $scope: $scope });
  });

  it('Property is equal', function() {
    // 'controller' corresponds to 'vm'
    expect(controller.test).toEqual('testing');
  })
})
