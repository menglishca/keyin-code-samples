const { factorial } = require("../factorial");

describe("Tests for factorial", () => {
    test("Verify factorial 0 is computed correctly", () => {
        expect(factorial(0)).toBe(1);
    });

    test("Verify that factorial of a negative number returns undefined", () => {
        expect(factorial(-1)).toBe(undefined);       
    })

    test("Verify that factorial of a positive number is correct", () => {
        expect(factorial(3)).toBe(6);
    });

    test("Verify that numbers are properly validated", () => {
        expect(factorial("not a number")).toBe(undefined);
    })
});