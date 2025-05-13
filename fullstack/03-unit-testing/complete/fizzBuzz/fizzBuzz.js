/**
 * If a number is divisible by 3, return "Fizz"
 * If a number is divisible by 5, return "Buzz"
 * If a number is divisible by 3 and 5, return "FizzBuzz"
 * Otherwise, return the provided number
 *
 * @param {number} number - The number to evaluate and print.
 * @returns {string} The computed result
 */
function fizzBuzz(number) {
    if (number % 3 == 0 && number % 5 == 0) {
        return "FizzBuzz";
    }
    if (number % 3 == 0) {
        return "Fizz";
    }
    if (number % 5 == 0) {
        return "Buzz";
    }

    return number;
}

module.exports = {
    fizzBuzz,
};