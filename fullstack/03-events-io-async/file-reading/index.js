#!/usr/bin/env node

const fs = require('node:fs');
const process = require('node:process');

function ourReadFile() {
    try {
        console.log("Synchronous - Print 1");
        const data = fs.readFileSync('test.txt', 'utf-8');
        console.log(`File data: ${data}`);
        console.log("Synchronous - Print 2");
    }
    catch (error) {

    }
}

function ourReadFileCallbacks() {
    console.log("Callbacks - Synchronous Print 1");
    fs.readFile('test.txt', 'utf-8', (error, data) => {
        console.log(`File data: ${data}`);
        console.log("Callbacks - Second print inside the callback");
    });
    console.log("Callbacks - Synchronous Print 2");
}

function ourReadFileAsync() {
    console.log("Async - Synchronous Print 1");
    fs.promises.readFile('test.txt', 'utf-8')
        .then((data) => {
            console.log(`File data: ${data}`);
        })
        .then(() => {
            console.log("Async - Second chained Promise");
        });
    console.log("Async - Synchronous Print 2");
}

function printHelp() {
    console.log(`
Usage: read-file [OPTION]

A simple CLI tool for reading files with different methods.

Options:
  --async       Read 'test.txt' using asynchronous promises.
  --sync        Read 'test.txt' synchronously.
  --callback    Read 'test2.txt' and 'test.txt' using callback functions.
  --callbacks   Same as --callback, for backwards compatibility.
  --help        Display this help message.

If no option is provided, the default behavior is to read 'test.txt' using asynchronous promises.

Examples:
  read-file --async      # Reads 'test.txt' using asynchronous promises.
  read-file --sync       # Reads 'test.txt' synchronously.
  read-file --callback   # Reads 'test.txt' using callbacks.

Notes:
  - Ensure that 'test.txt' exists in the same directory as this script.
`);
}

const userArguments = process.argv.slice(2);
if (userArguments.length === 0) {
    ourReadFileAsync();
}
else {
    switch (userArguments[0]) {
        case '--async':
            ourReadFileAsync();
            break;
        case '--sync':
            ourReadFile();
            break;
        case '--callback':
        case '--callbacks':
            ourReadFileCallbacks();
            break;
        case '--help':
        case '-h':
            printHelp();
            break;
        default:
            console.error("Unknown option. Use --help for usage information.");
            printHelp();
            break;
    }
}
