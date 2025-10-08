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
        const response = await fetch(`${API_BASE_URL}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, password }) });
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
        const response = await fetch(`${API_BASE_URL}/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullName, phone, password, referralCode: '' }) });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        alert('Registration successful! Please log in.');
        renderLoginScreen();
    } catch (error) { alert('Could not connect to server.'); }
};

const renderHomeScreen = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Dashboard...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) throw new Error('Failed to load data.');
        const data = await response.json();
        let activityHTML = '';
        if (data.investments.length === 0) {
            activityHTML = '<p>No recent activity.</p>';
        } else {
            data.investments.slice(0, 3).forEach(inv => {
                const startDate = new Date(inv.start_date).toLocaleDateString();
                activityHTML += `<div class="activity-item"><i class="fas fa-chart-line"></i><div class="activity-details"><p>Investment in ${inv.plan_name}</p><small>${startDate}</small></div></div>`;
            });
        }
        const homeHTML = `
            <div class="top-header"><div class="user-greeting"><h4>Hello, ${data.user.full_name.split(' ')[0]}</h4><p>Welcome back!</p></div><div class="profile-icon"><i class="fas fa-user"></i></div></div>
            <div class="balance-card"><small>Total Assets (NGN)</small><h2>₦ 0.00</h2><div class="header-buttons"><button class="btn-deposit">Deposit</button><button class="btn-withdraw">Withdraw</button></div></div>
            <div class="home-content">
                <div class="quick-actions">
                    <a href="#team" class="action-button"><i class="fas fa-users"></i><span>My Team</span></a>
                    <a href="#history" class="action-button"><i class="fas fa-history"></i><span>History</span></a>
                    <a href="#support" class="action-button"><i class="fas fa-headset"></i><span>Support</span></a>
                    <a href="#rewards" class="action-button"><i class="fas fa-gift"></i><span>Rewards</span></a>
                </div>
                <div class="activity-card"><h3>Recent Activity</h3><div class="activity-list">${activityHTML}</div></div>
            </div>`;
        appContent.innerHTML = homeHTML;
    } catch (error) {
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load home screen. Please ensure your server is running.</p>';
    }
};

const renderProductsPage = async () => { /* ... full products page code ... */ };
const renderPromotionsPage = async () => { /* ... full promotions page code ... */ };
const renderMePage = async () => { /* ... full me page code ... */ };

const renderTaskPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Tasks...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) throw new Error('Failed to load tasks.');
        const data = await response.json();
        
        const pageHTML = `
            <div class="page-container task-page">
                <div class="page-header"><h2>Daily Tasks</h2></div>
                <div class="task-progress-card">
                    <h4>Tasks for Today</h4>
                    <p id="task-counter">${data.tasksCompleted} / ${data.tasksRequired}</p>
                    <div class="progress-bar-container"><div id="progress-bar-fill" style="width: ${(data.tasksCompleted / (data.tasksRequired || 1)) * 100}%;"></div></div>
                </div>
                <div class="task-action-card">
                    <button id="completeTaskBtn" ${data.tasksCompleted >= data.tasksRequired ? 'disabled' : ''}>
                        ${data.tasksCompleted >= data.tasksRequired ? 'All Tasks Completed' : 'Complete a Task'}
                    </button>
                </div>
                <div class="earnings-summary-grid">
                    <div class="summary-card"><h4>Today's Earning</h4><p>₦ 0.00</p></div>
                    <div class="summary-card"><h4>Yesterday's Earning</h4><p>₦ 0.00</p></div>
                    <div class="summary-card"><h4>Total Earnings</h4><p>₦ 0.00</p></div>
                </div>
            </div>
        `;
        appContent.innerHTML = pageHTML;

        document.getElementById('completeTaskBtn').addEventListener('click', async () => {
            const btn = document.getElementById('completeTaskBtn');
            btn.textContent = 'Processing...';
            btn.disabled = true;
            try {
                const completeResponse = await fetch(`${API_BASE_URL}/tasks/complete`, { method: 'POST', headers: { 'Authorization': 'Bearer ' + token } });
                const result = await completeResponse.json();
                if (!completeResponse.ok) {
                    alert('Error: ' + result.message);
                    renderTaskPage(); 
                    return;
                }
                document.getElementById('task-counter').textContent = `${result.tasksCompleted} / ${result.tasksRequired}`;
                document.getElementById('progress-bar-fill').style.width = `${(result.tasksCompleted / (result.tasksRequired || 1)) * 100}%`;
                if (result.tasksCompleted >= result.tasksRequired) {
                    btn.textContent = 'All Tasks Completed';
                } else {
                    btn.textContent = 'Complete a Task';
                    btn.disabled = false;
                }
            } catch (error) {
                alert('An error occurred while completing the task.');
                renderTaskPage();
            }
        });
    } catch (error) { appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load tasks.</p>'; }
};


const router = () => {
    const token = localStorage.getItem('token');
    if (!token) { renderLoginScreen(); return; }
    bottomNav.style.display = 'flex';
    const hash = window.location.hash || '#home';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) { link.classList.add('active'); }
    });
    switch (hash) {
        case '#products': renderProductsPage(); break;
        case '#promotion': renderPromotionsPage(); break;
        case '#me': renderMePage(); break;
        case '#task': renderTaskPage(); break;
        case '#home': default: renderHomeScreen();
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
