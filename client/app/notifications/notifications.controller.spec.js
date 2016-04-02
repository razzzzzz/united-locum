'use strict';

describe('Component: NotificationsComponent', function () {

  // load the controller's module
  beforeEach(module('clickeatApp'));

  var NotificationsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    NotificationsComponent = $componentController('NotificationsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
