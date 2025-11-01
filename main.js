const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');
const API_BASE_URL = 'https://jjb24-backend.onrender.com/api';

// --- MODAL HELPER ELEMENTS & FUNCTIONS ---
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalMessage = document.getElementById('modalMessage');

const showSuccessModal = (message) => {
    modalMessage.textContent = message;
    successModal.style.display = 'flex';
};

const closeModal = () => {
    successModal.style.display = 'none';
    if (window.location.hash !== '#home') {
        window.location.hash = '#home';
    } else {
        router();
    }
};



// --- ACTION HANDLERS (for form submissions, button clicks, etc.) ---
const handleLogin = async (event) => {
    event.preventDefault();
    const loginIdentifier = document.getElementById('loginIdentifier').value.trim();
    const password = document.getElementById('password').value;
    
    if (!loginIdentifier || !password) {
        return alert('Please provide email or phone and password.');
    }
    
    // Detect if it's an email or phone number
    const isEmail = loginIdentifier.includes('@');
    const loginData = { password };
    
    if (isEmail) {
        loginData.email = loginIdentifier;
    } else {
        loginData.phone = loginIdentifier;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(loginData) 
        });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        localStorage.setItem('token', result.token);
        console.log('Login successful, token stored:' , result.token);
        router();
    } catch (error) { 
        alert('Could not connect to server.'); 
    }
};

const handleRegister = async (event) => {
    event.preventDefault();

    const fullName = (document.getElementById('fullName') || {}).value?.trim() || '';
    const email = (document.getElementById('email') || {}).value?.trim() || '';
    const phone = (document.getElementById('phone') || {}).value?.trim() || '';
    const password = (document.getElementById('password') || {}).value || '';
    const cpassword = (document.getElementById('cpassword') || {}).value || '';
    const referral = (document.getElementById('referral') || {}).value?.trim() || '';
    if (!fullName || !email || !phone || !password) return alert('Please fill in all required fields.');
    if (password !== cpassword) return alert('Passwords do not match.');

    try {
        const payload = { fullName, phone, email, password };
        if (referral) {
            try {

                const response = await fetch(`${API_BASE_URL}/users/validate-referral`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ referral })
                });
                const result = await response.json();
                if (!response.ok) return alert(`Referral Error: ${result.message}`);
                payload.referral = referral;
                
            } catch (error) {
                return alert('Could not validate referral code.');
            }
        }
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);

        // Backend sends OTP implicitly during registration.
        // Show OTP screen and verify using the email + code.
        alert(`OTP sent to ${email}. Please check your inbox.`);
        renderOTPVerificationScreen(email);
    } catch (error) {
        alert('Could not connect to server.');
    }
};


const handleOTPVerification = async (event, email) => {
    event.preventDefault();
    const otpCode = document.getElementById('otpCode').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp: otpCode })
        });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        
        alert('Phone verified successfully! Please log in.');
        renderLoginScreen();
    } catch (error) {
        alert('Could not verify OTP. Please try again.');
    }
};

const handleResendOTP = async (phone) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        
        alert('New OTP sent to your phone!');
    } catch (error) {
        alert('Could not resend OTP. Please try again.');
    }
};

const handleInvestClick = async (event) => {
    if (event.target.classList.contains('btn-invest')) {
        const planId = event.target.dataset.planId;
        const token = localStorage.getItem('token');
        if (!confirm(`Are you sure you want to invest in this plan?`)) { return; }
        try {
            const response = await fetch(`${API_BASE_URL}/invest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify({ planId })
            });
            const result = await response.json();
            if (response.ok) {
                showSuccessModal(result.message);
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            alert('An investment error occurred.');
        }
    }
};

// --- RENDER FUNCTIONS (Build the HTML for each page) ---
const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
        <div class="auth-container">
            <div class="auth-logo">JJB24</div>
            <h2>Welcome Back</h2>
            <p>Please log in to your account.</p>
            <form id="loginForm">
                <div class="form-group">
                <label>Email or Phone Number</label>
                <input type="text" id="loginIdentifier" required />
                </div>
                <div class="form-group">
                <label>Password</label>
                <input type="password" id="password" required />
                </div>
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
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="fullName" required />
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="email" required />
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" id="phone" required />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="password" required />
                </div>
                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" id="cpassword"  required />
                </div>
                <div class="form-group">
                     <label>Referral Code (Optional)</label>
                     <input type="text" id="referral" />
                 </div>
                <button type="submit" class="btn-auth">Register</button>
            </form>
            <p class="auth-link">Already have an account? <a id="showLogin">Login here</a></p>
        </div>
    `;
    document.getElementById('showLogin').addEventListener('click', renderLoginScreen);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

const renderOTPVerificationScreen = (email) => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
        <div class="auth-container">
            <div class="auth-logo">JJB24</div>
            <h2>Verify Your Phone</h2>
            <p>Enter the 6-digit code sent to ${email}</p>
            
            <form id="otpForm">
                <div class="form-group">
                    <label>OTP Code</label>
                    <input type="text" 
                           id="otpCode" 
                           maxlength="6" 
                           pattern="[0-9]{6}" 
                           placeholder="000000"
                           class="otp-input"
                           required 
                           autocomplete="one-time-code" />
                </div>
                
                <button type="submit" class="btn-auth">Verify</button>
            </form>
            
            <p class="auth-link">
                Didn't receive code? 
                <a id="resendOTP">Resend OTP</a>
            </p>
            
            <p class="auth-link">
                <a id="backToLogin">Back to Login</a>
            </p>
        </div>
    `;
    
    document.getElementById('otpForm').addEventListener('submit', (e) => handleOTPVerification(e, email));
    document.getElementById('resendOTP').addEventListener('click', () => handleResendOTP(email));
    document.getElementById('backToLogin').addEventListener('click', renderLoginScreen);
};


const renderHomeScreen = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Dashboard...</p>';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    console.log('Fetching login data with token:', token);

    if (!token) {
        alert("You are not logged in. Please log in again.");
        renderLoginScreen();
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users/balance`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
        },
        });

        console.log('Response from user Balance backend:', response); 

        if (!response.ok) {
        const err = await response.text();
        console.error('Backend error:', err);
        throw new Error('Failed to load data.');
        }

        const data = await response.json();
        console.log('User Balance data:', data);

        if (!data.success) throw new Error('Invalid Response.');

        const fullName = data.balance.full_name || 'User';
        const balance = data.balance.balance || 0;

        const activityHTML = "<p>No recent activity yet.</p>";

        const homeHTML = `
            <div class="top-header">
                <div class="user-greeting">
                    <h4>Hello, ${fullName.split(' ')[0]}</h4>
                    <p>Welcome back!</p>
                </div>
                <div class="profile-icon">
                    <i class="fas fa-user"></i>
                </div>
            </div>
            <div class="balance-card">
                <small>Total Assets (NGN)</small>
                <h2>₦ ${balance}</h2>
                <div class="header-buttons">
                    <a href="#deposit" class="btn-deposit">Deposit</a>
                    <a href="#withdraw" class="btn-withdraw">Withdraw</a>
                </div>
            </div>

            <div class="home-content">
                <div class="quick-actions">
                    <a href="#team" class="action-button">
                        <i class="fas fa-users"></i>
                        <span>My Team</span>
                    </a>
                    <a href="#history" class="action-button">
                        <i class="fas fa-history"></i>
                        <span>History</span>
                    </a>
                    <a href="#support" class="action-button">
                        <i class="fas fa-headset"></i>
                        <span>Support</span>
                    </a>
                    <a href="#rewards" class="action-button">
                        <i class="fas fa-gift"></i>
                        <span>Rewards</span>
                    </a>
                </div>
                <div class="activity-card">
                    <h3>Recent Activity</h3>
                    <div class="activity-list">${activityHTML}</div>
                </div>
            </div>`;
        appContent.innerHTML = homeHTML;
    } catch (error) {
        console.log('Error loading home screen:', error);
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load home screen. Please ensure your server is running.</p>';
    }
};


const renderProductsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Products...</p>';
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_BASE_URL}/users/allItems`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        console.log('Response from products backend:', response);

        if (!response.ok) throw new Error('Failed to load data.');

        const data = await response.json();
        console.log('Products data from backend:', data);

        let productHTML = '';
        data.items.forEach(item => {
            productHTML += `
                <div class="product-card-wc">
                    <div class="product-image-wc">
                        <img src="${item.itemimage}" alt="${item.itemname}">
                    </div>
                    <div class="product-info-wc">
                        <h4>${item.itemname}</h4>
                        <p>Price: ₦${Number(item.price).toLocaleString()}</p>
                        <p>Daily Income: ₦${Number(item.dailyincome).toLocaleString()}</p>
                        <button class="btn-invest" data-plan-id="${item.id}">Invest</button>
                    </div>
                </div>`;
        });

        const pageHTML = `
            <div class="page-container">
                <div class="page-header"><h2>Investment Products</h2></div>
                <div class="product-grid-wc">${productHTML}</div>
            </div>`;
        appContent.innerHTML = pageHTML;
    } catch (error) {
        console.error('Error loading products:', error);
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load products.</p>';
    }
};


const renderVipPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading VIP Plans...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/promotions`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) throw new Error('Failed to load data.');
        const vipPlans = await response.json();
        let vipHTML = '';
        vipPlans.forEach(plan => {
            vipHTML += `<div class="product-card-wc"><div class="product-info-wc"><h4>${plan.name}</h4><p><strong>Price:</strong> ₦${plan.price.toLocaleString()}</p><p><strong>Total Return:</strong> ₦${plan.total_return.toLocaleString()}</p><p><strong>Duration:</strong> ${plan.duration} days</p><button class="btn-invest" data-plan-id="${plan.id}">Invest</button></div></div>`;
        });
        const pageHTML = `<div class="page-container"><div class="page-header"><h2>VIP Promotions</h2></div><div class="product-grid-wc">${vipHTML}</div></div>`;
        appContent.innerHTML = pageHTML;
    } catch (error) { appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load promotions.</p>'; }
};

const renderMePage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Profile...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) { throw new Error('Failed to load data.'); }
        const data = await response.json();
        const pageHTML = `
            <div class="page-container">
                <div class="profile-header-card">
                    <div class="profile-icon"><i class="fas fa-user"></i></div>
                    <h3>${data.user.full_name}</h3>
                    <p>${data.user.phone_number}</p>
                </div>
                <div class="action-list-card">
                    <a href="#history" class="action-list-item"><i class="fas fa-history"></i><span>Transaction History</span></a>
                    <a href="#settings" class="action-list-item"><i class="fas fa-key"></i><span>Change Password</span></a>
                    <a href="#" id="logoutButton" class="action-list-item"><i class="fas fa-sign-out-alt"></i><span>Logout</span></a>
                </div>
            </div>
        `;
        appContent.innerHTML = pageHTML;
        document.getElementById('logoutButton').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            router();
        });
    } catch (error) { appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load profile.</p>'; }
};

const renderTaskPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Tasks...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) throw new Error('Failed to load tasks.');
        const data = await response.json();
        if (data.message) {
            appContent.innerHTML = `<div class="page-container task-page"><div class="page-header"><h2>Daily Tasks</h2></div><p style="text-align: center;">${data.message}</p></div>`;
            return;
        }
        const pageHTML = `
            <div class="page-container task-page">
                <div class="page-header"><h2>Daily Tasks</h2></div>
                <div class="task-progress-card">
                    <h4>Tasks for Today</h4>
                    <p id="task-counter">${data.tasksCompleted} / ${data.tasksRequired}</p>
                    <div class="progress-bar-container"><div id="progress-bar-fill" style="width: ${((data.tasksCompleted / (data.tasksRequired || 1)) * 100)}%;"></div></div>
                </div>
                <div class="task-action-card">
                    <button id="completeTaskBtn" ${data.tasksCompleted >= data.tasksRequired ? 'disabled' : ''}>
                        ${data.tasksCompleted >= data.tasksRequired ? 'All Tasks Completed' : 'Complete a Task'}
                    </button>
                </div>
            </div>`;
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
                document.getElementById('progress-bar-fill').style.width = `${((result.tasksCompleted / (result.tasksRequired || 1)) * 100)}%`;
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
    } catch (error) { appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load tasks. You may need to invest in a plan first.</p>'; }
};

const renderWithdrawPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) throw new Error('Failed to load data.');
        const data = await response.json();
        const pageHTML = `
            <div class="page-container">
                <div class="page-header"><h2>Request Withdrawal</h2></div>
                <div class="withdraw-card">
                    <div class="balance-display"><small>Available Balance</small><p>₦ ${Number(data.user.balance).toLocaleString()}</p></div>
                    <form id="withdrawForm">
                        <div class="form-group"><label for="amount">Amount</label><input type="number" id="amount" required /></div>
                        <div class="form-group"><label for="bankName">Bank Name</label><input type="text" id="bankName" required /></div>
                        <div class="form-group"><label for="accountNumber">Account Number</label><input type="text" id="accountNumber" required /></div>
                        <div class="form-group"><label for="accountName">Account Name</label><input type="text" id="accountName" required /></div>
                        <button type="submit" class="btn-auth">Submit Request</button>
                    </form>
                </div>
            </div>`;
        appContent.innerHTML = pageHTML;
        document.getElementById('withdrawForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const amount = document.getElementById('amount').value;
            const bankDetails = { bankName: document.getElementById('bankName').value, accountNumber: document.getElementById('accountNumber').value, accountName: document.getElementById('accountName').value };
            if (!confirm(`Request withdrawal of ₦${amount}?`)) return;
            try {
                const withdrawResponse = await fetch(`${API_BASE_URL}/withdraw`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ amount, bankDetails }) });
                const result = await withdrawResponse.json();
                if (!withdrawResponse.ok) return alert('Error: ' + result.message);
                showSuccessModal(result.message);
            } catch (error) { alert('An error occurred.'); }
        });
    } catch (error) { appContent.innerHTML = '<p>Could not load page.</p>'; }
};


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
        case '#vip': renderVipPage(); break;
        case '#me': renderMePage(); break;
        case '#task': renderTaskPage(); break;
        case '#withdraw': renderWithdrawPage(); break;
        case '#home': default: renderHomeScreen();
    }
};

// --- GLOBAL EVENT LISTENERS ---
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
appContent.addEventListener('click', handleInvestClick);
closeModalBtn.addEventListener('click', closeModal);
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) { closeModal(); }
});
