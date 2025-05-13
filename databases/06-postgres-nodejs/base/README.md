# PostgreSQL and Node.js Examples

This folder contains examples of applications that demonstrate how to interact with a PostgreSQL database using Node.js. These examples showcase different use cases, such as managing items in a CLI app, handling library book records, and managing a to-do list.

## Examples

### 1. Item CLI App
- **Description**: A CLI application that allows users to manage a list of items stored in a PostgreSQL database. Users can add, view, update, and delete items.
- **How to Run**:
  1. Navigate to the `item-cli-app` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the application:
     ```bash
     node index.js
     ```
  4. Follow the CLI prompts to interact with the database.

### 2. Library Book Management App
- **Description**: A Node.js application that manages library book records in a PostgreSQL database. Users can add, view, update, and delete book records.
- **How to Run**:
  1. Navigate to the `library-book-management-app` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the application:
     ```bash
     node index.js
     ```
  4. Use the CLI prompts to manage library book records.

### 3. To-Do List App
- **Description**: A CLI application that allows users to manage a to-do list stored in a PostgreSQL database. Users can add tasks, mark them as complete, and delete tasks.
- **How to Run**:
  1. Navigate to the `todo-list-app` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the application:
     ```bash
     node index.js
     ```
  4. Follow the CLI prompts to manage your to-do list.

## Prerequisites
- [Node.js](https://nodejs.org) installed on your machine.
- A running PostgreSQL database instance.
- Update the database connection settings in each app's `index.js` file to match your PostgreSQL configuration.

## Notes
- These examples use the `pg` library to interact with PostgreSQL.
- Ensure your PostgreSQL database is running and accessible before starting the applications.
- Example SQL scripts for creating the necessary tables may be included in the respective folders.