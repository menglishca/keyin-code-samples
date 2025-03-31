const { factorial } = require("../factorial");

describe("Tests for factorial", () => {
    test("Verify factorial(0) returns 1", () => {
        expect(factorial(0)).toBe(1);
    });

    test("Verify factorial(-1) returns undefined", () => {
        expect(factorial(-1)).toBe(undefined);
    });

    test("Verify factorial(3) returns 6", () => {
        expect(factorial(3)).toBe(6);
    });
});
