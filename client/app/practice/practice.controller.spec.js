'use strict';

describe('Controller: PracticeCtrl', function () {

  // load the controller's module
  beforeEach(module('clickeatApp'));

  var PracticeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PracticeCtrl = $controller('PracticeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
