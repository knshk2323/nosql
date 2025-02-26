# Library Management System (Backend)

## Description
This is a backend system for a library administrator, built using Node.js, Express, and MongoDB with Mongoose. It provides functionality for managing books, issuing books, and handling reader information. The system includes user authentication using JWT.

## Features
- User authentication (Registration & Login) with JWT
- Automatic database creation with Mongoose
- CRUD operations for books, readers, and issues
- Secure API endpoints for library management

## Installation

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or cloud instance)

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd nosql_final
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```sh
     MONGO_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     PORT=5000
     ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new admin user
- `POST /api/auth/login` - Login and receive a JWT token

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book
- `PUT /api/books/:id` - Update book details
- `DELETE /api/books/:id` - Remove a book

### Readers
- `GET /api/readers` - Get all readers
- `POST /api/readers` - Add a new reader

### Issues
- `POST /api/issues` - Issue a book to a reader
- `GET /api/issues` - Get issued books

## Usage
- Use Postman or a similar tool to test the API endpoints.
- Ensure MongoDB is running before starting the server.

## License
This project is licensed under the MIT License.

