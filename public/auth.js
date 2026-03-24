function handleLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  if (!email || !password) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));
      window.location.href = 'dashboard.html';
    } else {
      errorMsg.textContent = data.message;
    }
  });
}

function handleRegister() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  const successMsg = document.getElementById('successMsg');

  errorMsg.textContent = '';
  successMsg.textContent = '';

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

  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      successMsg.textContent = "Account created! Redirecting...";
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      errorMsg.textContent = data.message;
    }
  });
}