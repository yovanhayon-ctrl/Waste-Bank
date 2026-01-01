// JavaScript specific to the kontak page
// Includes navbar and footer related functionality as requested

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  // Check authentication status (navbar related code as requested)
  checkAuthStatus();

  // Handle contact form submission
  handleContactForm("contactForm");
});