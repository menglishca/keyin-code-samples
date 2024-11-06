#!/usr/bin/env node

const readline = require('readline');
const process = require('node:process');

const mathOperators = {
    MULTIPLY: {
        symbol: '*',
        calculate: (termOne, termTwo) => termOne * termTwo,
    },
    ADD: {
        symbol: '+',
        calculate: (termOne, termTwo) => termOne + termTwo,
    },
    SUBTRACT: {
        symbol: '-',
        calculate: (termOne, termTwo) => termOne - termTwo,
    },
};

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let score = { correct: 0, wrong: 0 };
let questionCount = 5; // default number of questions
let currentQuestion = 0;

/**
 * Gets a random integer between the specified minimum (inclusive) and the maximum (exclusive)
 * 
 * @param {Number} min The minimum value to generate
 * @param {Number} max The value our generated number should not meet or exceed
 * @returns {Number} The randomly generated integer.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

/**
 * Gets a random math operator
 * 
 * @returns {{}} The random math operator
 */
function getMathOperator() {
    const mathOperatorKeys = Object.keys(mathOperators);
    const randomArrayIndex = getRandomInt(0, mathOperatorKeys.length);
    return mathOperators[mathOperatorKeys[randomArrayIndex]];
}

/**
 * Generate a random math question (addition or subtraction)
 * 
 * @returns {{question: string, answer: Number}} An object with the question and the correct answer
 */
function generateQuestion() {
    const firstTerm  = getRandomInt(1, 21);
    const secondTerm  = getRandomInt(1, 21);
    const operator = getMathOperator();
    
    const question = `${firstTerm} ${operator.symbol} ${secondTerm}`;

    return { 
        question: question,
        answer: operator.calculate(firstTerm, secondTerm),
    };
}

/**
 * Ask a single math question and handle the user's input
 * 
 * @param {Object} questionObj The question object with the question and the answer
 */
function askQuestion(questionObj) {
    ioInterface.question(`Question ${currentQuestion + 1}: ${questionObj.question} = `, (userAnswer) => {

        if (parseInt(userAnswer.trim()) === questionObj.answer) {
            console.log("Correct!\n");
            score.correct++;
        }
        else {
            console.log(`Wrong! The correct answer was ${questionObj.answer}\n`);
            score.wrong++;
        }

        currentQuestion++;
        if (currentQuestion < questionCount) {
            askQuestion(generateQuestion());
        }
        else {
            console.log("Quiz complete!");
            console.log(`You got ${score.correct} questions correct and ${score.wrong} wrong.`);
            ioInterface.close();
            process.stdin.destroy();
        }
    });
}

/**
 * Print the help message
 */
function printHelpMessage() {
    console.log(`
Usage: math-quiz [options]

Options:
  --questions [number]     Set the number of questions (default: 5)
  --time [seconds]         Set the time limit per question in seconds (default: 10)

Example:
  math-quiz --questions 10 --time 15
  `);
}

/**
 * Handle incoming user arguments
 * 
 * @param {string[]} userArguments Command line arguments
 */
function handleArguments(userArguments) {
    if (userArguments.length === 0) {
        printHelpMessage();
        return;
    }

    for (let i = 0; i < userArguments.length; i++) {
        switch (userArguments[i]) {
            case '--questions':
                questionCount = parseInt(userArguments[i + 1], 10);
                i++;
                break;
            case '--help':
                printHelpMessage();
                return;
            default:
                console.log(`Unknown option: ${userArguments[i]}`);
                printHelpMessage();
                return;
        }
    }

    console.log(`Starting a quiz with ${questionCount} questions.\n`);
    askQuestion(generateQuestion());
}
const userArguments = process.argv.slice(2);
handleArguments(userArguments);