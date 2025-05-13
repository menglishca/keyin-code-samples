const { getRandomNumber, getRandomWeatherReport, WeatherConditions } = require('../../utils/weatherGenerator');

describe("Tests for the weather generator", () => {
    test("Tests that the getRandomWeatherReport generates a proper weather report", () => {
        const randomWeatherReport = getRandomWeatherReport();
        expect(randomWeatherReport?.temperature).not.toBeNaN();
        expect(Object.values(WeatherConditions)).toContain(randomWeatherReport.weatherCondition);
    });

    test("Tests that the random number generator generates a number in the proper bounds", () => {
        const lowerBound = 1;
        const upperBound = 5;
        const randomNumber = getRandomNumber(lowerBound, upperBound);
        expect(randomNumber).toBeGreaterThanOrEqual(lowerBound);
        expect(randomNumber).toBeLessThanOrEqual(upperBound);
    });
});