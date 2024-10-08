# Express Node.js Application - README

## Overview

This is a full-featured REST API built using **Node.js** and **Express**, with data validation, authentication, and authorization mechanisms. It uses **PostgreSQL** as the database with **Sequelize** as the ORM, providing an abstraction layer that simplifies database interaction. The application incorporates several essential security and utility libraries such as **jsonwebtoken** for token generation and validation, **bcryptjs** for password hashing, and **uuid** for unique identifier creation.

## Features

### 1. **Data Validation**
   - The API uses the **Joi** library for schema-based validation, ensuring that data passed through requests adheres to defined rules.
   - Validation is implemented at the request level to avoid invalid data being processed by the application.

### 2. **RESTful API Implementation**
   - The API follows REST principles, with clearly defined endpoints for performing CRUD (Create, Read, Update, Delete) operations.
   - HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE` are used appropriately for resource management.

### 3. **Database Integration with Sequelize**
   - **Sequelize** is used as the ORM for interacting with the PostgreSQL database.
   - Benefits of using Sequelize:
     - **Database-Agnostic**: Allows for seamless migration between different SQL databases (MySQL, PostgreSQL, SQLite, etc.) without changing the codebase or SQL queries.
     - **Model-based Queries**: Rather than writing raw SQL, you can work with JavaScript objects and methods, making the code more maintainable.
     - **Built-in Associations**: Manage relationships between models (e.g., one-to-many, many-to-many) easily with Sequelize’s built-in association methods.

### 4. **User Authentication and Authorization**
   - **jsonwebtoken** is used for token-based authentication, ensuring that only authorized users can access protected routes.
   - Access tokens are generated during user login and are required to be present in the header for subsequent API requests.
   - **Role-based Access Control (RBAC)** is implemented to restrict certain actions to specific user roles (e.g., a **Buyer** cannot create products).
   - Passwords are hashed using **bcryptjs** to securely store user credentials.

### 5. **UUID for Unique ID Generation**
   - Instead of auto-incrementing IDs, **uuid** is used for creating unique user and product IDs, ensuring uniqueness across databases and providing better security by obscuring predictable ID patterns.

---

## Database Models

The application uses two core database models: **User** and **Product**.

### **User Model**
   - Contains information about the registered users.
   - Fields:
     - `id` (UUID)
     - `firstname`
     - `lastname`
     - `email`
     - `password` (hashed using **bcryptjs**)
     - `role` (e.g., `buyer` or `seller`)

### **Product Model**
   - Stores product information created by **Sellers**.
   - Fields:
     - `id` (UUID)
     - `name`
     - `category` (e.g., clothes, shoes, etc.)
     - `price`
     - `discount`
     - `sellerId` (references the seller who added the product)

---

## Environment Variables

The application uses environment variables for configuration. Make sure to create a `.env` file at the root of the project and add the following variables:

```bash
DB_DATABASE=<your-database-name>
DB_USERNAME=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_PORT=<your-database-port>
DB_HOST=<your-database-host>
DB_DIALECT=postgres

JWT_SECRET=<your-jwt-secret>
```

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ydvabhee/Workwise-assignment.git
cd Workwise-assignment/server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up the Environment Variables

Create a `.env` file in the root directory of the project and include the environment variables listed above.

### 4. Database Setup

Make sure PostgreSQL is installed and running on your system. Then create the required database:

```sql
CREATE DATABASE your-database-name;
```

### 5. Migrate Database Models

Use Sequelize to apply the migrations:

```bash
npx sequelize db:migrate
```

### 6. Run the Application

To start the development server, use:

```bash
npm run dev
```

This will run the app on [http://localhost:5000](http://localhost:5000).

---

## Usage

### **User Authentication**
- **Sign-Up**: Users can sign up with a role of either `buyer` or `seller`.
- **Login**: Users receive a JWT token upon login, which is required for accessing protected routes.

### **Product Management (Seller)**
- **Add Product**: Sellers can add products by providing the necessary details (name, category, price, etc.).
- **Edit/Delete Product**: Sellers can update or remove their own products.

### **Product Browsing (Buyer)**
- **Search Products**: Buyers can search for products by name or category.
- **Add to Cart**: Buyers can add products to their cart and manage their selections.

### **Access Rights**
- Buyers and Sellers have distinct access rights:
  - **Buyers** cannot create or modify products.
  - **Sellers** can manage their products.

---

## Technologies Used

- **Node.js**: Backend framework for creating RESTful APIs.
- **Express**: Server-side framework for routing and middleware management.
- **PostgreSQL**: SQL database for storing user and product data.
- **Sequelize**: ORM that simplifies database interactions and supports multiple SQL dialects.
- **Joi**: Schema-based validation for incoming request data.
- **jsonwebtoken**: Token generation and validation for secure authentication.
- **bcryptjs**: Hashing library for secure password storage.
- **uuid**: Utility for generating unique identifiers for models.

---

## Security Features

- **Password Hashing**: User passwords are hashed using **bcryptjs** before storing them in the database.
- **JWT Authentication**: API access is protected via JWT tokens, which are validated on each request.
- **Access Control**: Different roles (buyer, seller) are given access to specific API endpoints based on their permissions.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

---

Happy coding!