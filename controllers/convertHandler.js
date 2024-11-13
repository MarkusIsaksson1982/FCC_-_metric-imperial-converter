function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];
  return [number[0], string];
}

function checkDiv(possibleFraction) {
  let nums = possibleFraction.split("/");
  return nums.length > 2 ? false : nums;
}


module.exports = ConvertHandler;


function ConvertHandler() {
  this.getNum = function (input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);
    if (!nums) return undefined;

    let num1 = parseFloat(nums[0]);
    let num2 = parseFloat(nums[1] || "1");
    if (isNaN(num1) || isNaN(num2)) return undefined;

    return num1 / num2;
  };

  this.getUnit = function (input) {
    let unit = numberStringSplitter(input)[1].toLowerCase();
    const validUnits = ["km", "gal", "lbs", "mi", "l", "kg"];
    return validUnits.includes(unit) ? (unit === "l" ? "L" : unit) : undefined;
  };
}

  try {
    result = eval(numStr);
  } catch (e) {
    result = "invalid number";
  }
  
  return result;
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

