#!/usr/bin/env node

/**
 * Gets the number of words in the provided text
 * 
 * @param {string} text The text to get the word count from
 * @returns The number of words in the text
 */
function getWordCount(text) {

}

/**
 * Gets the number of paragraphs in the provided text
 * 
 * @param {string} text The text to get the paragraph count from
 * @returns The number of paragraphs in the text
 */
function getParagraphCount(text) {

}

/**
 * Gets the number of sentences in the provided text
 * 
 * @param {string} text The text to get the sentence count from
 * @returns The number of sentences in the text
 */
function getSentenceCount(text) {

}

/**
 * Gets the number of characters in the provided text
 * 
 * @param {string} text The text to get the character count from
 * @returns The number of characters in the text
 */
function getCharacterCount(text) {

}

/**
 * Prints the help message out to the console
 */
function printHelpMessage() {
    console.log(``);
}

/**
 * Handles the arguments provided to the application by the user.
 * 
 * @param {string[]} userArguments The arguments provided by the user
 */
function handleArguments(userArguments) {
    if (userArguments.length < 1) {
        printHelpMessage();
        return;
    }

    const userText = userArguments[userArguments.length - 1];
    let textStatistics = {};

    for (let i = 0; i < userArguments.length - 1; i++) {
        switch (userArguments[i]) {
            
        }
    }

    console.log(JSON.stringify(textStatistics, null, 4));
}

handleArguments(argv.slice(2));