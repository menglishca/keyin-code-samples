const { greetingGenerator } = require("../greetingGenerator");

describe("Tests for the greetingGenerator", () => {
    test("Verify that good morning is returned before 12 PM", () => {
        expect(greetingGenerator(9)).toBe("Good Morning");
    });
    
    test("Verify that good afternoon is returned after 12 and before 6 PM", () => {
        expect(greetingGenerator(14)).toBe("Good Afternoon");
    });

    test("Verify that good evening is returned for all other times", () => {
        expect(greetingGenerator(19)).toBe("Good Evening");
    });
});