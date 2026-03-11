## Simple Full Stack User Management System

This is a beginner-friendly **full stack user management system** built with:

- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express, MongoDB (Mongoose)

It lets you **add**, **view**, **update**, and **delete** users.

---

### 1. Project structure

- **package.json** – Node.js project file with dependencies and start script  
- **backend/**
  - `server.js` – main Express server file
  - `config/db.js` – MongoDB connection setup
  - `models/User.js` – Mongoose user schema/model
  - `routes/userRoutes.js` – REST API routes for CRUD
- **frontend/**
  - `index.html` – main page with form and table
  - `styles.css` – simple custom styles
  - `script.js` – Fetch API calls and UI logic

---

### 2. Prerequisites

Make sure you have:

- **Node.js** and **npm** installed  
- **MongoDB** running locally
  - Default connection: `mongodb://127.0.0.1:27017/user_management_db`

You can change the database URL in `backend/config/db.js` if needed.

---

### 3. Install dependencies

Open a terminal in the project folder:

```bash
cd "c:\Users\LOQ\Desktop\tasksix a"
npm install
```

This will install the dependencies listed in `package.json` (Express, Mongoose, etc.).

---

### 4. Run the backend server

In the same folder, run:

```bash
npm start
```

If everything works, you should see a message similar to:

```text
Connected to MongoDB successfully
Server is running on http://localhost:3000
```

---

### 5. Use the app (frontend)

After `npm start`, open your browser and go to:

```text
http://localhost:3000
```

You will see:

- A **form** to add or edit a user (name, email, age)  
- A **table** showing all users from the database with **Edit** and **Delete** buttons

The frontend uses the **Fetch API** to call the backend REST API:

- `GET /api/users` – get all users  
- `POST /api/users` – add a new user  
- `PUT /api/users/:id` – update a user  
- `DELETE /api/users/:id` – delete a user

---

### 6. Notes for learning

- Code is written in a **simple, student-friendly style** with comments explaining the main parts.  
- You can open each file to see:
  - How Express routes are created
  - How Mongoose models work
  - How the Fetch API sends JSON to the backend
  - How the DOM is updated after each operation

Feel free to modify the fields (for example, add `address`, `phone`, etc.) and extend this as your own mini project.

