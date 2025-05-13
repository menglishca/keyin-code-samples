function factorial(number) {
    const parsedNumber = parseInt(number);
    if (isNaN(parsedNumber)) {
        return undefined;
    }

    if (parsedNumber === 0) {
        return 1;
    }

    if (parsedNumber < 0) {
        return undefined;
    }

    return parsedNumber * factorial(parsedNumber - 1);
}

module.exports = {
    factorial
};