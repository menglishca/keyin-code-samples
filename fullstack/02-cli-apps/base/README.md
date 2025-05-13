# Fullstack CLI Apps Examples

This folder contains examples of CLI (Command Line Interface) applications built using Node.js. Each example demonstrates different concepts and techniques for building CLI tools, such as argument parsing, user interaction, and basic functionality.

## Examples

### 1. Hello World App
- **Description**: A simple CLI app that prints "Hello, World!" to the console.
- **How to Run**:
  ```bash
  node hello-world-app/index.js --greet
  ```
  Use `--help` to see usage instructions.

### 2. CLI Math Calculator
- **Description**: A calculator that performs basic arithmetic operations (addition, subtraction, multiplication, division) and evaluates chained operations.
- **How to Run**:
  ```bash
  node cli-math-calculator/index.js 5 "+" 3 "*" 2
  ```
  Use `--help` to see usage instructions.

### 3. Math Quiz
- **Description**: A CLI app that generates random math questions (addition or subtraction) and quizzes the user.
- **How to Run**:
  ```bash
  node math-quiz/index.js --questions 5
  ```
  Use `--help` to see usage instructions.

### 4. Text Statistics
- **Description**: A CLI app that analyzes a given text and provides statistics such as word count, sentence count, and character count.
- **How to Run**:
  ```bash
  node text-statistics/index.js --words "This is a sample text."
  ```
  Use `--help` to see usage instructions.

## Prerequisites
- [Node.js](https://nodejs.org) installed on your machine.

## Setup
1. Navigate to the folder of the desired example.
2. Install dependencies (if any) by running:
   ```bash
   npm install
   ```

## Running the Examples
1. Use the `node` command to execute the desired script, passing the appropriate arguments.
2. Refer to the `--help` option in each app for detailed usage instructions.
