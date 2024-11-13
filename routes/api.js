

// routes/api.js
'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

// Handle the conversion endpoint
app.get('/api/convert', (req, res) => {
  const input = req.query.input;
  const num = convertHandler.getNum(input);
  const unit = convertHandler.getUnit(input);

  // Handle invalid input
  if (num === "invalid number" && unit === "invalid unit") {
    return res.json('invalid number and unit');
  }
  if (num === "invalid number") {
    return res.json('invalid number');
  }
  if (unit === "invalid unit") {
    return res.json('invalid unit');
  }

  // If both are valid, perform conversion
  const returnUnit = convertHandler.getReturnUnit(unit);
  const returnNum = convertHandler.convert(num, unit);
  const string = convertHandler.getString(num, unit, returnNum, returnUnit);

  res.json({ initNum: num, initUnit: unit, returnNum: returnNum, returnUnit: returnUnit, string: string });
});
