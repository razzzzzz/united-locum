'use strict';

describe('Directive: signup', function () {

  // load the directive's module and view
  beforeEach(module('clickeatApp'));
  beforeEach(module('app/signup/signup.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<signup></signup>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the signup directive');
  }));
});
