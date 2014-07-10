///<reference path='../resources/jest.d.ts'/>
jest.autoMockOff();
import Immutable = require('../dist/Immutable');
import OrderedMap = Immutable.OrderedMap;

describe('OrderedMap', function() {

  it('constructor provides initial values', function() {
    var m = OrderedMap({'a': 'A', 'b': 'B', 'c': 'C'});
    expect(m.get('a')).toBe('A');
    expect(m.get('b')).toBe('B');
    expect(m.get('c')).toBe('C');
    expect(m.length).toBe(3);
    expect(m.toArray()).toEqual(['A','B','C']);
  });

  it('provides initial values in a mixed order', function() {
    var m = OrderedMap({'c': 'C', 'b': 'B', 'a': 'A'});
    expect(m.get('a')).toBe('A');
    expect(m.get('b')).toBe('B');
    expect(m.get('c')).toBe('C');
    expect(m.length).toBe(3);
    expect(m.toArray()).toEqual(['C','B','A']);
  });

  it('maintains order when new keys are set', () => {
    var m = OrderedMap()
      .set('A', 'aardvark')
      .set('Z', 'zebra')
      .set('A', 'antelope');
    expect(m.length).toBe(2);
    expect(m.toArray()).toEqual(['antelope', 'zebra']);
  });

  it('resets order when a keys is deleted', () => {
    var m = OrderedMap()
      .set('A', 'aardvark')
      .set('Z', 'zebra')
      .delete('A')
      .set('A', 'antelope');
    expect(m.length).toBe(2);
    expect(m.toArray()).toEqual(['zebra', 'antelope']);
  });

  it('respects order for equality', () => {
    var m1 = OrderedMap().set('A', 'aardvark').set('Z', 'zebra');
    var m2 = OrderedMap().set('Z', 'zebra').set('A', 'aardvark');
    expect(m1.equals(m2)).toBe(false);
    expect(m1.equals(m2.reverse())).toBe(true);
  });

});
