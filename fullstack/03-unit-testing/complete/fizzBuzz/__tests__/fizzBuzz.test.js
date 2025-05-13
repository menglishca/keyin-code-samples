const { fizzBuzz } = require("../fizzBuzz");

describe("Tests for FizzBuzz", () => {
    test("Verify if a number is divisible by 3 it returns Fizz", () => {
        expect(fizzBuzz(3)).toBe("Fizz");
    });

    test("Verify if a number is divisible by 5 it returns Buzz", () => {
        expect(fizzBuzz(5)).toBe("Buzz");
    });

    test("Verify if a number is divisible by 3 and 5 it returns FizzBuzz", () => {
        expect(fizzBuzz(15)).toBe("FizzBuzz");
    });

    test("Verify if a number is not divisible by 3 and 5 it returns itself", () => {
        expect(fizzBuzz(7)).toBe(7);
    });
});