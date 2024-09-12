#!/usr/bin/env node

/**
 * Gets the number of words in the provided text
 * 
 * @param {string} text The text to get the word count from
 * @returns The number of words in the text
 */
function getWordCount(text) {
    return text.split(" ").length;
}

/**
 * Gets the number of paragraphs in the provided text
 * 
 * @param {string} text The text to get the paragraph count from
 * @returns The number of paragraphs in the text
 */
function getParagraphCount(text) {
    return text.split("\n").filter((paragraph) => paragraph.trim().length > 0).length;
}

/**
 * Gets the number of sentences in the provided text
 * 
 * @param {string} text The text to get the sentence count from
 * @returns The number of sentences in the text
 */
function getSentenceCount(text) {
    if (text.trim().length === 0) {
        return 0;
    }

    return text.split(". ").length;
}

/**
 * Gets the number of characters in the provided text
 * 
 * @param {string} text The text to get the character count from
 * @returns The number of characters in the text
 */
function getCharacterCount(text) {
    return text.length;
}

/**
 * Prints the help message out to the console
 */
function printHelpMessage() {
    console.log(`
Usage: text-stats [options] "<text>"

Options:
  --words, --wordCount            Get the word count of the provided text
  --sentences, --sentenceCount    Get the sentence count of the provided text
  --paragraphs, --paragraphCount  Get the paragraph count of the provided text
  --characters, --characterCount  Get the character count of the provided text

Example:
  text-statistics --words --characters "Hello world. This is a test."

  Output:
  {
    "wordCount": 6,
    "characterCount": 27
  }
  
Note: The text must be wrapped in quotes if it contains spaces.
    `);
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
            case '--words':
            case '--wordCount':
                textStatistics.wordCount = getWordCount(userText);
                break;
            case '--sentences':
            case '--sentenceCount':
                textStatistics.sentenceCount = getSentenceCount(userText);
                break;
            case '--paragraphs':
            case '--paragraphCount':
                textStatistics.paragraphCount = getParagraphCount(userText);
                break;
            case '--characters':
            case '--characterCount':
                textStatistics.characterCount = getCharacterCount(userText);
                break;
            case '-h':
            case '--help':
                printHelpMessage();
                return;
        }
    }

    console.log(JSON.stringify(textStatistics, null, 4));
}

handleArguments(argv.slice(2));