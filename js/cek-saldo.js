// JavaScript specific to the cek-saldo page
// Includes navbar and footer related functionality as requested

document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");

  // Check authentication status and update navbar (navbar related code as requested)
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    // User is logged in
    loginBtn.textContent = "Profil";
    loginBtn.href = "profil.html";
  }

  // Check authentication status for balance content
  const balanceContent = document.getElementById("balanceContent");
  const loginPrompt = document.getElementById("loginPrompt");
  const balanceAmount = document.getElementById("balanceAmount");
  const customerName = document.getElementById("customerName");
  const transactionsTableBody = document.getElementById(
    "transactionsTableBody"
  );

  if (user) {
    // User is logged in
    // Display balance
    balanceAmount.textContent = formatCurrency(user.balance);
    customerName.textContent = `Halo, ${user.name}`;

    // Load transactions for this user
    loadUserTransactions(user.id);
  } else {
    // User is not logged in
    balanceContent.style.display = "none";
    loginPrompt.classList.add("show");
  }

  function loadUserTransactions(userId) {
    const transactions = getTransactions();
    const userTransactions = transactions.filter(
      (t) => t.customerId === userId
    );

    if (userTransactions.length === 0) {
      transactionsTableBody.innerHTML =
        '<tr><td colspan="5">Tidak ada riwayat transaksi</td></tr>';
      return;
    }

    transactionsTableBody.innerHTML = "";

    // Sort transactions by date (newest first)
    userTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    userTransactions.forEach((transaction) => {
      const row = document.createElement("tr");

      // Format date
      const formattedDate = formatDate(transaction.date);

      // Format nominal
      const formattedNominal = formatCurrency(transaction.amount);

      // Determine transaction type text
      const typeText =
        transaction.type === "deposit" ? "Setor Sampah" : "Penarikan";

      row.innerHTML = `
                  <td>${formattedDate}</td>
                  <td>${typeText}</td>
                  <td>${transaction.wasteName || "-"}</td>
                  <td>${
                    transaction.weight ? transaction.weight + " kg" : "-"
                  }</td>
                  <td>${formattedNominal}</td>
              `;

      transactionsTableBody.appendChild(row);
    });
  }
});