// Main JavaScript file for Bank Sampah website

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Add animation to hamburger icon
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.toggle('active');
            });
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');

                // Remove animation from hamburger icon
                const bars = mobileMenu.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.classList.remove('active');
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || mobileMenu.contains(event.target);

        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');

            // Remove animation from hamburger icon
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.remove('active');
            });
        }
    });

    // Check authentication status
    checkAuthStatus();
});

// Authentication functions
function checkAuthStatus() {
    // Check if user is logged in as admin
    const isAdmin = localStorage.getItem('isAdminLoggedIn');
    if (isAdmin === 'true') {
        // Redirect to admin dashboard if on public page
        if (window.location.pathname.includes('index.html') ||
            window.location.pathname.includes('tentang.html') ||
            window.location.pathname.includes('jenis-sampah.html') ||
            window.location.pathname.includes('cara-menabung.html') ||
            window.location.pathname.includes('cek-saldo.html') ||
            window.location.pathname.includes('kontak.html') ||
            window.location.pathname.includes('daftar.html') ||
            window.location.pathname.includes('login.html')) {
            window.location.href = 'admin/dashboard.html';
        }
    }

    // Check if user is logged in as customer
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        // Update navigation for logged in user only on cek-saldo.html
        const loginBtn = document.querySelector('.btn-login');
        if (loginBtn && window.location.pathname.includes('cek-saldo.html')) {
            loginBtn.textContent = 'Profil';
            loginBtn.href = 'profil.html';
        }
    }
}

// Authentication functions
function login(username, password, isAdmin = false) {
    if (isAdmin) {
        // Check admin credentials
        const admin = JSON.parse(localStorage.getItem('admin')) || {username: 'admin', password: 'admin123'};
        if (username === admin.username && password === admin.password) {
            localStorage.setItem('isAdminLoggedIn', 'true');
            window.location.href = 'admin/dashboard.html';
            return true;
        }
    } else {
        // Check customer credentials
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        const customer = customers.find(c => c.username === username && c.password === password);
        if (customer) {
            localStorage.setItem('currentUser', JSON.stringify(customer));
            window.location.href = 'cek-saldo.html';
            return true;
        }
    }
    return false;
}

function logout() {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('currentUser');
    // Redirect to index.html in the parent directory
    const currentPath = window.location.pathname;
    if (currentPath.includes('/admin/')) {
        window.location.href = '../index.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Data management functions
function initializeData() {
    // Initialize default admin if not exists
    if (!localStorage.getItem('admin')) {
        localStorage.setItem('admin', JSON.stringify({username: 'admin', password: 'admin123'}));
    }

    // Initialize default waste types if not exists
    if (!localStorage.getItem('wasteTypes')) {
        localStorage.setItem('wasteTypes', JSON.stringify([
            {id: 1, name: 'Plastik Botol', price: 2000, unit: 'kg', status: 'active'},
            {id: 2, name: 'Kertas Bekas', price: 1000, unit: 'kg', status: 'active'},
            {id: 3, name: 'Kaleng', price: 3000, unit: 'kg', status: 'active'},
            {id: 4, name: 'Kardus', price: 1500, unit: 'kg', status: 'active'}
        ]));
    }

    // Initialize default customers if not exists
    if (!localStorage.getItem('customers')) {
        localStorage.setItem('customers', JSON.stringify([
            {id: 1, name: 'John Doe', email: 'john@example.com', phone: '081234567890', address: 'Jl. Contoh No. 123', username: 'johndoe', password: 'password123', balance: 50000}
        ]));
    }

    // Initialize transactions if not exists
    if (!localStorage.getItem('transactions')) {
        localStorage.setItem('transactions', JSON.stringify([]));
    }
}

// Get data from localStorage
function getWasteTypes() {
    return JSON.parse(localStorage.getItem('wasteTypes')) || [];
}

function getCustomers() {
    return JSON.parse(localStorage.getItem('customers')) || [];
}

function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}

// Add transaction
function addTransaction(transaction) {
    const transactions = getTransactions();
    transaction.id = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;
    transaction.date = new Date().toISOString();
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    return transaction;
}

// Update customer balance
function updateCustomerBalance(customerId, amount, type) {
    const customers = getCustomers();
    const customerIndex = customers.findIndex(c => c.id === customerId);
    if (customerIndex !== -1) {
        if (type === 'deposit') {
            customers[customerIndex].balance += amount;
        } else if (type === 'withdrawal') {
            customers[customerIndex].balance -= amount;
        }
        localStorage.setItem('customers', JSON.stringify(customers));
    }
}

// Get customer by ID
function getCustomerById(id) {
    const customers = getCustomers();
    return customers.find(c => c.id === id);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Format date for display in YYYY-MM-DD format
function formatDateISO(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get system settings
function getSystemSettings() {
    return JSON.parse(localStorage.getItem('systemSettings')) || {};
}

// Handle contact form submission
function handleContactForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // In a real application, you would send this data to a server
        // For now, we'll just show an alert
        alert(`Terima kasih ${name}! Pesan Anda telah kami terima.`);

        // Reset form
        form.reset();
    });
}

// Initialize data on page load
initializeData();