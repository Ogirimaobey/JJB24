// --- 1. IMPORTS AT THE VERY TOP ---
import swProducts from './products.js';
import vipProducts from './vip.js';

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

// --- 2. FIXED handleLogin ---
const handleLogin = async (event) => {
    event.preventDefault();
    const loginIdentifier = document.getElementById('loginIdentifier').value.trim();
    const password = document.getElementById('password').value;
    
    if (!loginIdentifier || !password) {
        return alert('Please provide email or phone and password.');
    }
    
    // FIX: Send both email and phone, with one as an empty string.
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

// --- 3. FIXED handleRegister (with Terms Check) ---
const handleRegister = async (event) => {
    event.preventDefault();

    const fullName = (document.getElementById('fullName') || {}).value?.trim() || '';
    const email = (document.getElementById('email') || {}).value?.trim() || '';
    const phone = (document.getElementById('phone') || {}).value?.trim() || '';
    const password = (document.getElementById('password') || {}).value || '';
    const cpassword = (document.getElementById('cpassword') || {}).value || '';
    const referral = (document.getElementById('referral') || {}).value?.trim() || '';
    
    // NEW: Check if the terms checkbox is agreed to
    const agreedToTerms = document.getElementById('termsCheckbox').checked;
    if (!agreedToTerms) {
        return alert('You must agree to the Terms & Conditions and Privacy Policy to register.');
    }
    
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

// --- 4. FIXED handleResendOTP (uses email) ---
const handleResendOTP = async (email) => { // Changed param to 'email' for clarity
    try {
        const response = await fetch(`${API_BASE_URL}/users/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email }) // Sending email
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

// --- 5. NEW handleCopyReferral ---
const handleCopyReferral = (event) => {
    const referralCode = document.getElementById('referralCode').textContent;
    if (!referralCode || referralCode === 'N/A') {
        alert('No referral code to copy.');
        return;
    }
    
    const textArea = document.createElement('textarea');
    textArea.value = referralCode;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('Referral code copied to clipboard!');
    } catch (err) {
        alert('Failed to copy referral code.');
    }
    document.body.removeChild(textArea);
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
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
};

// --- 6. FIXED renderRegisterScreen (with Terms HTML) ---
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
                <div class="form-group-checkbox" style="flex-direction: row; align-items: center; display: flex; gap: 10px; margin-top: 15px;">
                    <input type="checkbox" id="termsCheckbox" required style="width: auto; height: auto; margin: 0;" />
                    <label for="termsCheckbox" style="margin: 0; font-size: 12px; font-weight: normal; color: #666;">
                        I agree to the 
                        <a href="#terms" class="terms-link" style="color: #6a0dad; text-decoration: underline;">Terms & Conditions</a> 
                        and 
                        <a href="#privacy" class="terms-link" style="color: #6a0dad; text-decoration: underline;">Privacy Policy</a>.
                    </label>
                </div>
                <button type="submit" class="btn-auth">Register</button>
            </form>
            <p class="auth-link">Already have an account? <a href="#login">Login here</a></p>
        </div>
    `;
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
                <a id="resendOTP" style="cursor: pointer; color: #6a0dad;">Resend OTP</a>
            </p>
            
            <p class="auth-link">
                <a href="#login">Back to Login</a>
            </p>
        </div>
    `;
    
    document.getElementById('otpForm').addEventListener('submit', (e) => handleOTPVerification(e, email));
    document.getElementById('resendOTP').addEventListener('click', () => handleResendOTP(email)); 
};


// --- 7. FIXED renderHomeScreen (with Certificate Button) ---
const renderHomeScreen = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Dashboard...</p>';
    const token = localStorage.getItem('token');

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

        if (!response.ok) {
        const err = await response.text();
        console.error('Backend error:', err);
        throw new Error('Failed to load data.');
        }

        const data = await response.json();
        
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
                    <!-- NEW: Certificate Button -->
                    <a href="#certificate" class="action-button">
                        <i class="fas fa-file-certificate"></i>
                        <span>Certificate</span>
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
        appContent.innerHTML = `
            <div class="page-container" style="text-align: center; margin-top: 50px;">
                <p>Could not load dashboard. Please try again.</p>
                <a href="#" id="logoutButton" class="btn-auth" style="display: inline-block; margin-top: 20px;">Logout</a>
            </div>
        `;
        document.getElementById('logoutButton').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            router();
        });
    }
};


// --- 8. FIXED renderProductsPage (uses import) ---
const renderProductsPage = () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Products...</p>';
    
    try {
        let productHTML = '';
        swProducts.forEach(item => {
            productHTML += `
                <div class="product-card-wc">
                    <div class="product-image-wc">
                        <img src="${item.itemimage}" alt="${item.name}" onerror="this.src='https://placehold.co/300x200/6a0dad/ffffff?text=Image+Error'">
                    </div>
                    <div class="product-info-wc">
                        <h4>${item.name}</h4>
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
        console.error('Error rendering products:', error);
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load products.</p>';
    }
};


// --- 9. FIXED renderVipPage (uses import) ---
const renderVipPage = () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading VIP Plans...</p>';
    
    let vipHTML = '';
    vipProducts.forEach(plan => {
        vipHTML += `
        <div class="product-card-wc">
            <div class="product-image-wc">
                <img src="${plan.itemimage}" alt="${plan.name}" onerror="this.src='https://placehold.co/300x200/1a1a1a/ffffff?text=Image+Error'">
            </div>
            <div class="product-info-wc">
                <h4>${plan.name}</h4>
                <p><strong>Price:</strong> ₦${plan.price.toLocaleString()}</p>
                <p><strong>Total Return:</strong> ₦${plan.total_return.toLocaleString()}</p>
                <p><strong>Duration:</strong> ${plan.duration} days</p>
                <p style="font-size: 12px; color: #666;">(Note: Additional 20% of your investment will be added after maturity)</p>
                <button class="btn-invest" data-plan-id="${plan.id}">Invest</button>
            </div>
        </div>`;
    });
    const pageHTML = `<div class="page-container"><div class="page-header"><h2>VIP Promotions</h2></div><div class="product-grid-wc">${vipHTML}</div></div>`;
    appContent.innerHTML = pageHTML;
};


// --- 10. FIXED renderMePage (uses /users/balance) ---
const renderMePage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Profile...</p>';
    const token = localStorage.getItem('token');
    try {
        // --- FIX: Using /users/balance instead of /dashboard ---
        const response = await fetch(`${API_BASE_URL}/users/balance`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) { throw new Error('Failed to load data.'); }
        const data = await response.json();
        
        // --- FIX: Switched to data.balance and provided defaults ---
        const referralCode = data.balance.referral_code || 'N/A';
        const email = data.balance.email || 'No email provided';
        const phone = data.balance.phone_number || 'No phone provided';
        const fullName = data.balance.full_name || 'User';

        const pageHTML = `
            <div class="page-container">
                <div class="profile-header-card">
                    <div class="profile-icon"><i class="fas fa-user"></i></div>
                    <h3>${fullName}</h3>
                    <p>${phone}</p>
                    <p style="font-size: 14px; color: #666; margin-top: 5px;">${email}</p>
                    <div class="referral-box" style="background: #f4f4f4; border-radius: 8px; padding: 10px; margin-top: 15px; text-align: center;">
                        <small style="font-size: 12px; color: #555;">My Referral Code:</small>
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 5px; background: #fff; padding: 5px 10px; border-radius: 5px;">
                            <strong id="referralCode" style="font-size: 16px; color: #333;">${referralCode}</strong>
                            <button id="copyReferralBtn" class="btn-copy" style="background: #6a0dad; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Copy</button>
                        </div>
                    </div>
                </div>
                <div class="action-list-card">
                    <a href="#history" class="action-list-item"><i class="fas fa-history"></i><span>Transaction History</span><i class="fas fa-chevron-right"></i></a>
                    <a href="#team" class="action-list-item"><i class="fas fa-users"></i><span>My Team</span><i class="fas fa-chevron-right"></i></a>
                    <a href="#settings" class="action-list-item"><i class="fas fa-key"></i><span>Change Password</span><i class="fas fa-chevron-right"></i></a>
                    <a href="#about" class="action-list-item"><i class="fas fa-info-circle"></i><span>About Us</span><i class="fas fa-chevron-right"></i></a>
                    <a href="#support" class="action-list-item"><i class="fas fa-headset"></i><span>Customer Support</span><i class="fas fa-chevron-right"></i></a>
                    <a href="#" id="logoutButton" class="action-list-item"><i class="fas fa-sign-out-alt"></i><span>Logout</span><i class="fas fa-chevron-right"></i></a>
                </div>
            </div>
        `;
        appContent.innerHTML = pageHTML;
        
        document.getElementById('logoutButton').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            router();
        });
        
        document.getElementById('copyReferralBtn').addEventListener('click', handleCopyReferral);

    } catch (error) { 
        appContent.innerHTML = `
            <div class="page-container" style="text-align: center; margin-top: 50px;">
                <p>Could not load profile. Please try again.</p>
                <a href="#" id="logoutButton" class="btn-auth" style="display: inline-block; margin-top: 20px;">Logout</a>
            </div>
        `;
        document.getElementById('logoutButton').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            router();
        });
    }
};

// --- 11. FIXED renderTaskPage (new Earnings Dashboard) ---
// This replaces the old renderTaskPage
const renderTaskPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Earnings...</p>';
    const token = localStorage.getItem('token');
    
    try {
        // --- TODO: This is where we will fetch from Babatunde's new endpoint ---
        // const response = await fetch(`${API_BASE_URL}/users/earnings-summary`, { headers: { 'Authorization': 'Bearer ' + token } });
        // if (!response.ok) throw new Error('Failed to load earnings.');
        // const earnings = await response.json();
        
        // --- PLACEHOLDER DATA ---
        // We will use this until Babatunde's backend is ready.
        const earnings = {
            today: 0.00,
            yesterday: 0.00,
            total: 0.00
        };
        // --- END OF PLACEHOLDER ---

        const pageHTML = `
            <div class="page-container task-page">
                <div class="page-header"><h2>Daily Earnings</h2></div>
                
                <div class="earnings-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="earnings-card" style="background: var(--card-background); border-radius: 8px; padding: 15px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <small style="font-size: 12px; color: var(--text-secondary); display: block;">Today's Earning</small>
                        <p style="font-size: 1.5rem; font-weight: 700; color: #6a0dad; margin: 5px 0 0 0;">₦ ${Number(earnings.today).toLocaleString()}</p>
                    </div>
                    <div class="earnings-card" style="background: var(--card-background); border-radius: 8px; padding: 15px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <small style="font-size: 12px; color: var(--text-secondary); display: block;">Yesterday's Earning</small>
                        <p style="font-size: 1.5rem; font-weight: 700; color: #6a0dad; margin: 5px 0 0 0;">₦ ${Number(earnings.yesterday).toLocaleString()}</p>
                    </div>
                </div>

                <div class="earnings-card total-earnings-card" style="background: var(--card-background); border-radius: 8px; padding: 15px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <small style="font-size: 12px; color: var(--text-secondary); display: block;">Total Earnings</small>
                    <p style="font-size: 1.5rem; font-weight: 700; color: #6a0dad; margin: 5px 0 0 0;">₦ ${Number(earnings.total).toLocaleString()}</p>
                </div>

                <div class="info-card" style="margin-top: 20px; text-align: center; background: var(--card-background); padding: 10px; border-radius: 8px; font-size: 14px;">
                    <i class="fas fa-clock" style="color: #6a0dad; margin-right: 8px;"></i>
                    <span>Daily income drops at 12:00 am.</span>
                </div>
            </div>`;
        appContent.innerHTML = pageHTML;

    } catch (error) { 
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load earnings. Please try again.</p>'; 
    }
};


// --- 12. THIS IS THE OLD renderWithdrawPage ---
// Babatunde's new payment code is NOT included here.
const renderWithdrawPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/users/balance`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) throw new Error('Failed to load data.');
        const data = await response.json();
        const balance = data.balance?.balance || 0;
        
        const pageHTML = `
            <div class="page-container">
                <div class="page-header"><h2>Request Withdrawal</h2></div>
                <div class="withdraw-card">
                    <div class="balance-display"><small>Available Balance</small><p>₦ ${Number(balance).toLocaleString()}</p></div>
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
            // NOTE: This is the OLD API endpoint /withdraw, not /payment/withdraw
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


// --- 13. NEW "PLACEHOLDER" PAGES ---

// NOTE: renderHistoryPage and renderDepositPage are intentionally NOT here.
const renderTeamPage = () => {
    appContent.innerHTML = `
        <div class="page-container">
            <div class="page-header"><h2>My Team</h2></div>
            <div class="placeholder-card" style="text-align: center; padding: 40px 20px;">
                <p>Your team members and referral commissions will appear here.</p>
                <small>(Feature in development)</small>
                <div style="text-align: left; margin-top: 20px; display: inline-block;">
                    <h4>Referral Commission Rules:</h4>
                    <ul>
                        <li>Level A: 6%</li>
                        <li>Level B: 2%</li>
                        <li>Level C: 1%</li>
                    </ul>
                    <h4>Team Commission Rules:</h4>
                    <ul>
                        <li>Level A: 5% Daily</li>
                        <li>Level B: 3% Daily</li>
                        <li>Level C: 2% Daily</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
};

const renderSettingsPage = () => {
    appContent.innerHTML = `
        <div class="page-container">
            <div class="page-header"><h2>Change Password</h2></div>
            <div class="placeholder-card" style="max-width: 400px; margin: 20px auto; padding: 20px;">
                <form id="changePasswordForm">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" id="currentPassword" required />
                    </div>
                    <div class="form-group">
                        <label>New Password</label>
                        <input type="password" id="newPassword" required />
                    </div>
                    <div class="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" id="confirmNewPassword" required />
                    </div>
                    <button type="submit" class="btn-auth">Update Password</button>
                </form>
                <small style="text-align: center; display: block; margin-top: 15px;">(Feature in development)</small>
            </div>
        </div>
    `;
    // Add event listener for the form
    document.getElementById('changePasswordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Password change feature is in development.');
    });
};

const renderSupportPage = () => {
    appContent.innerHTML = `
        <div class="page-container">
            <div class="page-header"><h2>Customer Support</h2></div>
            <!-- UPDATED: Added new email address -->
            <div class="placeholder-card" style="text-align: center; padding: 40px 20px;">
                <p>For any assistance, please contact our customer care via email.</p>
                <a href="mailto:jjb24wines@gmail.com" class="btn-auth" style="display: inline-block; text-decoration: none; margin-top: 20px; padding: 12px 20px;">
                    jjb24wines@gmail.com
                </a>
            </div>
        </div>
    `;
};

const renderRewardsPage = () => {
    appContent.innerHTML = `
        <div class="page-container">
            <div class="page-header"><h2>Rewards</h2></div>
            <div class="placeholder-card" style="text-align: center; padding: 40px 20px;">
                <p>Your rewards and bonuses will appear here.</p>
                <small>(Feature in development)</small>
            </div>
        </div>
    `;
};

// --- 14. NEW Certificate Page ---
const renderCertificatePage = () => {
    // --- TODO: REPLACE THIS WITH YOUR REAL CERTIFICATE URL ---
    const certificateUrl = 'https://placehold.co/600x850/ffffff/333333?text=Company+Registration+Certificate+(CAC)';
    
    appContent.innerHTML = `
        <div class="page-container">
            <div class="page-header"><h2>Company Registration</h2></div>
            <div class="placeholder-card" style="padding: 10px;">
                <img src="${certificateUrl}" 
                     alt="JJB24 Company Registration Certificate" 
                     style="width: 100%; max-width: 600px; margin: 0 auto; display: block; border: 1px solid #eee;"
                     onerror="this.src='https://placehold.co/600x850/ffffff/333333?text=Image+Not+Found'">
            </div>
        </div>
    `;
};


// --- 15. NEW LEGAL PAGES ---

const renderAboutPage = () => {
    appContent.innerHTML = `
        <div class="page-container legal-page">
            <div class="page-header"><h2>About Us</h2></div>
            <div class="legal-content">
                <p>Wine is more than just a drink – it’s a growing global business worth billions of dollars. For decades, wine investments have been reserved for wealthy collectors and foreign investors. Today, we are changing that. JJB24 wines] is Nigeria’s first online winery investment platform designed to give everyday people the chance to participate in the lucrative wine industry. Through our platform, you can invest in wine production, storage, and distribution, while earning attractive returns as the market grows.</p>
                
                <h4>Why Wine Investment?</h4>
                <ul>
                    <li><strong>Stable & Growing Market</strong> – The global wine industry is valued at over $400 billion and continues to expand, especially in emerging markets like Africa.</li>
                    <li><strong>Hedge Against Inflation</strong> – Fine wines and winery projects often increase in value over time, making them a secure alternative investment.</li>
                    <li><strong>Diversification</strong> – Instead of putting all your money into real estate or stocks, wine investment gives you a unique way to balance your portfolio.</li>
                </ul>

                <h4>🍷 Our Vision</h4>
                <p>We believe Africa – and Nigeria in particular – can play a bigger role in the global wine market. By opening the doors of winery investment to Nigerians, we are not only creating wealth opportunities but also supporting the growth of a local wine culture and industry.</p>

                <h4>🔒 Why Trust Us?</h4>
                <ul>
                    <li><strong>Transparency</strong> – All investments are backed by real projects with verifiable documentation.</li>
                    <li><strong>Partnerships</strong> – We collaborate with experienced wine producers, importers, and distributors locally and abroad.</li>
                    <li><strong>Security</strong> – Your funds are protected with regulated financial partners and insured investment structures.</li>
                </ul>

                <h4>🚀 Be Part of the Future</h4>
                <p>With JJB24 you don’t need to be a billionaire or a wine expert to invest. Whether you are an entrepreneur, a professional, or someone simply looking for a smart passive income opportunity, this is your chance to take part in an exciting industry.</p>
                <p>👉 Invest today, grow with us, and let’s put Nigeria on the global wine map.</p>
            </div>
        </div>
    `;
};

const renderTermsPage = () => {
    bottomNav.style.display = 'none'; // Hide nav for this page
    appContent.innerHTML = `
        <div class="page-container legal-page">
            <div class="page-header">
                <a href="#register" class="back-link"><i class="fas fa-chevron-left"></i> Back</a>
                <h2>Terms & Conditions</h2>
            </div>
            <div class="legal-content">
                <p>Welcome to JJB24 , Nigeria’s first online winery investment platform. By creating an account or using our services, you agree to the following Terms & Conditions. Please read them carefully.</p>
                
                <h4>Acceptance of Terms</h4>
                <p>By accessing or using this platform, you confirm that you are at least 18 years old and legally capable of entering into an investment agreement under Nigerian law.</p>

                <h4>Nature of Service</h4>
                <ul>
                    <li>JJB24 provides opportunities to invest in winery-related projects (production, importation, storage, and distribution).</li>
                    <li>We are an investment platform, not a bank or savings scheme.</li>
                    <li>Returns are subject to market conditions and may vary.</li>
                </ul>

                <h4>Investment & Returns</h4>
                <ul>
                    <li>Minimum and maximum investment amounts will be specified on the platform.</li>
                    <li>Returns on investment (ROI) will be paid according to the package selected.</li>
                    <li>All payouts are subject to project performance and timelines.</li>
                    <li>Past performance does not guarantee future results.</li>
                </ul>

                <h4>Risks Disclaimer</h4>
                <ul>
                    <li>All investments carry risks, including possible loss of capital.</li>
                    <li>By investing, you acknowledge that you understand and accept these risks.</li>
                    <li>We do not guarantee profits, only projected estimates based on industry performance.</li>
                </ul>
                
                <h4>User Responsibilities</h4>
                <ul>
                    <li>Provide accurate and truthful information during registration.</li>
                    <li>Keep login details secure and confidential.</li>
                </ul>

                <h4>Platform Responsibilities</h4>
                <ul>
                    <li>Provide transparent information about all investment opportunities.</li>
                    <li>Use secure payment channels for deposits and withdrawals.</li>
                    <li>Maintain accurate records of your investments and transactions.</li>
                </ul>

                <h4>Fees & Charge</h4>
                <ul>
                    <li>Some transactions may attract administrative or processing fees (clearly stated before payment).</li>
                    <li>Fees are non-refundable unless stated otherwise.</li>
                </ul>

                <h4>Withdrawal Policy</h4>
                <ul>
                    <li>Withdrawals of ROI will be processed within [3 business days] of request.</li>
                    <li>Early withdrawal of invested capital may not be possible until the project cycle ends.</li>
                </ul>
                
                <p>✅ By signing up, you agree that you have read, understood and accepte these Terms &Conditions</p>
            </div>
        </div>
    `;
};

const renderPrivacyPolicyPage = () => {
    bottomNav.style.display = 'none'; // Hide nav for this page
    appContent.innerHTML = `
        <div class="page-container legal-page">
            <div class="page-header">
                <a href="#register" class="back-link"><i class="fas fa-chevron-left"></i> Back</a>
                <h2>Privacy Policy</h2>
            </div>
            <div class="legal-content">
                <p>Effective Date: now</p>
                <p>At JJB24 we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our online winery investment platform.</p>

                <h4>Information We Collect</h4>
                <p>When you register or use our platform, we may collect the following information:</p>
                <ul>
                    <li>Personal details (name, date of birth, gender).</li>
                    <li>Contact information (email address, phone number)</li>
                    <li>Financial information (bank account details, payment card details</li>
                </ul>

                <h4>How We Use Your Information</h4>
                <p>We use the information collected to:</p>
                <ul>
                    <li>Verify your identity and comply with KYC (Know Your Customer regulations.</li>
                    <li>Process investments, deposits, and withdrawals.</li>
                    <li>Provide customer support and respond to inquiries.</li>
                    <li>Improve our platform’s performance and user experience.</li>
                    <li>Send important updates, newsletters, or promotional offers (you can opt out anytime).</li>
                </ul>

                <h4>Sharing of Information</h4>
                <p>We do not sell your personal information. However, we may share it with:</p>
                <ul>
                    <li>Regulatory bodies (SEC, CBN, NDIC) when required by law.</li>
                    <li>Third-party partners (payment processors, verification services, auditors).</li>
                    <li>Law enforcement agencies in cases of fraud, money laundering, or illegal activity.</li>
                </ul>

                <h4>Data Protection & Security</h4>
                <ul>
                    <li>We use encryption, firewalls, and secure servers to protect your data.</li>
                    <li>Only authorized staff have access to sensitive information.</li>
                    <li>Despite our efforts, no system is 100% secure. Users are encouraged to protect their login details.</li>
                </ul>

                <h4>Your Rights</h4>
                <p>Under the Nigeria Data Protection Regulation (NDPR), you have the right to:</p>
                <ul>
                    <li>Access the personal data we hold about you.</li>
                    <li>Request correction or deletion of your data.</li>
                    <li>Withdraw consent for certain data uses (e.g., marketing).</li>
                </ul>
                
                <p>✅ By using our platform, you agree to the terms of this Privacy Policy.</p>
            </div>
        </div>
    `;
};


// --- 16. FINAL, COMPLETE ROUTER (without Babatunde's new routes) ---
const router = () => {
    const token = localStorage.getItem('token');
    
    const hash = window.location.hash || '#home';
    
    // Public routes that don't need a token
    if (['#login', '#register', '#terms', '#privacy'].includes(hash)) {
        bottomNav.style.display = 'none';

        switch(hash) {
            case '#login': renderLoginScreen(); break;
            case '#register': renderRegisterScreen(); break;
            case '#terms': renderTermsPage(); break;
            case '#privacy': renderPrivacyPolicyPage(); break;
            default: renderLoginScreen(); // Default to login
        }
        return;
    }

    // All other routes require a token
    if (!token) {
        bottomNav.style.display = 'none'; // Hide nav
        renderLoginScreen();
        return;
    }

    // User is logged in, show the nav
    bottomNav.style.display = 'flex';

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        // Handle #home hash
        if (link.getAttribute('href') === '#home' && (hash === '#home' || hash === '')) {
            link.classList.add('active');
        } 
        // Handle other hashes
        else if (link.getAttribute('href') === hash) { 
            link.classList.add('active'); 
        }
        // Handle "Me" page and its sub-pages
        else if (link.getAttribute('href') === '#me' && ['#history', '#team', '#settings', '#about', '#support'].includes(hash)) {
            link.classList.add('active');

        }
    });
    
    switch (hash) {
        // Main Nav
        case '#home': renderHomeScreen(); break;
        case '#products': renderProductsPage(); break;
        case '#vip': renderVipPage(); break;
        case '#me': renderMePage(); break;
        case '#task': renderTaskPage(); break;
        
        // --- NOTE: Babatunde's new routes are NOT here ---
        // case '#deposit': renderDepositPage(); break;
        // case '#history': renderHistoryPage(); break;
        case '#withdraw': renderWithdrawPage(); break;
        
        // "Me" page and "Home" page links
        case '#team': renderTeamPage(); break;
        case '#settings': renderSettingsPage(); break;
        case '#about': renderAboutPage(); break;
        case '#support': renderSupportPage(); break;
        case '#rewards': renderRewardsPage(); break;
        case '#certificate': renderCertificatePage(); break;

        // --- We need a #deposit and #history placeholder ---
        case '#deposit':
            appContent.innerHTML = `<div class="page-container"><div class="page-header"><h2>Deposit</h2></div><p style="text-align:center; margin-top: 30px;">Deposit feature is being updated.</p></div>`;
            break;
        case '#history':
            appContent.innerHTML = `<div class="page-container"><div class="page-header"><h2>History</h2></div><p style="text-align:center; margin-top: 30px;">History feature is being updated.</p></div>`;
            break;

        default: 
            renderHomeScreen(); // Default to home for logged-in users
    }
};

// --- GLOBAL EVENT LISTENERS ---
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
appContent.addEventListener('click', handleInvestClick);
closeModalBtn.addEventListener('click', closeModal);
successModal.addEventListener('click', (e) => {
    if (e.target.id === 'successModal') { closeModal(); }
});
