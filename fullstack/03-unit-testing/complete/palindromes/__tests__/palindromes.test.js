const { isPalindrome } = require("../palindromes");

describe("Verify isPalindrome correctly detects palindromes", () => {
    test("An all letters palindrome is correctly detected", () => {
        expect(isPalindrome("racecar")).toBe(true);
    });

    test("Spaces are ignored and a palindrome is properly detected", () => {
        expect(isPalindrome("race car")).toBe(true);
    });

    test("Punctuation is ignored and a palindrome is properly detected", () => {
        expect(isPalindrome("Madam, I'm Adam")).toBe(true);
    });

    test("A non palindrome is correctly detected", () => {
        expect(isPalindrome("palindrome")).toBe(false);
    });

    test("A non palindrome with spaces is correctly detected", () => {
        expect(isPalindrome("not a palindrome")).toBe(false);
    });

    test("A non palindrome with punctuation is correctly detected", () => {
        expect(isPalindrome("Is this a palindrome? No")).toBe(false);
    });
});