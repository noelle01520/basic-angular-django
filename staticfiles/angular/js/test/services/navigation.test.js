'use strict';

describe('Service: Navigation', function(){

  beforeEach(module('app'));

  var Navigation;

  beforeEach(inject(function(_Navigation_) {
    Navigation = _Navigation_;
  }));

  it('should define the methods', function(){
    expect(Navigation.goHome).toBeDefined();
    expect(Navigation.display).toBeDefined();
  });
});