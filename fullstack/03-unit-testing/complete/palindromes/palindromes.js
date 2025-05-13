/**
 * Ignoring spacing and punctuation, gets whether or not the provided text is a palindrome (the same backwards and 
 * forwards)
 * 
 * @param {string} text The text to test
 * @returns {boolean} True if the text is a palindrome, false otherwise.
 */
function isPalindrome(text) {
    const cleanedText = text.toLowerCase().replace(/\W/g, '');
    return cleanedText === cleanedText.split('').reverse().join('');
}

module.exports = {
  isPalindrome,
};
