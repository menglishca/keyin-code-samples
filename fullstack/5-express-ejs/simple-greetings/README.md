# Simple Greeting App

## Project Overview
The **Simple Greeting App** is a basic Express.js application that displays a different greeting on each page load. It also displays the current date beneath the greeting. The app uses **EJS** as the templating engine and includes unit tests to validate the greeting function.

## Features
- Displays a random greeting each time the page is loaded.
- Shows the current date in a formatted style (e.g., October 1st, 2024 at 1:32PM).
- Unit tests for the greeting function.

## Getting Started
1. **Install dependencies**:
   ```bash
   npm install
   ```
1. **Run the application**:
   ```bash
   npm start
   ```
1. **Run tests**:
   ```bash
   npm test
   ```

## How to Add a New Greeting
- Modify the `generateGreeting` function in `app.js` to add or change greetings.

## Repo Explanation
- The `base` folder contains the skeleton code used to start the example
- The `complete` folder contains the completed app