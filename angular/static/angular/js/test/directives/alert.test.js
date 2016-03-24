'use strict';

describe('Directive: Alert', function(){
  beforeEach(module('app'));
  beforeEach(module('templates'));

  var element;
  var scope;

  beforeEach(inject(function($rootScope, $compile){
    scope = $rootScope.$new();
    element = angular.element('<alert message="alert.message" type="alert.type"></alert>');
    element = $compile(element)(scope);
    scope.alert = { message: 'Alert directive test',
                    type: 'success' };
    scope.$digest();
  }));

  it('should render a div w/ alert message', function(){
    var div = element.find('div');
    expect(div.text()).toBe('\n  Alert directive test\n  ×\n');
    expect(div.attr('class')).toBe('alert alert-success alert-dismissible');
  });
});