# Task Five - Node.js REST API + MongoDB (Mongoose)

This is a beginner-friendly REST API made with **Express** and **MongoDB** using **Mongoose**.

## Folder Structure

```
models/
routes/
controllers/
server.js
```

## Setup

1) Install dependencies:

```bash
npm install
```

2) Create a `.env` file (copy from `.env.example`):

- On Windows (PowerShell):

```powershell
copy .env.example .env
```

3) Start the server:

```bash
npm run dev
```

If you don't want nodemon:

```bash
npm start
```

## API Endpoints (Users)

Base URL: `/api/users`

- `POST /api/users` - create user
- `GET /api/users` - get all users
- `GET /api/users/:id` - get user by id
- `PUT /api/users/:id` - update user by id
- `DELETE /api/users/:id` - delete user by id

### Example JSON for Creating a User

```json
{
  "name": "Ali",
  "email": "ali@example.com",
  "age": 20
}
```

