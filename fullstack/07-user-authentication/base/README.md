# User Authentication Examples

This folder contains examples of web applications that demonstrate user authentication using Node.js and Express.js. These examples cover basic login and registration functionality, including form handling, session management, and rendering views with EJS.

## Examples

### 1. Simple Login
- **Description**: A web app that allows users to log in with a username and password. Upon successful login, users are redirected to a dashboard page.
- **How to Run**:
  1. Navigate to the `simple-login` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the server:
     ```bash
     node index.js
     ```
  4. Open your browser and navigate to `http://localhost:3000`.

### 2. Simple Registration
- **Description**: A web app that allows users to register with a username and password, log in, and access a protected dashboard page.
- **How to Run**:
  1. Navigate to the `simple-registration` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the server:
     ```bash
     node index.js
     ```
  4. Open your browser and navigate to `http://localhost:3000`.

## Prerequisites
- [Node.js](https://nodejs.org) installed on your machine.

## Notes
- Each example uses EJS for rendering views and includes basic CSS for styling.
- Static assets (e.g., CSS) are located in the `public` folder of each app.
- View templates are located in the `views` folder of each app.
- These examples are for demonstration purposes and do not include advanced security measures such as password hashing or database integration.