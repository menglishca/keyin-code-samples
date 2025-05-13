/**
 * Computes the factorial of a number
 * 
 * @param {Number} number The number to compute the factorial of
 * @returns {Number|undefined} The factorial of the number or undefined if an error occurs
 */
function factorial(number) {
    const parsedNumber = parseInt(number);
    if (isNaN(parsedNumber)) {
        return undefined;
    }

    if (parsedNumber === 0) {
        return 1;
    }

    if (parsedNumber < 0) {
        return undefined;
    }

    return parsedNumber * factorial(parsedNumber - 1);
}

module.exports = {
    factorial
};