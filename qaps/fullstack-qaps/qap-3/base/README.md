# User Management System  

This is the starting point for the **User Management System** assignment. The goal of this project is to create a web application where users can register, log in, and access role-based functionality based on their account type (user or admin).

## Features  

- **Home Page**:  
  - Displays "Login" and "Sign Up" buttons.  
  - Redirects users to their dashboard after successful login.  

- **Registration Page**:  
  - Allows users to create an account with a username, email, and password.  
  - Stores passwords securely using bcrypt hashing.  

- **Login Page**:  
  - Authenticates users using their email and password.  
  - Checks hashed passwords for validity during authentication.  

- **Landing Page**:  
  - For **users**, displays a simple dashboard with their username.  
  - For **admins**, displays all registered users, their emails, and roles.  

- **Logout**:  
  - Logs the user out by destroying their session and redirecting to the home page.

## Setup Instructions  

### Prerequisites  
- [Node.js](https://nodejs.org) installed on your machine.  
- A code editor, such as [VSCode](https://code.visualstudio.com/).

## How to Use this Template  

This repository is set up as a **GitHub template** to help you quickly create your own version of the **User Management System**.  

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

By using this template, you'll have the project structure and initial setup ready to go, so you can focus on building the functionality!

## Development Guidelines  

1. **Authentication**:  
   - Use `express-session` for session management.  
   - Hash all passwords with bcrypt before storing them.  
   - Authenticate users during login by comparing hashed passwords.  

2. **Role-Based Access Control (RBAC)**:  
   - Restrict the admin view of all registered users to accounts with the admin role.  
   - Regular users should only access their dashboard.  

3. **Error Handling**:  
   - Display errors during login or signup if applicable.  

4. **Security**:  
   - Ensure no plaintext passwords are stored or transmitted.  

5. **Data Storage**:  
   - Use an in-memory array to store user accounts. Persistent data storage is not required.

## Submission Guidelines  

- Submit a link to your GitHub repository through the Teams assignment.  
- Ensure the application runs correctly with `npm start`.  
- Include all required functionality as specified in the assignment description.

## Notes  

- Extra npm packages are allowed (except for templating engines like React).  
- All pages should use **EJS templates** for rendering.  
- Focus on building secure and functional features with proper user experience.  