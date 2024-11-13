const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('Should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('5kg'), 5);
  });

  test('Should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('5.5kg'), 5.5);
  });

  test('Should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2kg'), 0.5);
  });

  test('Should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('5.4/3kg'), 1.8);
  });

  test('Should correctly return an error on a double-fraction', function() {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('Should correctly default to 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('Should correctly read each valid input unit', function() {
    assert.equal(convertHandler.getUnit('5kg'), 'kg');
    assert.equal(convertHandler.getUnit('5L'), 'L');
    assert.equal(convertHandler.getUnit('5mi'), 'mi');
  });

  test('Should return an error for an invalid input unit', function() {
    assert.equal(convertHandler.getUnit('5g'), 'invalid unit');
  });

  // Add more tests as needed...
});
