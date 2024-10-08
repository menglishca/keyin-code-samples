/**
 * Possible weather conditions
 * @enum
 */
const WeatherConditions = {
    SUNNY: 'sunny',
    CLOUDY: 'cloudy',
    FOG: 'foggy',
    PARTIALLY_SUNNY: 'partially sunny',
    RAIN: 'raining',
};

/**
 * Generates a random weather report
 * 
 * @returns {{temperature: number, weatherCondition: WeatherConditions}} The random weather report
 */
function getRandomWeatherReport() {
    const weatherConditions = Object.values(WeatherConditions);
    return {
        temperature: getRandomNumber(1, 25),
        weatherCondition: weatherConditions[getRandomNumber(0, weatherConditions.length - 1)]
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * 
 * @param {number} min - The minimum value to generate
 * @param {number} max - The maximum value to generate
 * @returns {number}The randomly generated number
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    getRandomNumber,
    getRandomWeatherReport,
    WeatherConditions,
};