'use strict';

describe('Component: VacancyComponent', function () {

  // load the controller's module
  beforeEach(module('clickeatApp'));

  var VacancyComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    VacancyComponent = $componentController('VacancyComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
