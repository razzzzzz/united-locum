'use strict';

describe('Controller: LocumdairyCtrl', function () {

  // load the controller's module
  beforeEach(module('clickeatApp'));

  var LocumdairyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LocumdairyCtrl = $controller('LocumdairyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
