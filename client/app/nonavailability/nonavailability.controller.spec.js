'use strict';

describe('Controller: LocumdiaryCtrl', function () {

  // load the controller's module
  beforeEach(module('clickeatApp'));

  var LocumdiaryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LocumdiaryCtrl = $controller('LocumdiaryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
