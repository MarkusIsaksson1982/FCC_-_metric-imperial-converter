/* I have utilized ChatGPT and Perplexity as resources for guidance and learning throughout this project. My approach reflects the growing trend of modern developers using AI tools to enhance their coding processes. However, all the final code presented here is my own work, based on own independently thought out  prompts and without copying prompts or code from others other than snippets. I believe this practice aligns with the principles of academic honesty, as it emphasizes learning and using technology responsibly. */

function ConvertHandler() {
  
  this.getNum = function(input) {
    if (!input) return 1; // Default to 1 if input is undefined or empty
  
    const numRegex = /^([\d./]+)?/; // Match the number part of the input
    const match = input.match(numRegex);
    if (!match || !match[1]) return 1; // Default to 1 if no number is provided
    
    const numStr = match[1];
  
    // Check for double fractions
    if ((numStr.match(/\//g) || []).length > 1) {
      return "invalid number";
    }
  
    // Handle fractions (e.g., "2.5/5")
    if (numStr.includes('/')) {
      const [numerator, denominator] = numStr.split('/');
      if (!numerator || !denominator || isNaN(numerator) || isNaN(denominator)) {
        return "invalid number";
      }
      return parseFloat((parseFloat(numerator) / parseFloat(denominator)).toFixed(5));
    }
  
    // Handle decimals or whole numbers
    const result = parseFloat(numStr);
    return isNaN(result) ? "invalid number" : parseFloat(result.toFixed(5));
  };
  
    
    // Extracts and validates the unit
    
  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    if (!match) return "invalid unit";
    
    const unit = match[0].toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    
    if (!validUnits.includes(unit)) return "invalid unit";
    return unit === "l" ? "L" : unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const units = {
      gal: "L",
      l: "gal", // Add support for lowercase "l"
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs"
    };
    return units[initUnit.toLowerCase()] || "invalid unit"; // Normalize to lowercase
  };
  
  
  
    // Spells out the full unit name for display purposes
    this.spellOutUnit = function(unit) {
      const unitNames = {
        gal: "gallons",
        l: "liters", // Add support for lowercase "l"
        mi: "miles",
        km: "kilometers",
        lbs: "pounds",
        kg: "kilograms"
      };
      return unitNames[unit.toLowerCase()] || "invalid unit"; // Normalize to lowercase
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
  
    // Formats the conversion result into a descriptive string
    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  }
  
  
  
  
  module.exports = ConvertHandler;
  
