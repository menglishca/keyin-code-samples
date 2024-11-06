const greetings = [
    "Hello, world!",
    "Welcome to our site!",
    "Greetings, visitor!",
    "Good day!",
    "Howdy!"
];

/**
 * Generates a random greeting
 * 
 * @returns {string} The randomly generated greeting
 */
function getRandomGreeting() {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}

module.exports = {
    getRandomGreeting,
}