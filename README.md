# Project APIREST WITH JWT AND SWAGGER

## Description
This project is a RESTful API built with Node.js, Express, and MongoDB, designed for user authentication and activity management. It utilizes JSON Web Tokens (JWT) for secure authentication and provides comprehensive API documentation using Swagger.

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications
- **Express**: Web framework for Node.js to create API endpoints
- **MongoDB**: NoSQL database for storing user and activity data
- **Swagger**: Tool for API documentation and testing

## Installation
To set up the project locally, follow these steps:
  
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate into the project directory:
    ```bash
    cd <project-name>
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```
4. **Install MongoDB**: Make sure you have MongoDB installed and running on your local machine. You can download it from the [official MongoDB website](https://www.mongodb.com/try/download/community).

5. **Create a .env file**: In the root of your project, create a file named `.env` and add the following environment variables:
    ```plaintext
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/api-restful-db
    JWT_SECRET=supersecretkey
    ```

## Running the Project
To start the project in development mode, use the following command:
```bash
npm run dev
