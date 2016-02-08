'use strict';

describe('Directive: settings', function () {

  // load the directive's module and view
  beforeEach(module('clickeatApp'));
  beforeEach(module('app/settings/settings.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<settings></settings>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the settings directive');
  }));
});
