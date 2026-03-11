const API_URL = "/api/users";

// Get references to important DOM elements
const userForm = document.getElementById("user-form");
const userIdInput = document.getElementById("user-id");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const submitBtn = document.getElementById("submit-btn");
const cancelEditBtn = document.getElementById("cancel-edit");
const formTitle = document.getElementById("form-title");
const usersTableBody = document.getElementById("users-table-body");
const noUsersMessage = document.getElementById("no-users-message");

// This variable helps us know if we are currently editing a user
let isEditing = false;

// Load all users when the page first loads
document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
});

// Handle form submission for both "Add" and "Update"
userForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Stop the page from reloading

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const age = ageInput.value.trim();

  if (!name || !email || !age) {
    alert("Please fill in all fields.");
    return;
  }

  const userData = { name, email, age: Number(age) };

  try {
    if (!isEditing) {
      await createUser(userData);
    } else {
      const id = userIdInput.value;
      await updateUser(id, userData);
    }
    await loadUsers();
    resetForm();
  } catch (error) {
    console.error("Error saving user:", error);
    alert("There was an error saving the user. Please try again.");
  }
});


cancelEditBtn.addEventListener("click", () => {
  resetForm();
});

// Fetch all users from the backend and display them in the table
async function loadUsers() {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    // Clear the table body first
    usersTableBody.innerHTML = "";

    if (!users || users.length === 0) {
      noUsersMessage.classList.remove("d-none");
      return;
    }

    noUsersMessage.classList.add("d-none");

    // Add each user as a row in the table
    users.forEach((user, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="startEditUser('${user._id}')">
            Edit
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteUser('${user._id}')">
            Delete
          </button>
        </td>
      `;

      usersTableBody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error loading users:", error);
    alert("There was an error loading the users. Please make sure the server is running.");
  }
}

// Send a POST request to create a new user
async function createUser(userData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }
}

// Start editing a user: fill the form with existing data
async function startEditUser(id) {
  try {
    // First, get all users to find the one we want to edit
    const response = await fetch(API_URL);
    const users = await response.json();
    const user = users.find((u) => u._id === id);

    if (!user) {
      alert("User not found.");
      return;
    }

    // Fill the form with the user's current data
    userIdInput.value = user._id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    ageInput.value = user.age;

    // Switch to "edit" mode in the UI
    isEditing = true;
    formTitle.textContent = "Edit User";
    submitBtn.textContent = "Update User";
  } catch (error) {
    console.error("Error starting edit:", error);
    alert("There was an error trying to edit this user.");
  }
}

// Send a PUT request to update an existing user
async function updateUser(id, userData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }
}

// Send a DELETE request to remove a user
async function deleteUser(id) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    // Reload the users after successful deletion
    await loadUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("There was an error deleting the user.");
  }
}

// Reset the form back to "Add New User" mode
function resetForm() {
  userForm.reset();
  userIdInput.value = "";
  isEditing = false;
  formTitle.textContent = "Add New User";
  submitBtn.textContent = "Add User";
}

