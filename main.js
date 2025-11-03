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
    
    // --- FIXED LOGIN LOGIC ---
    // Send both keys, with one being empty, to match backend expectation
    const isEmail = loginIdentifier.includes('@');
    const loginData = {
        password: password,
        email: isEmail ? loginIdentifier : '',
        phone: isEmail ? '' : loginIdentifier
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(loginData) 
        });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        localStorage.setItem('token', result.token);
        // console.log('Login successful, token stored:' , result.token);
        window.location.hash = '#home';
        router();
    } catch (error) { 
        alert('Could not connect to server.'); 
    }
};

const handleRegister = async (event) => {
    event.preventDefault();

    // NEW: Check if the terms box is checked
    const agreeTerms = document.getElementById('agreeTerms').checked;
    if (!agreeTerms) {
        return alert('You must agree to the Terms & Conditions and Privacy Policy to register.');
    }

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
    // BUG FIX: Pass email to the function, but send it as 'phone' in the payload
    // This is based on the previous bug. Ideally, backend should accept 'email'
    // For now, this fixes the mismatch where an email was passed to a 'phone' var.
    // NOTE: This assumes the 'phone' param is actually the EMAIL from renderOTPVerificationScreen
    try {
        const response = await fetch(`${API_BASE_URL}/users/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // BUGGY PART: Sending email as 'phone'. This needs backend clarification.
            // For now, we'll send the email to the 'phone' key as the function expects.
            // A better fix is to send 'email' and have backend handle it.
            // Let's try sending 'email' instead.
            body: JSON.stringify({ email: phone }) // Assuming 'phone' variable holds the email
        });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        
        alert('New OTP sent to your email!');
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
            <p class="auth-link">Don't have an account? <a href="#register">Register here</a></p>
        </div>
    `;
    // Removed event listener, href="#register" will be caught by router
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
                
                <!-- NEW: Terms and Conditions Checkbox -->
                <div class="form-group terms-group" style="flex-direction: row; align-items: center; gap: 10px; margin-top: 15px;">
                    <input type="checkbox" id="agreeTerms" required style="width: auto; height: auto; margin: 0;">
                    <label for="agreeTerms" style="margin: 0; font-size: 12px; font-weight: normal; color: #666;">
                        I have read and agree to the 
                        <a href="#terms" class="terms-link" style="color: #6a0dad; text-decoration: underline;">Terms & Conditions</a> and 
                        <a href="#privacy" class="terms-link" style="color: #6a0dad; text-decoration: underline;">Privacy Policy</a>.
                    </label>
                </div>

                <button type="submit" class="btn-auth">Register</button>
            </form>
            <p class="auth-link">Already have an account? <a href="#login">Login here</a></p>
        </div>
    `;
    // Removed event listener, href="#login" will be caught by router
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

const renderOTPVerificationScreen = (email) => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
        <div class="auth-container">
            <div class="auth-logo">JJB24</div>
            <h2>Verify Your Account</h2>
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
                <a id="resendOTP" style="cursor: pointer; color: #6a0dad;">Resend OTP</a>
            </p>
            
            <p class="auth-link">
                <a href="#login">Back to Login</a>
            </p>
        </div>
    `;
    
    document.getElementById('otpForm').addEventListener('submit', (e) => handleOTPVerification(e, email));
    // Fix: Pass the correct variable (email) to the resend function
    document.getElementById('resendOTP').addEventListener('click', () => handleResendOTP(email));
    // No listener needed for Back to Login, href="#login" handles it
};


const renderHomeScreen = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Dashboard...</p>';
    const token = localStorage.getItem('token');
    
    // This check is good, but the router should handle it.
    if (!token) {
        alert("You are not logged in. Please log in again.");
        renderLoginScreen();
        return;
    }

    try {
        // FIX: Changed to /dashboard to match other pages
        const response = await fetch(`${API_BASE_URL}/dashboard`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
        },
        });

        // console.log('Response from user Balance backend:', response); 

        if (!response.ok) {
        const err = await response.text();
        console.error('Backend error:', err);
        throw new Error('Failed to load data.');
        }

        const data = await response.json();
        // console.log('User Balance data:', data);

        // FIX: Changed from data.balance to data.user
        const fullName = data.user.full_name || 'User';
        const balance = data.user.balance || 0;

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
                <h2>₦ ${Number(balance).toLocaleString()}</h2>
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
        // Better error message
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load dashboard. Please try again. <a href="#login">Logout</a></p>';
    }
};


const renderProductsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Products...</p>';
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_BASE_URL}/users/allItems`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        // console.log('Response from products backend:', response);

        if (!response.ok) throw new Error('Failed to load data.');

        const data = await response.json();
        // console.log('Products data from backend:', data);

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
    
    // FIX: Hardcode the VIP data as requested
    const vipPlans = [
        { id: 'vip1', name: 'CASPERVIP1', price: 500000, total_return: 600000, duration: 30 },
        { id: 'vip2', name: 'CASPERVIP2', price: 1000000, total_return: 1200000, duration: 30 },
        { id: 'vip3', name: 'CASPER3', price: 2000000, total_return: 2400000, duration: 30 },
        { id: 'vip4', name: 'CASPER4', price: 3000000, total_return: 3600000, duration: 30 }
    ];

    let vipHTML = '';
    vipPlans.forEach(plan => {
        vipHTML += `
        <div class="product-card-wc">
            <div class="product-info-wc">
                <h4>${plan.name}</h4>
                <p><strong>Price:</strong> ₦${plan.price.toLocaleString()}</p>
                <p><strong>Total Return:</strong> ₦${plan.total_return.toLocaleString()}</p>
                <p><strong>Duration:</strong> ${plan.duration} days</p>
                <p><small>(Note: Additional 20% of your investment will be added after maturity)</small></p>
                <button class="btn-invest" data-plan-id="${plan.id}">Invest</button>
            </div>
        </div>`;
    });
    const pageHTML = `<div class="page-container"><div class="page-header"><h2>VIP Promotions</h2></div><div class="product-grid-wc">${vipHTML}</div></div>`;
    appContent.innerHTML = pageHTML;
    
    // Old fetch logic is removed
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
            window.location.hash = '#login'; // Go to login
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

// --- NEW RENDER FUNCTIONS FOR LEGAL PAGES ---

const renderTermsPage = () => {
    bottomNav.style.display = 'none'; // Hide nav on legal pages
    appContent.innerHTML = `
        <div class="page-container legal-page" style="padding: 15px;">
            <div class="page-header" style="padding-bottom: 10px; border-bottom: 1px solid #eee;">
                <a href="#register" class="back-link" style="color: #6a0dad; text-decoration: none; font-weight: bold;">&larr; Back to Register</a>
                <h2 style="margin-top: 10px;">Terms & Conditions</h2>
            </div>
            <div class="legal-content" style="padding-top: 10px; font-size: 14px; line-height: 1.6;">
                <p>Welcome to JJB24, Nigeria’s first online winery investment platform. By creating an account or using our services, you agree to the following Terms & Conditions. Please read them carefully.</p>
                
                <h4 style="margin-top: 15px; margin-bottom: 5px;">Acceptance of Terms</h4>
                <p>By accessing or using this platform, you confirm that you are at least 18 years old and legally capable of entering into an investment agreement under Nigerian law.</p>
                
                <h4 style="margin-top: 15px; margin-bottom: 5px;">Nature of Service</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>JJB24 provides opportunities to invest in winery-related projects (production, importation, storage, and distribution).</li>
                    <li>We are an investment platform, not a bank or savings scheme.</li>
                    <li>Returns are subject to market conditions and may vary.</li>
                </ul>
                
                <h4 style="margin-top: 15px; margin-bottom: 5px;">Investment & Returns</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Minimum and maximum investment amounts will be specified on the platform.</li>
                    <li>Returns on investment (ROI) will be paid according to the package selected.</li>
                    <li>All payouts are subject to project performance and timelines.</li>
                    <li>Past performance does not guarantee future results.</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Risks Disclaimer</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>All investments carry risks, including possible loss of capital.</li>
                    <li>By investing, you acknowledge that you understand and accept these risks.</li>
                    <li>We do not guarantee profits, only projected estimates based on industry performance.</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">User Responsibilities</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Provide accurate and truthful information during registration.</li>
                    <li>Keep login details secure and confidential.</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Platform Responsibilities</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Provide transparent information about all investment opportunities.</li>
                    <li>Use secure payment channels for deposits and withdrawals.</li>
                    <li>Maintain accurate records of your investments and transactions.</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Fees & Charge</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Some transactions may attract administrative or processing fees (clearly stated before payment).</li>
                    <li>Fees are non-refundable unless stated otherwise.</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Withdrawal Policy</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Withdrawals of ROI will be processed within [3 business days] of request.</li>
                    <li>Early withdrawal of invested capital may not be possible until the project cycle ends.</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Limitation of Liability</h4>
                <p>[jjb24] will not be liable for:</p>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Losses caused by market downturns.</li>
                    <li>Delays due to third-party partners or financial institutions.</li>
                    <li>Technical issues beyond our control (e.g., internet downtime, payment gateway errors).</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Termination of Account</h4>
                <p>We reserve the right to suspend or terminate any account involved in fraud, false information, or violation of these Terms.</p>
                
                <h4 style="margin-top: 15px; margin-bottom: 5px;">Intellectual Property</h4>
                <p>All content, branding, and materials on this platform are owned by JJB24 and cannot be copied or reused without permission.</p>
                
                <h4 style="margin-top: 15px; margin-bottom: 5px;">Governing Law</h4>
                <p>These Terms & Conditions are governed by the laws of the Federal Republic of Nigeria. Any disputes will be resolved in Nigerian courts.</p>
                
                <h4 style="margin-top: 15px; margin-bottom: 5px;">Amendments</h4>
                <p>We may update these Terms from time to time. Continued use of the platform means you accept the updated Terms.</p>
                
                <p style="margin-top: 20px;"><strong>✅ By signing up, you agree that you have read, understood and accepted these Terms & Conditions.</strong></p>
            </div>
        </div>
    `;
};

const renderPrivacyPolicyPage = () => {
    bottomNav.style.display = 'none'; // Hide nav on legal pages
    appContent.innerHTML = `
        <div class="page-container legal-page" style="padding: 15px;">
            <div class="page-header" style="padding-bottom: 10px; border-bottom: 1px solid #eee;">
                <a href="#register" class="back-link" style="color: #6a0dad; text-decoration: none; font-weight: bold;">&larr; Back to Register</a>
                <h2 style="margin-top: 10px;">Privacy Policy</h2>
            </div>
            <div class="legal-content" style="padding-top: 10px; font-size: 14px; line-height: 1.6;">
                <p>Effective Date: now</p>
                <p>At JJB24 we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our online winery investment platform.</p>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Information We Collect</h4>
                <p>When you register or use our platform, we may collect the following information:</p>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Personal details (name, date of birth, gender).</li>
                    <li>Contact information (email address, phone number)</li>
                    <li>Financial information (bank account details, payment card details)</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">How We Use Your Information</h4>
                <p>We use the information collected to:</p>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Verify your identity and comply with KYC (Know Your Customer regulations.</li>
                    <li>Process investments, deposits, and withdrawals.</li>
                    <li>Provide customer support and respond to inquiries.</li>
                    <li>Improve our platform’s performance and user experience.</li>
                    <li>Send important updates, newsletters, or promotional offers (you can opt out anytime).</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Sharing of Information</h4>
                <p>We do not sell your personal information. However, we may share it with:</p>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Regulatory bodies (SEC, CBN, NDIC) when required by law.</li>
                    <li>Third-party partners (payment processors, verification services, auditors).</li>
                    <li>Law enforcement agencies in cases of fraud, money laundering, or illegal activity.</li>
                </ul>

                <h4 style."margin-top: 15px; margin-bottom: 5px;">Data Protection & Security</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>We use encryption, firewalls, and secure servers to protect your data.</li>
                    <li>Only authorized staff have access to sensitive information.</li>
                    <li>Despite our efforts, no system is 100% secure. Users are encouraged to protect their login details.</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Cookies & Tracking</h4>
                <p>Our website may use cookies to:</p>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Remember your login details.</li>
                    <li>Personalize your browsing experience.</li>
                    <li>Track usage statistics for platform improvement.</li>
                </ul>
                <p>You may disable cookies in your browser, but some features may not work properly.</p>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Data Retention</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>We retain your personal information for as long as necessary to provide services or comply with legal obligations.</li>
                    <li>If you close your account, we may still keep certain records for regulatory or tax purposes.</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Your Rights</h4>
                <p>Under the Nigeria Data Protection Regulation (NDPR), you have the right to:</p>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li>Access the personal data we hold about you.</li>
                    <li>Request correction or deletion of your data.</li>
                    <li>Withdraw consent for certain data uses (e.g., marketing).</li>
                </ul>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Updates to Policy</h4>
                <p>We may update this Privacy Policy from time to time. Any changes will be communicated through our website or by email.</p>

                <h4 style="margin-top: 15px; margin-bottom: 5px;">Contact Us</h4>
                <p>For questions or concerns about this Privacy Policy, please contact: Contact the customer care on telegram</p>

                <p style="margin-top: 20px;"><strong>✅ By using our platform, you agree to the terms of this Privacy Policy.</strong></p>
            </div>
        </div>
    `;
};


// --- ROUTER ---
const router = () => {
    const token = localStorage.getItem('token');
    
    // Handle routes that DON'T require a token
    const hash = window.location.hash || '#home';

    // Public auth/legal routes
    // We check for these *before* checking for a token
    if (hash === '#login') {
        bottomNav.style.display = 'none';
        renderLoginScreen();
        return;
    }
    if (hash === '#register') {
        bottomNav.style.display = 'none';
        renderRegisterScreen();
        return;
    }
    if (hash === '#terms') {
        bottomNav.style.display = 'none';
        renderTermsPage();
        return;
    }
    if (hash === '#privacy') {
        bottomNav.style.display = 'none';
        renderPrivacyPolicyPage();
        return;
    }

    // From here, all routes REQUIRE a token
    if (!token) {
        bottomNav.style.display = 'none';
        renderLoginScreen();
        return;
    }
    
    // User is logged in, show the nav
    bottomNav.style.display = 'flex';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) { link.classList.add('active'); }
    });
    
    switch (hash) {
        case '#home': renderHomeScreen(); break;
        case '#products': renderProductsPage(); break;
        case '#vip': renderVipPage(); break;
        case '#me': renderMePage(); break;
        case '#task': renderTaskPage(); break;
        case '#withdraw': renderWithdrawPage(); break;
        
        // Default for logged-in users
        default: 
            window.location.hash = '#home';
            renderHomeScreen();
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
