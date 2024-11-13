this.getNum = function(input) {
  let result;
  const numRegex = /^([\d./]+)?/;
  const match = input.match(numRegex);
  if (!match || match[1] === '') return 1; // Default to 1 if no number is provided
  const numStr = match[1];
  if ((numStr.match(/\//g) || []).length > 1) {
    return "invalid number";
  }
  try {
    result = eval(numStr);
    if (isNaN(result) || !isFinite(result)) return "invalid number";
  } catch (e) {
    return "invalid number";
  }
  return parseFloat(result.toFixed(5));
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


  this.getReturnUnit = function(initUnit) {
  const units = {
    gal: "L",
    L: "gal",
    mi: "km",
    km: "mi",
    lbs: "kg",
    kg: "lbs"
  };
  return units[initUnit] || "invalid unit";
};

  // Spells out the full unit name for display purposes

  this.spellOutUnit = function(unit) {
  const unitNames = {
    gal: "gallons",
    L: "liters",
    mi: "miles",
    km: "kilometers",
    lbs: "pounds",
    kg: "kilograms"
  };
  return unitNames[unit] || "invalid unit";
};


  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const conversionRates = {
      gal: galToL,
      L: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg
    };
    return parseFloat((initNum * conversionRates[initUnit]).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

  // Formats the conversion result into a descriptive string
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;

