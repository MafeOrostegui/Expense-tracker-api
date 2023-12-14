# Expense Tracker API

Expense Tracker API is a sophisticated backend application tailored for efficient expense management. It provides a comprehensive set of endpoints designed to seamlessly handle accounts, categories, expenses, incomes, and user management.

## Deployment

The Expense Tracker API has been meticulously deployed and is now accessible at the following URL:

[Expense Tracker API Deployment](https://expense-tracker-api-k565.onrender.com/)

## Technologies Utilized

This robust API leverages cutting-edge technologies to deliver exceptional performance:

- **Express.js:** A powerful and minimalist web application framework for Node.js.
- **Node.js:** A JavaScript runtime that enables server-side applications to be built with ease.
- **MongoDB:** A versatile NoSQL database, providing flexibility in storing and managing data.
- **Mongoose:** An elegant MongoDB object modeling tool designed for use with Node.js.
- **Docker:** A platform that facilitates the development, shipping, and running of applications within containers.

## Installation Guide

Get started quickly with the Expense Tracker API by following these simple steps:

1. Clone the repository: `git clone https://github.com/MafeOrostegui/Expense-tracker-api`
2. Install dependencies: `npm install`
3. Configure environment variables as needed.
4. Run the application: `npm start`

## API Endpoints

### Accounts

#### Get Accounts
- **Endpoint:** `GET /accounts`
- **Description:** Retrieve a comprehensive list of user accounts.
- **Authorization:** Authentication is required.

#### Get Account
- **Endpoint:** `GET /accounts/:id`
- **Description:** Retrieve detailed information about a specific account.
- **Authorization:** Authentication is required.

#### Create Account
- **Endpoint:** `POST /accounts`
- **Description:** Initiate the creation of a new user account.
- **Authorization:** Authentication is required.

#### Edit Account
- **Endpoint:** `PATCH /accounts/:id`
- **Description:** Modify the details of a specific account.
- **Authorization:** Authentication is required.

#### Delete Account
- **Endpoint:** `DELETE /accounts/:id`
- **Description:** Permanently remove a specific account.
- **Authorization:** Authentication is required.

### Categories

*(Documentation structure mirrors that of Accounts)*

### Expenses

*(Documentation structure mirrors that of Accounts)*

### Incomes

*(Documentation structure mirrors that of Accounts)*

### Authentication

#### Login
- **Endpoint:** `POST /login`
- **Description:** Authenticate user login credentials.

### Users

#### Get User
- **Endpoint:** `GET /users/:uid`
- **Description:** Retrieve detailed information about a specific user.
- **Authorization:** Ownership authentication is required.

#### Register User
- **Endpoint:** `POST /users`
- **Description:** Register a new user.

#### Edit User
- **Endpoint:** `PATCH /users/:uid`
- **Description:** Modify the details of a specific user.
- **Authorization:** Ownership authentication is required.

#### Delete User
- **Endpoint:** `DELETE /users/:uid`
- **Description:** Permanently remove a specific user.
- **Authorization:** Ownership authentication is required.

## Root

#### Get API Information
- **Endpoint:** `GET /`
- **Description:** Retrieve essential information about the API, including its name and version.

## Error Handling

- **404: Not Found** - Returned if the requested endpoint does not exist.
- **500: Internal Server Error** - For unexpected server-side issues.

## Contributing

Feel empowered to contribute to the ongoing development of this API by submitting issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Project Details

### Description

The Expense Tracker API stands as a sophisticated solution for managing expenses and facilitating seamless financial transactions.

### Scripts

- **Pretest:** Execute ESLint to ensure adherence to coding style standards.
- **Test (E2E and Unit):** Run comprehensive end-to-end and unit tests using Jest.
- **Lint:** Identify and fix code style issues using ESLint.
- **Start:** Launch the application.

### Dependencies

- **Express.js:** A robust web application framework for Node.js.
- **Node.js:** A versatile JavaScript runtime.
- **MongoDB:** A dynamic NoSQL database for data storage.
- **Mongoose:** A feature-rich MongoDB object modeling tool designed for Node.js.
- **Docker:** A powerful platform for developing, shipping, and running applications in containers.

### Dev Dependencies

- **Jest:** A versatile JavaScript testing framework.
- **ESLint:** A powerful linter tool for identifying and fixing problems in JavaScript code.

Feel free to explore and enhance this API! If you have any questions or suggestions, please don't hesitate to reach out. Happy coding!