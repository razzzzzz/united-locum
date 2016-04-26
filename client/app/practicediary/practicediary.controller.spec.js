'use strict';

describe('Controller: PracticediaryCtrl', function () {

  // load the controller's module
  beforeEach(module('clickeatApp'));

  var PracticediaryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PracticediaryCtrl = $controller('PracticediaryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
