function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];
  return [number[0], string];
}

function checkDiv(possibleFraction) {
  let nums = possibleFraction.split("/");
  return nums.length > 2 ? false : nums;
}

function ConvertHandler() {
  // Get the numeric value from the input, supporting fractions and decimals
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);
    if (!nums) return "invalid number";

    let num1 = parseFloat(nums[0]);
    let num2 = parseFloat(nums[1] || "1");
    if (isNaN(num1) || isNaN(num2)) return "invalid number";

    return num1 / num2;
  };

  // Get the unit from the input
  this.getUnit = function(input) {
    let unit = numberStringSplitter(input)[1].toLowerCase();
    const validUnits = ["km", "gal", "lbs", "mi", "l", "kg"];
    return validUnits.includes(unit) ? (unit === "l" ? "L" : unit) : "invalid unit";
  };

  // Get the corresponding return unit for the conversion
  this.getReturnUnit = function(initUnit) {
    const units = { gal: "L", L: "gal", mi: "km", km: "mi", lbs: "kg", kg: "lbs" };
    return units[initUnit] || "invalid unit";
  };

  // Spell out the full unit name for display purposes
  this.spellOutUnit = function(unit) {
    const unitNames = {
      gal: "gallons", L: "liters", mi: "miles", km: "kilometers",
      lbs: "pounds", kg: "kilograms"
    };
    return unitNames[unit] || "invalid unit";
  };

  // Perform the actual unit conversion
  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541, L: 1 / 3.78541, mi: 1.60934,
      km: 1 / 1.60934, lbs: 0.453592, kg: 1 / 0.453592
    };
    return parseFloat((initNum * conversionRates[initUnit]).toFixed(5));
  };

  // Generate the output string for the conversion
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
