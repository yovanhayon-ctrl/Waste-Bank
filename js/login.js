// JavaScript specific to the login page
// Includes navbar and footer related functionality as requested

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const adminLoginFormElement = document.getElementById(
    "adminLoginFormElement"
  );
  const adminLoginLink = document.getElementById("adminLoginLink");
  const userLoginLink = document.getElementById("userLoginLink");

  // Check authentication status (navbar related code as requested)
  checkAuthStatus();

  // Show admin login form
  adminLoginLink.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".form-container").style.display = "none";
    document.getElementById("adminLoginForm").style.display = "block";
  });

  // Show user login form
  userLoginLink.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("adminLoginForm").style.display = "none";
    document.querySelector(".form-container").style.display = "block";
  });

  // Handle user login
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (login(username, password, false)) {
      alert("Login berhasil!");
    } else {
      alert("Username atau password salah!");
    }
  });

  // Handle admin login
  adminLoginFormElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    if (login(username, password, true)) {
      alert("Login admin berhasil!");
    } else {
      alert("Username atau password admin salah!");
    }
  });
});