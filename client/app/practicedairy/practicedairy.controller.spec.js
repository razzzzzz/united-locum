'use strict';

describe('Controller: PracticedairyCtrl', function () {

  // load the controller's module
  beforeEach(module('clickeatApp'));

  var PracticedairyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PracticedairyCtrl = $controller('PracticedairyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
