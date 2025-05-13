# Single Sign-On (SSO) Examples

This folder contains examples of Single Sign-On (SSO) implementations using Node.js and Express.js. These examples demonstrate how to integrate third-party authentication providers and implement a local identity provider for SSO.

## Examples

### 1. GitHub SSO
- **Description**: A web app that allows users to log in using their GitHub account. After logging in, users can view their profile information and log out.
- **How to Run**:
  1. Navigate to the `github-sso` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the server:
     ```bash
     node index.js
     ```
  4. Open your browser and navigate to `http://localhost:3000`.
  5. Use the "Login with GitHub" button to authenticate via GitHub.

### 2. Local Identity Provider (IDP)
- **Description**: A web app that demonstrates a local identity provider and service provider setup for SSO. Users can sign up, log in, and access a protected dashboard.
- **How to Run**:
  1. Navigate to the `local-idp` folder.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the identity provider server:
     ```bash
     node identityProvider.js
     ```
  4. Start the service provider server:
     ```bash
     node serviceProvider.js
     ```
  5. Open your browser and navigate to `http://localhost:3000` for the service provider or `http://localhost:4000` for the identity provider.

## Prerequisites
- [Node.js](https://nodejs.org) installed on your machine.
- A GitHub account for the GitHub SSO example.

## Notes
- The `github-sso` example uses OAuth 2.0 for authentication with GitHub.
- The `local-idp` example demonstrates a custom SSO implementation with a local identity provider.
- Static assets (e.g., CSS) are located in the `public` folder of each app.
- View templates are located in the `views` folder of each app.