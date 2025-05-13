# PostgreSQL and Express Examples

This folder contains examples of applications that demonstrate how to interact with a PostgreSQL database using Express.js. These examples showcase different use cases, such as managing library book records, handling product inventory, and managing user accounts.

## Examples

### 1. Library Book Management
- **Description**: A web application that allows users to manage library book records stored in a PostgreSQL database. Users can add, view, update, and delete book records through a web interface.
- **How to Run**:
  1. Navigate to the `library-book-management` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the server:
     ```bash
     node index.js
     ```
  4. Open your browser and navigate to `http://localhost:3000`.

### 2. Product Inventory
- **Description**: A web application that allows users to manage product inventory stored in a PostgreSQL database. Users can add, view, update, and delete product records through a web interface.
- **How to Run**:
  1. Navigate to the `product-inventory` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the server:
     ```bash
     node index.js
     ```
  4. Open your browser and navigate to `http://localhost:3000`.

### 3. User Management
- **Description**: A web application that allows users to manage user accounts stored in a PostgreSQL database. Users can add, view, update, and delete user records through a web interface.
- **How to Run**:
  1. Navigate to the `user-management` folder.
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
- A running PostgreSQL database instance.
- Update the database connection settings in each app's `index.js` file to match your PostgreSQL configuration.

## Notes
- These examples use the `pg` library to interact with PostgreSQL.
- Ensure your PostgreSQL database is running and accessible before starting the applications.
- Example SQL scripts for creating the necessary tables may be included in the respective folders.
- Static assets (e.g., CSS) are located in the `public` folder of each app.