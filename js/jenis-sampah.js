// JavaScript specific to the jenis-sampah page
// Includes navbar and footer related functionality as requested

document.addEventListener("DOMContentLoaded", function () {
  // Check authentication status (navbar related code as requested)
  checkAuthStatus();

  // Populate waste types table
  populateWasteTypesTable();
});

function populateWasteTypesTable() {
  const wasteTypes = getWasteTypes();
  const tableBody = document.getElementById("wasteTableBody");

  if (wasteTypes.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="4">Tidak ada data jenis sampah</td></tr>';
    return;
  }

  tableBody.innerHTML = "";

  wasteTypes.forEach((waste, index) => {
    const row = document.createElement("tr");

    // Format price with currency
    const formattedPrice = formatCurrency(waste.price);

    // Status badge
    const statusClass =
      waste.status === "active" ? "status-active" : "status-inactive";
    const statusText =
      waste.status === "active" ? "Aktif" : "Tidak Aktif";

    row.innerHTML = `
              <td>${index + 1}</td>
              <td>${waste.name}</td>
              <td>${formattedPrice}</td>
              <td><span class="${statusClass}">${statusText}</span></td>
          `;

    tableBody.appendChild(row);
  });
}