#!/usr/bin/env node

const process = require('node:process');

const conversionTable = {
    kmToMiles: (km) => km / 1.60934,
    milesToKm: (miles) => miles * 1.60934,

    cToF: (c) => (c * 9/5) + 32,
    fToC: (f) => (f - 32) * 5/9,

    kgToLbs: (kg) => kg * 2.20462,
    lbsToKg: (lbs) => lbs / 2.20462,

    litersToGallons: (liters) => liters / 3.78541,
    gallonsToLiters: (gallons) => gallons * 3.78541,
};

/**
 * Perform the actual conversion based on the provided units
 * 
 * @param {number} value The value to convert
 * @param {string} startingUnit The unit to convert from
 * @param {string} endingUnit The unit to convert to
 * @returns The converted value
 */
function convert(value, startingUnit, endingUnit) {
    startingUnit = startingUnit.toLowerCase();
    endingUnit = endingUnit.toLowerCase();

    if (startingUnit === 'km' && (endingUnit === 'miles' || endingUnit === 'mile')) {
        return conversionTable.kmToMiles(value);
    }
    else if ((startingUnit === 'miles' || startingUnit === 'mile') && endingUnit === 'km') {
        return conversionTable.milesToKm(value);
    }
    else if (startingUnit === 'c' && endingUnit === 'f') {
        return conversionTable.cToF(value);
    }
    else if (startingUnit === 'f' && endingUnit === 'c') {
        return conversionTable.fToC(value);
    }
    else if (startingUnit === 'kg' && endingUnit === 'lbs') {
        return conversionTable.kgToLbs(value);
    }
    else if (startingUnit === 'lbs' && endingUnit === 'kg') {
        return conversionTable.lbsToKg(value);
    }
    else if (startingUnit === 'liters' && (endingUnit === 'gallons' || endingUnit === 'gallon')) {
        return conversionTable.litersToGallons(value);
    }
    else if (startingUnit === 'gallons' && (endingUnit === 'liters' || endingUnit === 'liter')) {
        return conversionTable.gallonsToLiters(value);
    }
    else {
        throw new Error(`Unsupported conversion: ${startingUnit} to ${endingUnit}`);
    }
}

/**
 * Prints the help message
 */
function printHelpMessage() {
    console.log(`
Usage: unit-convert [value] [from unit] [to unit] ...
    
Supported conversions:
  - Length: kilometers (km) <-> miles (miles)
  - Temperature: Celsius (C) <-> Fahrenheit (F)
  - Mass: kilograms (kg) <-> pounds (lbs)
  - Volume: liters <-> gallons
  
Example:
  unit-convert 10 km miles
  Result: 6.21371 miles

  unit-convert 100 f c
  Result: 37.7778 C
  
  unit-convert 5 kg lbs 3 liters gallons
  Result: 5 kg = 11.0231 lbs
          3 liters = 0.792516 gallons
    `);
}

/**
 * Handle multiple conversions
 * 
 * @param {string[]} userArguments Array of arguments in the format [value, from, to]
 */
function handleConversions(userArguments) {
    if (userArguments.length === 0 || userArguments.length % 3 !== 0) {
        printHelpMessage();
        return;
    }

    for (let i = 0; i < userArguments.length; i += 3) {
        const value = parseFloat(userArguments[i]);
        const fromUnit = userArguments[i + 1];
        const toUnit = userArguments[i + 2];

        if (isNaN(value)) {
            console.error("Error: Provided value is not a number, please try again.")
            printHelpMessage();
            return;
        }

        try {
            const result = convert(value, fromUnit, toUnit);
            console.log(`${value} ${fromUnit} = ${result} ${toUnit}`);
        }
        catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}

handleConversions(process.argv.slice(2));