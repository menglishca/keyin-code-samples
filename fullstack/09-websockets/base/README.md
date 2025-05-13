# WebSocket Examples

This folder contains examples of real-time web applications built using WebSockets with Node.js and Express.js. These examples demonstrate how to implement real-time communication between the server and clients.

## Examples

### 1. Real-Time Notifications
- **Description**: A web app that sends real-time notifications to connected clients. Notifications are triggered by server-side events and displayed instantly on the client.
- **How to Run**:
  1. Navigate to the `real-time-notifications` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the server:
     ```bash
     node index.js
     ```
  4. Open your browser and navigate to `http://localhost:3000`.

### 2. Stock Tracker
- **Description**: A web app that tracks stock prices in real-time. The server sends updated stock prices to all connected clients, and the data is displayed dynamically on the client.
- **How to Run**:
  1. Navigate to the `stock-tracker` folder.
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
- Each example uses WebSockets for real-time communication.
- Static assets (e.g., JavaScript, CSS) are located in the `public` folder of each app.
- View templates are located in the `views` folder of each app.
- These examples are for demonstration purposes and do not include advanced features like authentication or persistent storage.