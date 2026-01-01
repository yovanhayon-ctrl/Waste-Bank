// JavaScript specific to the daftar page
// Includes navbar and footer related functionality as requested

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  // Check authentication status (navbar related code as requested)
  checkAuthStatus();

  // Handle registration
  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email tidak valid!");
      return;
    }

    // Check if username already exists
    const customers = getCustomers();
    const existingCustomer = customers.find(
      (c) => c.username === username
    );
    if (existingCustomer) {
      alert("Username sudah digunakan!");
      return;
    }

    // Create new customer
    const newCustomer = {
      id:
        customers.length > 0
          ? Math.max(...customers.map((c) => c.id)) + 1
          : 1,
      name: name,
      email: email,
      phone: phone,
      address: address,
      username: username,
      password: password,
      balance: 0,
    };

    customers.push(newCustomer);
    localStorage.setItem("customers", JSON.stringify(customers));

    alert("Pendaftaran berhasil! Silakan login untuk melanjutkan.");
    window.location.href = "login.html";
  });
});