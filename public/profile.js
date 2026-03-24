const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) window.location.href = 'index.html';

document.getElementById('profileName').textContent = loggedInUser.name;
document.getElementById('profileEmail').textContent = loggedInUser.email;
document.getElementById('avatarInitial').textContent = loggedInUser.name.charAt(0).toUpperCase();
document.getElementById('editName').value = loggedInUser.name;
document.getElementById('editEmail').value = loggedInUser.email;

function saveProfile() {
  const newName = document.getElementById('editName').value.trim();
  const newEmail = document.getElementById('editEmail').value.trim();
  const newPassword = document.getElementById('editPassword').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  const successMsg = document.getElementById('successMsg');

  errorMsg.textContent = '';
  successMsg.textContent = '';

  if (!newName || !newEmail) {
    errorMsg.textContent = "Name and email cannot be empty.";
    return;
  }

  fetch('/api/update-profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      oldEmail: loggedInUser.email,
      name: newName,
      email: newEmail,
      password: newPassword
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));
      successMsg.textContent = "Profile updated! Redirecting...";
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      errorMsg.textContent = data.message;
    }
  });
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}