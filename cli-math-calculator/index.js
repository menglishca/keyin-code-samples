#!/usr/bin/env node

const process = require('node:process');

/**
 * Perform basic arithmetic operations
 * 
 * @param {number} a First operand
 * @param {string} operator The mathematical operator (+, -, *, /)
 * @param {number} b Second operand
 * @returns The result of the operation
 */
function calculate(a, operator, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                throw new Error('Division by zero is not allowed.');
            }
            return a / b;
        default:
            throw new Error(`Invalid operator: ${operator}`);
    }
}

/**
 * Parses and evaluates chained operations
 * 
 * @param {string[]} args Array of operands and operators
 * @returns The final result after evaluating all operations
 */
function evaluateChainedOperations(args) {
    if (args.length % 2 === 0) {
        throw new Error('Invalid input. Please provide an odd number of arguments (e.g., number operator number operator number).');
    }

    let result = parseFloat(args[0]);

    for (let i = 1; i < args.length; i += 2) {
        const operator = args[i];
        const nextOperand = parseFloat(args[i + 1]);
        result = calculate(result, operator, nextOperand);
    }

    return result;
}

/**
 * Prints the help message
 */
function printHelpMessage() {
    console.log(`
Usage: math-calc [number] [operator] [number] ... [operator] [number]

Basic operations:
  +   Addition
  -   Subtraction
  *   Multiplication
  /   Division

Example:
  math-calc 5 "+" 3 "*" 2
  Result: 16

Note: Operations are evaluated from left to right without considering operator precedence. Operators should be wrapped in quotes or the entire equation can be wrapped in quotes
    `);
}

/**
 * Handles the arguments provided to the application by the user.
 * 
 * @param {string[]} userArguments The arguments provided by the user
 */
function handleArguments(userArguments) {
    if (userArguments.length === 0) {
        printHelpMessage();
        return;
    }

    if (userArguments.length === 1) {
        userArguments = userArguments[0].split(" ");
    }

    try {
        const result = evaluateChainedOperations(userArguments);
        console.log(`Result: ${result}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        printHelpMessage();
    }
}

handleArguments(process.argv.slice(2));
