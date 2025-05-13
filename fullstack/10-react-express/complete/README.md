# React and Express Examples

This folder contains examples of full-stack web applications built using React for the frontend and Express.js for the backend. These examples demonstrate how to integrate a React client with an Express server to create dynamic and interactive web applications.

## Examples

### 1. Guestbook App
- **Description**: A web app where users can leave messages in a guestbook. The frontend is built with React, and the backend uses Express to handle API requests and store messages.
- **How to Run**:
  1. Navigate to the `guestbook-app` folder.
  2. Start the backend server:
     1. Navigate to the `server` folder.
     2. Install dependencies:
        ```bash
        npm install
        ```
     3. Start the server:
        ```bash
        node index.js
        ```
  3. Start the frontend client:
     1. Navigate to the `client` folder.
     2. Install dependencies:
        ```bash
        npm install
        ```
     3. Start the React development server:
        ```bash
        npm start
        ```
  4. Open your browser and navigate to `http://localhost:3000`.

### 2. Pet Adoption App
- **Description**: A web app that allows users to browse and adopt pets. The React frontend communicates with the Express backend to fetch and manage pet data.
- **How to Run**:
  1. Navigate to the `pet-adoption-app` folder.
  2. Start the backend server:
     1. Navigate to the `server` folder.
     2. Install dependencies:
        ```bash
        npm install
        ```
     3. Start the server:
        ```bash
        node index.js
        ```
  3. Start the frontend client:
     1. Navigate to the `client` folder.
     2. Install dependencies:
        ```bash
        npm install
        ```
     3. Start the React development server:
        ```bash
        npm start
        ```
  4. Open your browser and navigate to `http://localhost:3000`.

## Prerequisites
- [Node.js](https://nodejs.org) installed on your machine.
- [npm](https://www.npmjs.com/) installed for managing dependencies.

## Notes
- The frontend React apps are bootstrapped with [Create React App](https://create-react-app.dev/).
- The backend Express servers handle API requests and serve static files.
- Static assets for the frontend are located in the `public` folder of each React app.
- View templates for the backend (if any) are located in the `views` folder of each server.