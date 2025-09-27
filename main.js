const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');
const API_BASE_URL = 'http://localhost:3000/api';

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
        <div class="auth-container">
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
    appContent.innerHTML = `<div class="home-css"> <h1>Welcome to the Home Page!</h1> </div>`; // Placeholder, we will build this out fully next
};

const router = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        renderLoginScreen();
    } else {
        renderHomeScreen();
    }
};

router();
