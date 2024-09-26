/**
 * Write a function what checks if the provided string is 
 * the same forwards as it is backwards

    Ignore spacing and punctuation
 */

function isPalindrome(text) {
    const cleanedText = text.toLowerCase().replace(/\W/g, '');
    return cleanedText === cleanedText.split('').reverse().join('');
}

module.exports = {
    isPalindrome,
}