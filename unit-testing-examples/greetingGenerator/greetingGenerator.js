/**
 * Write a function that gets a greeting for a user based
 * on the time of day.

    If it's currently before 12 PM, return "Good Morning"
    If it's between 12 and 6PM return "Good Afternoon"
    Otherwise, return "Good Evening"
 */

function greetingGenerator(currentHour) {
    if (currentHour < 12) {
        return "Good Morning";
    }
    if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon";
    }
    return "Good Evening";
}

module.exports = {
    greetingGenerator,
}