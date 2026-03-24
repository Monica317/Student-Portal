function handleLogin() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.textContent = "";

  if (!email || !password) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "Invalid email or password.";
  }
}

function handleRegister() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const successMsg = document.getElementById("successMsg");

  errorMsg.textContent = "";
  successMsg.textContent = "";

  if (!name || !email || !password || !confirmPassword) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  if (password.length < 6) {
    errorMsg.textContent = "Password must be at least 6 characters.";
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.some(u => u.email === email);

  if (exists) {
    errorMsg.textContent = "An account with this email already exists.";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  successMsg.textContent = "Account created successfully!";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}