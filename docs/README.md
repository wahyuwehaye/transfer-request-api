
# Transfer Request Management API

## Introduction

This API facilitates the interaction between three distinct roles: Maker, Approver, and Admin. It is built using Node.js, Express.js, and MongoDB.

## Features

- Role-based access control
- Comprehensive CRUD operations for transfer requests
- JWT-based authentication and authorization
- Soft delete feature for Admin role
- Comprehensive filtering options for viewing the history
- Swagger-based API documentation

## Installation and Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-github/transfer-request-management.git
    cd transfer-request-management
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Setting up environment variables:**
    - Rename `.env.example` to `.env`.
    - Fill in the required environment variables (like `MONGO_URI`, `JWT_SECRET`, etc.)

4. **Starting the server:**
    ```bash
    npm start
    ```

## Testing

Tests have been written using Jest and Supertest. To run tests, use:
```bash
npm test
```

## API Documentation

API documentation is available through Swagger. Once the server is running, navigate to:
```
http://localhost:3000/api-docs
```

## Endpoints Overview

### Auth
- `/api/auth/register` - Register a new user
- `/api/auth/login` - Login a user

### Users
- Various CRUD operations restricted based on role

### Transfers
- Creation, approval, and retrieval of transfer requests

### Admin
- Soft delete operations and more, exclusive to Admin role

### History
- Comprehensive filtering options for transfer request history, accessible only by Admin

## Roles and Permissions

- **Maker**: Can create transfer requests and view them.
- **Approver**: Can create, approve, or reject transfer requests.
- **Admin**: Has all permissions of Maker and Approver, can soft delete requests (except those with 'done' status), and can view transfer history with filters.

## Contributing

Pull requests are welcome. Please ensure to update tests as appropriate.

## License

MIT
```
