// Check if user is logged in
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (!loggedInUser) {
  // Not logged in, redirect to login
  window.location.href = 'index.html';
}

// Display user info
document.getElementById('studentName').textContent = loggedInUser.name;
document.getElementById('navName').textContent = loggedInUser.name;
document.getElementById('studentEmail').textContent = loggedInUser.email;

// Logout function
function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}