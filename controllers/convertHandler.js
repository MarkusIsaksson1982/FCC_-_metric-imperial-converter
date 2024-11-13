function ConvertHandler() {

  // Extracts and calculates the number (supports fractions and decimals)
this.getNum = function(input) {
  let result;
  const numRegex = /^[\d/.]+/;
  const match = input.match(numRegex);
  if (!match) return 1; // default to 1 if no number provided

  const numStr = match[0];

  // Check for double fraction (i.e. multiple slashes in the input)
  if ((numStr.match(/\//g) || []).length > 1) {
    return "invalid number"; // Return error if more than one slash is present
  }

  try {
    result = eval(numStr);
  } catch (e) {
    result = "invalid number";
  }
  
  return result;
};

    
  // Extracts and validates the unit
  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    if (!match) return "invalid unit";

    const unit = match[0].toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    return validUnits.includes(unit) ? (unit === "l" ? "L" : unit) : "invalid unit";
  };

  // Maps input unit to the corresponding return unit
  this.getReturnUnit = function(initUnit) {
    const units = { gal: "L", L: "gal", mi: "km", km: "mi", lbs: "kg", kg: "lbs" };
    return units[initUnit] || "invalid unit";
  };

  // Spells out the full unit name for display purposes
  this.spellOutUnit = function(unit) {
    const unitNames = {
      gal: "gallons", L: "liters", mi: "miles", km: "kilometers",
      lbs: "pounds", kg: "kilograms"
    };
    return unitNames[unit] || "invalid unit";
  };

  // Converts between units
  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541, L: 1 / 3.78541, mi: 1.60934,
      km: 1 / 1.60934, lbs: 0.453592, kg: 1 / 0.453592
    };
    return parseFloat((initNum * conversionRates[initUnit]).toFixed(5));
  };

  // Formats the conversion result into a descriptive string
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;

