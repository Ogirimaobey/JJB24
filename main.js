const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');
const API_BASE_URL = 'http://localhost:3000/api';

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
        <div class="auth-container">
            <div class="auth-logo">JJB24</div>
            <h2>Welcome Back</h2>
            <p>Please log in to your account.</p>
            <form id="loginForm">
                <div class="form-group"><label>Phone Number</label><input type="tel" id="phone" required /></div>
                <div class="form-group"><label>Password</label><input type="password" id="password" required /></div>
                <button type="submit" class="btn-auth">Login</button>
            </form>
            <p class="auth-link">Don't have an account? <a id="showRegister">Register here</a></p>
        </div>
    `;
    document.getElementById('showRegister').addEventListener('click', renderRegisterScreen);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
};

const renderRegisterScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
        <div class="auth-container">
            <div class="auth-logo">JJB24</div>
            <h2>Create Account</h2>
            <p>Start your journey with us today.</p>
            <form id="registerForm">
                <div class="form-group"><label>Full Name</label><input type="text" id="fullName" required /></div>
                <div class="form-group"><label>Phone Number</label><input type="tel" id="phone" required /></div>
                <div class="form-group"><label>Password</label><input type="password" id="password" required /></div>
                <button type="submit" class="btn-auth">Register</button>
            </form>
            <p class="auth-link">Already have an account? <a id="showLogin">Login here</a></p>
        </div>
    `;
    document.getElementById('showLogin').addEventListener('click', renderLoginScreen);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

const handleLogin = async (event) => {
    event.preventDefault();
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, password })
        });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        localStorage.setItem('token', result.token);
        router();
    } catch (error) { alert('Could not connect to server.'); }
};

const handleRegister = async (event) => {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, phone, password, referralCode: '' })
        });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        alert('Registration successful! Please log in.');
        renderLoginScreen();
    } catch (error) { alert('Could not connect to server.'); }
};

const renderHomeScreen = async () => {
    // This is a placeholder for the real home screen. We will build this next.
    appContent.innerHTML = `<h1>Home Screen</h1>`;
};

const renderProductsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Products...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) { throw new Error('Failed to load data.'); }
        const data = await response.json();
        let productHTML = '';
        data.plans.forEach(plan => {
            productHTML += `
                <div class="product-card-wc">
                    <div class="product-image-wc"><img src="${plan.image}" alt="${plan.name}"></div>
                    <div class="product-info-wc">
                        <h4>${plan.name}</h4>
                        <p>Price: ₦${plan.price.toLocaleString()}</p>
                        <p>Daily Income: ₦${plan.daily_income.toLocaleString()}</p>
                        <button class="btn-invest" data-plan-id="${plan.id}">Invest</button>
                    </div>
                </div>
            `;
        });
        const pageHTML = `<div class="page-container"><div class="page-header"><h2>Investment Products</h2></div><div class="product-grid-wc">${productHTML}</div></div>`;
        appContent.innerHTML = pageHTML;
    } catch (error) {
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load products.</p>';
    }
};

const renderPromotionsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Promotions...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/promotions`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) { throw new Error('Failed to load data.'); }
        const vipPlans = await response.json();
        let vipHTML = '';
        vipPlans.forEach(plan => {
            vipHTML += `<div class="product-card-wc">... similar card structure for VIPs ...</div>`;
        });
        const pageHTML = `<div class="page-container"><div class="page-header"><h2>VIP Promotions</h2></div><div class="product-grid-wc">${vipHTML}</div></div>`;
        appContent.innerHTML = pageHTML;
    } catch (error) {
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load promotions.</p>';
    }
}

const router = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        renderLoginScreen();
        return;
    }
    bottomNav.style.display = 'flex';
    const hash = window.location.hash || '#home';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) { link.classList.add('active'); }
    });
    switch (hash) {
        case '#products': renderProductsPage(); break;
        case '#promotion': renderPromotionsPage(); break;
        case '#me': appContent.innerHTML = `<h1>Me Page</h1>`; break;
        case '#home': default: renderHomeScreen();
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
