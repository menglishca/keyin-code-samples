/**
 * Possible weather conditions
 * @enum
 */
const WeatherConditions = {
    SUNNY: 'sunny',
    CLOUDY: 'cloudy',
    FOG: 'fog',
    PARTIALLY_SUNNY: 'partially sunny',
    RAIN: 'rain',
};

/**
 * Generates a random weather report
 * 
 * @returns {{temperature: number, weatherCondition: WeatherConditions}} The random weather report
 */
function getRandomWeatherReport() {
    
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