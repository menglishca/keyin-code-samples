# Express Task Manager
This repository serves as a **template** for the Task Manager application, used in your assignment. It provides a basic Express.js app with in-memory storage to manage tasks. Your task is to extend this application by integrating it with a PostgreSQL database.

## Setup Instructions  

### Prerequisites  
- [Node.js](https://nodejs.org) installed on your machine.  
- A code editor, such as [VSCode](https://code.visualstudio.com/).

## How to Use this Template  

This repository is set up as a **GitHub template** to help you quickly create your own version of the **Task Manager**.  

### Steps to Create Your Own Repository  

1. **Click the "Use this template" button** at the top of this page on GitHub.  

1. **Name your new repository** and choose its visibility (public or private).  

1. Once your repository is created, **clone your new repo** to your local machine:  
    ```bash  
    git clone <your-new-repo-url>  
    ```  

1. Navigate into the project directory and install the necessary dependencies:  
    ```bash  
    cd <your-new-repo-name>  
    npm install  
    ```  

1. **Run the app:**  
    ```bash  
    npm start  
    ```  
    This will start the server at `http://localhost:3000/`.  

1. You can now begin working on your project, adding your own code and committing your changes as you go:  
    ```bash  
    git add .  
    git commit -m "First commit"  
    git push origin main  
    ```  

## Features

The application currently includes the following functionality using in-memory storage:

- Retrieve all tasks.
- Add a new task.
- Update a task's status.
- Delete a task.

Your assignment is to replace the in-memory storage with a PostgreSQL database.

## API Endpoints

### **Get all tasks**
- **Method:** `GET`
- **Endpoint:** `/tasks`
- **Description:** Retrieves all tasks.

### **Add a new task**
- **Method:** `POST`
- **Endpoint:** `/tasks`
- **Body Parameters:**
  - `id`: Unique identifier for the task (number).
  - `description`: Description of the task (string).
  - `status`: Status of the task (`incomplete` or `complete`).

### **Update a task's status**
- **Method:** `PUT`
- **Endpoint:** `/tasks/:id`
- **Body Parameters:**
  - `status`: New status for the task (`incomplete` or `complete`).

### **Delete a task**
- **Method:** `DELETE`
- **Endpoint:** `/tasks/:id`

## Assignment Instructions

### Part 1: PostgreSQL Integration

1. Replace the `tasks` array in the code with a PostgreSQL database table. Ensure a method exists in the code to create that table if it does not already exist
1. Update the application to interact with the PostgreSQL database:
   - **GET /tasks:** Fetch all tasks from the database.
   - **POST /tasks:** Add a new task to the database.
   - **PUT /tasks/:id:** Update the status of a specific task in the database.
   - **DELETE /tasks/:id:** Delete a specific task from the database.

### Submission Requirements

- Push all your changes to your repository.
- Ensure your application runs correctly with `npm start`
- Include all required functionality as specified in the assignment description.