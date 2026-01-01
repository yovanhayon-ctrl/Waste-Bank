// JavaScript specific to the faq page
// Includes navbar and footer related functionality as requested

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  // Check authentication status (navbar related code as requested)
  checkAuthStatus();

  // Add click event to FAQ items
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      item.classList.toggle("active");
    });
  });
});