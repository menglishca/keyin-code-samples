# RESTful API Examples

This folder contains examples of RESTful APIs built using Node.js and Express.js. Each example demonstrates different concepts, such as handling HTTP requests, managing routes, and working with JSON data.

## Examples

### 1. Library API
- **Description**: A RESTful API for managing a library system. It allows users to perform CRUD operations on books, such as adding, retrieving, updating, and deleting book records.
- **How to Run**:
  1. Navigate to the `library-api` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the server:
     ```bash
     node index.js
     ```
  4. Use a tool like [Postman](https://www.postman.com) or `curl` to interact with the API at `http://localhost:3000`.

### 2. Pet Adoption API
- **Description**: A RESTful API for managing a pet adoption system. It allows users to view available pets, add new pets, and update or delete pet records.
- **How to Run**:
  1. Navigate to the `pet-adoption-api` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the server:
     ```bash
     node index.js
     ```
  4. Use a tool like [Postman](https://www.postman.com) or `curl` to interact with the API at `http://localhost:3000`.

## Prerequisites
- [Node.js](https://nodejs.org) installed on your machine.

## Notes
- Each API uses Express.js for routing and JSON data handling.
- Refer to the `routes` or `controllers` in each app for specific API endpoints.
- Example data is typically stored in-memory or in a simple JSON file for demonstration purposes.