// JavaScript specific to the profil page
// Includes navbar and footer related functionality as requested

document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutBtn");
  const editProfileBtn = document.getElementById("editProfileBtn");
  const changePasswordBtn = document.getElementById("changePasswordBtn");

  // Modals and forms
  const editProfileModal = document.getElementById("editProfileModal");
  const changePasswordModal = document.getElementById(
    "changePasswordModal"
  );
  const editProfileForm = document.getElementById("editProfileForm");
  const changePasswordForm =
    document.getElementById("changePasswordForm");

  // Check authentication status (navbar related code as requested)
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }


  // Display user profile
  displayProfile(user);

  // Logout functionality
  logoutBtn.addEventListener("click", function () {
    logout();
  });

  // Edit profile button
  editProfileBtn.addEventListener("click", function () {
    populateEditForm(user);
    editProfileModal.style.display = "block";
  });

  // Change password button
  changePasswordBtn.addEventListener("click", function () {
    changePasswordModal.style.display = "block";
  });

  // Close modals
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      editProfileModal.style.display = "none";
      changePasswordModal.style.display = "none";
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === editProfileModal) {
      editProfileModal.style.display = "none";
    }
    if (event.target === changePasswordModal) {
      changePasswordModal.style.display = "none";
    }
  });

  // Handle edit profile form submission
  editProfileForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: document.getElementById("editName").value,
      email: document.getElementById("editEmail").value,
      phone: document.getElementById("editPhone").value,
      address: document.getElementById("editAddress").value,
    };

    // Update user in localStorage
    updateCustomer(updatedUser);

    // Update current user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Refresh profile display
    displayProfile(updatedUser);

    editProfileModal.style.display = "none";
    alert("Profil berhasil diperbarui");
  });

  // Handle change password form submission
  changePasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const currentPassword =
      document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    // Verify current password
    if (user.password !== currentPassword) {
      alert("Password saat ini salah");
      return;
    }

    // Verify new passwords match
    if (newPassword !== confirmNewPassword) {
      alert("Password baru tidak cocok");
      return;
    }

    // Update password
    const updatedUser = {
      ...user,
      password: newPassword,
    };

    // Update user in localStorage
    updateCustomer(updatedUser);

    // Update current user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    changePasswordModal.style.display = "none";
    changePasswordForm.reset();
    alert("Password berhasil diubah");
  });
});

function displayProfile(user) {
  document.getElementById("customerName").textContent = user.name;
  document.getElementById("customerUsername").textContent =
    "@" + user.username;
  document.getElementById("customerEmail").textContent = user.email;
  document.getElementById("customerPhone").textContent = user.phone;
  document.getElementById("customerAddress").textContent = user.address;
  document.getElementById("customerBalance").textContent = formatCurrency(
    user.balance
  );
}

function populateEditForm(user) {
  document.getElementById("editName").value = user.name;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editPhone").value = user.phone;
  document.getElementById("editAddress").value = user.address;
}

function updateCustomer(updatedUser) {
  const customers = getCustomers();
  const userIndex = customers.findIndex((c) => c.id === updatedUser.id);

  if (userIndex !== -1) {
    customers[userIndex] = updatedUser;
    localStorage.setItem("customers", JSON.stringify(customers));
  }
}