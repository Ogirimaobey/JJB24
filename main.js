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
    bottomNav.innerHTML = `
        <a href="#home" class="nav-link active"><i class="fas fa-home"></i><span>Home</span></a>
        <a href="#task" class="nav-link"><i class="fas fa-tasks"></i><span>Task</span></a>
        <a href="#promotion" class="nav-link"><i class="fas fa-gift"></i><span>Promotion</span></a>
        <a href="#me" class="nav-link"><i class="fas fa-user"></i><span>Me</span></a>
    `;
    bottomNav.style.display = 'flex';
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Dashboard...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) { throw new Error('Failed to load data.'); }
        const data = await response.json();
        let productHTML = '';
        data.plans.forEach(plan => {
            productHTML += `
                <div class="product-card">
                    <div class="product-info">
                        <h4>${plan.name}</h4>
                        <p>Price: ₦${plan.price.toLocaleString()}</p>
                        <p>Daily Income: ₦${plan.daily_income.toLocaleString()}</p>
                    </div>
                    <button class="btn-invest" data-plan-id="${plan.id}">Invest</button>
                </div>
            `;
        });
        const homeHTML = `
            <div class="home-header">
                <div class="balance-card">
                    <small>Total Assets (NGN)</small>
                    <h2>₦ 0.00</h2>
                    <div class="header-buttons">
                        <button class="btn-deposit">Deposit</button>
                        <button class="btn-withdraw">Withdraw</button>
                    </div>
                </div>
            </div>
            <div class="home-content">
                <div class="invite-card">
                    <h4>Invite friends</h4>
                    <p>Share your code and earn rewards!</p>
                    <div class="invite-action">
                        <span>${data.user.own_referral_code}</span>
                        <button>Share</button>
                    </div>
                </div>
                <h3>Investment Products</h3>
                <div class="product-list">
                    ${productHTML}
                </div>
            </div>
        `;
        appContent.innerHTML = homeHTML;
    } catch (error) {
        console.error('Failed to render home page:', error);
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load home screen.</p>';
    }
};

const router = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        renderLoginScreen();
    } else {
        const hash = window.location.hash || '#home';
        // Simple routing logic will go here in the future
        renderHomeScreen(); 
    }
};

// Start the app
router();
