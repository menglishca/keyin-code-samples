const { getRandomGreeting } = require("../../utils/greetingGenerator");

describe("Tests for getRandomGreeting", () => {
    test("Verify a valid greeting is returned", () => {
        expect(getRandomGreeting()).toBeTruthy();
    })
});