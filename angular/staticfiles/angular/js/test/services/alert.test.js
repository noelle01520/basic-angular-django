'use strict';

describe('Service: Alert', function(){

  beforeEach(module('app'));

  var Alert;

  beforeEach(inject(function(_Alert_) {
    Alert = _Alert_;
  }));

  describe('get/set methods', function(){

    it('should return values from set method', function(){
      Alert.setAlert('test alert', 'test');
      expect(Alert.getMessage()).toBe('test alert');
      expect(Alert.getType()).toBe('test');
    });
  });

});