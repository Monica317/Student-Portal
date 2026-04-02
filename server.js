const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = 'users.json';

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Helper - read users
function getUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

// Helper - save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// REGISTER
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields required." });
  }

  const users = getUsers();
  const exists = users.find(u => u.email === email);

  if (exists) {
    return res.json({ success: false, message: "Email already registered." });
  }

  users.push({ name, email, password });
  saveUsers(users);

  res.json({ success: true, message: "Registered successfully!" });
});

// LOGIN
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, user: { name: user.name, email: user.email } });
  } else {
    res.json({ success: false, message: "Invalid email or password." });
  }
});

// UPDATE PROFILE
app.post('/api/update-profile', (req, res) => {
  const { oldEmail, name, email, password } = req.body;
  const users = getUsers();
  const index = users.findIndex(u => u.email === oldEmail);

  if (index === -1) {
    return res.json({ success: false, message: "User not found." });
  }

  users[index].name = name;
  users[index].email = email;
  if (password && password.length >= 6) {
    users[index].password = password;
  }

  saveUsers(users);
  res.json({ success: true, user: { name, email } });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});