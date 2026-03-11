// server.js
const express = require("express");

const app = express();

// Middleware: automatically parse JSON request bodies
app.use(express.json());


let users = [];
let nextId = 1; 

// Helper find a user by id
function findUserById(id) {
  return users.find((u) => u.id === id);
}

//basic email check
function isValidEmail(email) {
  return typeof email === "string" && /^\S+@\S+\.\S+$/.test(email);
}

// Routes

// GET /users
app.get("/users", (req, res) => {
  return res.status(200).json({
    count: users.length,
    users: users
  });
});

// POST /users
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  // Basic validation
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Name is required (string)." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Email is required (valid email)." });
  }

  const ageNumber = Number(age);
  if (!Number.isFinite(ageNumber) || ageNumber < 0) {
    return res.status(400).json({ message: "Age is required (number >= 0)." });
  }

  const newUser = {
    id: String(nextId++), 
    name: name.trim(),
    email: email.trim(),
    age: ageNumber
  };

  users.push(newUser);

  return res.status(201).json({
    message: "User created successfully.",
    user: newUser
  });
});

// PUT /users/:id
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const { name, email, age } = req.body;

  // Validate only the fields that are provided
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "If provided, name must be a non-empty string." });
    }
    user.name = name.trim();
  }

  if (email !== undefined) {
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "If provided, email must be valid." });
    }
    user.email = email.trim();
  }

  if (age !== undefined) {
    const ageNumber = Number(age);
    if (!Number.isFinite(ageNumber) || ageNumber < 0) {
      return res.status(400).json({ message: "If provided, age must be a number >= 0." });
    }
    user.age = ageNumber;
  }
  return res.status(200).json({
    message: "User updated successfully.",
    user: user
  });
});

// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = findUserById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  users = users.filter((u) => u.id !== id);
  return res.status(204).send();
});


app.use((req, res) => {
  return res.status(404).json({ message: "Route not found." });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const isJsonSyntaxError =
    err instanceof SyntaxError && err.status === 400 && "body" in err;
  if (isJsonSyntaxError) {
    return res.status(400).json({ message: "Invalid JSON body." });
  }
  console.error(err);
  return res.status(500).json({ message: "Internal server error." });
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

