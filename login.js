function loginUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  // Cek login
  if (username === "admin" && password === "12345") {
    window.location.href = "home.php"; // Redirect ke index.html
    return false; // Prevent form submit
  } else {
    errorMessage.textContent = "Username atau password salah!";
    return false; // Prevent form submit
  }
}
