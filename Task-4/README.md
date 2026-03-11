# TaskFour - Users REST API (Node.js + Express)

This is a beginner-friendly REST API that supports CRUD operations for a **User**.

User fields:
- `name`
- `email`
- `age`

The app stores users in a **temporary in-memory array** (no database). When you stop the server, the data resets.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

Server runs on `http://localhost:3000` by default.

## Endpoints

### GET /users
Returns all users.

### POST /users
Creates a new user.

Example body:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "age": 28
}
```

### PUT /users/:id
Updates a user by id (supports partial updates).

Example:

```json
{
  "age": 29
}
```

### DELETE /users/:id
Deletes a user by id.

