// Check if logged in
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) window.location.href = 'index.html';

// Display current info
document.getElementById('profileName').textContent = loggedInUser.name;
document.getElementById('profileEmail').textContent = loggedInUser.email;
document.getElementById('avatarInitial').textContent = loggedInUser.name.charAt(0).toUpperCase();
document.getElementById('editName').value = loggedInUser.name;
document.getElementById('editEmail').value = loggedInUser.email;

function saveProfile() {
  const newName = document.getElementById('editName').value.trim();
  const newEmail = document.getElementById('editEmail').value.trim().toLowerCase();
  const newPassword = document.getElementById('editPassword').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  const successMsg = document.getElementById('successMsg');

  errorMsg.textContent = '';
  successMsg.textContent = '';

  if (!newName || !newEmail) {
    errorMsg.textContent = "Name and email cannot be empty.";
    return;
  }

  // Update in users array
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const index = users.findIndex(u => u.email === loggedInUser.email);

  if (index !== -1) {
    users[index].name = newName;
    users[index].email = newEmail;
    if (newPassword.length >= 6) {
      users[index].password = newPassword;
    }
    localStorage.setItem('users', JSON.stringify(users));

    // Update logged in session
    const updatedUser = { ...users[index] };
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    // Refresh display
    document.getElementById('profileName').textContent = newName;
    document.getElementById('profileEmail').textContent = newEmail;
    document.getElementById('avatarInitial').textContent = newName.charAt(0).toUpperCase();

    successMsg.textContent = "Profile updated! Redirecting...";
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  }
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}