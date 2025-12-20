import vipProducts from './vip.js';

const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');
// Switch to local backend for testing, change back to Render for production
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://jjb24-backend.onrender.com/api';


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

// --- NEW: A central function to handle logging the user out ---
const logoutUser = () => {
    window.location.hash = '#login';
    router(); 
};

const fetchWithAuth = async (url, options = {}) => {
    const headers = new Headers(options.headers || {});
    if (!headers.has('Content-Type') && options.body) {
        headers.append('Content-Type', 'application/json');
    }

    // Add Authorization header with token from localStorage (fallback if cookie doesn't work)
    const token = localStorage.getItem('authToken');
    if (token && !headers.has('Authorization')) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    console.log('[fetchWithAuth] Making request to:', url);
    console.log('[fetchWithAuth] Has token:', !!token);
    console.log('[fetchWithAuth] Headers:', Object.fromEntries(headers));

    const response = await fetch(url, { 
        ...options, 
        headers,
        credentials: 'include'
    });

    console.log('[fetchWithAuth] Response status:', response.status);

    // If token is expired or invalid, the server sends 401
    if (response.status === 401 || response.status === 403) {
        console.error('[fetchWithAuth] Authentication failed, clearing token');
        localStorage.removeItem('authToken');
        alert('Your session has expired. Please log in again.');
        logoutUser();
        throw new Error('Authentication failed - redirecting to login');
    }

    return response;
};

// --- ACTION HANDLERS (for form submissions, button clicks, etc.) ---

// --- 2. FIXED handleLogin (OURS) ---
const handleLogin = async (event) => {
    event.preventDefault();
    const loginIdentifier = document.getElementById('loginIdentifier').value.trim();
    const password = document.getElementById('password').value;
    
    if (!loginIdentifier || !password) {
        return alert('Please provide email or phone and password.');
    }
    
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
            body: JSON.stringify(loginData),
            credentials: 'include'
        });
        const result = await response.json();
        console.log('Login response:', result);
        if (!response.ok) return alert(`Error: ${result.message}`);
        
        // Store token in localStorage if provided (for Authorization header fallback)
        if (result.token) {
            localStorage.setItem('authToken', result.token);
        }
        
        window.location.hash = '#home';
        router();
    } catch (error) { 
        alert('Could not connect to server.'); 
        console.error('Login error:', error);
    }
};

// --- 3. FIXED handleRegister (with Terms Check) (OURS) ---
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
    

    const agreedToTerms = document.getElementById('termsCheckbox').checked;
    if (!agreedToTerms) {
        return alert('You must agree to the Terms & Conditions and Privacy Policy to register.');
    }
    
    if (!fullName || !email || !phone || !password) return alert('Please fill in all required fields.');
    if (password !== cpassword) return alert('Passwords do not match.');
    // NOTE: We use the original 'fetch' here because we don't have a token yet.
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
        // NOTE: We use the original 'fetch' here
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);

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
const handleResendOTP = async (email) => { 
    try {
        const response = await fetch(`${API_BASE_URL}/users/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email }) 
        });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        
        alert('New OTP sent to your email!');
    } catch (error) {
        alert('Could not resend OTP. Please try again.');
    }
};

<<<<<<< HEAD
// --- 5. handleInvestClick (BABATUNDE'S + Our Fix) ---
=======
// --- 5. HANDLE INVEST CLICK (SMART ROUTING - CRITICAL) ---
>>>>>>> origin/dev
const handleInvestClick = async (event) => {
    if (event.target.classList.contains('btn-invest')) {
        const rawItemId = event.target.dataset.planId; 
        // console.log('Raw itemId from button:', rawItemId, 'Type:', typeof rawItemId);
        
        let itemId = Number(rawItemId);
        if (isNaN(itemId) || itemId <= 0) {
            alert('Error: Invalid product ID. Please refresh the page and try again.');
            // console.error('Invalid itemId:', rawItemId, 'Type:', typeof rawItemId, 'Converted:', itemId);
            return;
        }
        
        // console.log('Sending investment request with itemId:', itemId);
        
        if (!confirm(`Are you sure you want to invest in this plan?`)) { return; }
        
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/investments/createInvestment/${itemId}`, {
                method: 'POST'
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                showSuccessModal('Investment created successfully! Your balance has been updated.');
                setTimeout(() => {
                    window.location.hash = '#home';
                    router();
                }, 2000);
            } else {
                const errorMsg = result.message || 'Failed to create investment. Please try again.';
                alert('Error: ' + errorMsg);
            }
        } catch (error) {
            console.error('Investment error:', error);
            alert('An investment error occurred. Please try again.');
        }
    }
};

// --- 6. NEW handleCopyReferral ---
const handleCopyReferral = (event) => {
    const referralCode = document.getElementById('referralCode')?.textContent;
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

// --- 7. FIXED renderRegisterScreen (with Terms HTML) (OURS) ---
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
    document.getElementById('resendOTP').addEventListener('click', () => handleResendOTP(email)); 
};

// --- 8. FIXED renderHomeScreen (with Certificate Button) ---
const renderHomeScreen = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Dashboard...</p>';

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`, {
            method: "GET"
        });

        if (!response.ok) {
        const err = await response.text();
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
        if (error.message && (error.message.includes('Promise') || error.message.includes('Authentication failed'))) { 
            console.log("Redirecting to login."); 
            return; 
        }
        appContent.innerHTML = `
            <div class="page-container" style="text-align: center; margin-top: 50px;">
                <p>Could not load dashboard. Please try again.</p>
                <a href="#" id="logoutButton" class="btn-auth" style="display: inline-block; margin-top: 20px;">Logout</a>
            </div>
        `;
        document.getElementById('logoutButton').addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser(); 
        });
    }
};

// --- 9. FIXED renderProductsPage (uses API fetch with validation) ---
const renderProductsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Products...</p>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/allItems`, {
            credentials: 'include'
        });
        // console.log('Response from products backend:', response);

        if (!response.ok) throw new Error('Failed to load data.');

        const data = await response.json();

        let productHTML = '';
<<<<<<< HEAD
        data.items.forEach(item => {
        // console.log('Processing item:', { id: item.id, idType: typeof item.id, itemname: item.itemname });
            
            const itemId = Number(item.id);
            if (isNaN(itemId)) {
                console.error('Invalid item ID:', item.id, 'Type:', typeof item.id, 'for item:', item.itemname);
            return; 
            }
            productHTML += `
                <div class="product-card-wc">
                    <div class="product-image-wc">
                        <img src="${item.itemimage}" alt="${item.itemname}" onerror="this.src='https://placehold.co/300x200/6a0dad/ffffff?text=Image+Error'">
                    </div>
                    <div class="product-info-wc">
                        <h4>${item.itemname}</h4>
                        <p>Price: ₦${Number(item.price).toLocaleString()}</p>
                        <p>Daily Income: ₦${Number(item.dailyincome).toLocaleString()}</p>
                        <button class="btn-invest" data-plan-id="${itemId}">Invest</button>
                    </div>
                </div>`;
        });
=======
        const items = data.items || [];
        
        if (items.length === 0) {
            productHTML = '<p style="text-align:center; padding:20px;">No products available.</p>';
        } else {
            items.forEach(item => {
                const itemId = Number(item.id);
                // Backend might not send 'duration' yet, so we default to 30
                const duration = item.duration || 30; 
                
                productHTML += `
                    <div class="product-card-wc">
                        <div class="product-image-wc">
                            <img src="${item.itemimage}" alt="${item.itemname}" onerror="this.src='https://placehold.co/300x200/6a0dad/ffffff?text=Image+Error'">
                        </div>
                        <div class="product-info-wc">
                            <h4>${item.itemname}</h4>
                            <p><strong>Price:</strong> ₦${Number(item.price).toLocaleString()}</p>
                            <p><strong>Daily Income:</strong> ₦${Number(item.dailyincome).toLocaleString()}</p>
                            <p><strong>Duration:</strong> ${duration} days</p>
                            
                            <p style="font-size: 12px; color: #666; margin-top: 5px;">
                                (Daily Withdrawal Available)
                            </p>
                            
                            <button class="btn-invest" data-plan-id="${itemId}" data-type="regular">Invest</button>
                        </div>
                    </div>`;
            });
        }
>>>>>>> origin/dev

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

// --- 10. FIXED renderVipPage (uses API) ---
const renderVipPage = async () => {
    appContent.innerHTML = `<p style="text-align: center; margin-top: 50px;">Loading VIP Plans...</p>`;

    try {
        const response = await fetch(`${API_BASE_URL}/investments/allVipInvestment`, {
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to load data.');

        const data = await response.json();

        if (!data.vips || !Array.isArray(data.vips)) {
            throw new Error("VIP list missing from backend response");
        }

        let vipHTML = "";

        data.vips.forEach(plan => {
        vipHTML += `
        <div class="product-card-wc">
            <div class="product-image-wc">
                    <img src="${plan.image}" alt="${plan.name}"
                    onerror="this.src='https://placehold.co/300x200/1a1a1a/ffffff?text=Image+Error'">
            </div>
            <div class="product-info-wc">
                <h4>${plan.name}</h4>
<<<<<<< HEAD
                    <p><strong>Price:</strong> ₦${Number(plan.price).toLocaleString()}</p>
                    <p><strong>Total Return:</strong> ₦${Number(plan.total_returns).toLocaleString()}</p>
                    <p><strong>Duration:</strong> ${plan.duration_days} days</p>
                    <p style="font-size: 12px; color: #666;">
                        (Note: Additional 20% of your investment will be added after maturity)
                    </p>
                <button class="btn-invest" data-plan-id="${plan.id}">Invest</button>
=======
                <p><strong>Price:</strong> ₦${plan.price.toLocaleString()}</p>
                <p><strong>Total Return:</strong> ₦${plan.total_return.toLocaleString()}</p>
                <p><strong>Duration:</strong> ${plan.duration} days</p>
                
                <p style="font-size: 12px; color: #666;">(Daily Withdrawal Available)</p>
                
                <button class="btn-invest" data-plan-id="${itemId}" data-type="vip">Invest</button>
>>>>>>> origin/dev
            </div>
        </div>`;
    });

        const pageHTML = `
        <div class="page-container">
            <div class="page-header"><h2>VIP Promotions</h2></div>
            <div class="product-grid-wc">${vipHTML}</div>
        </div>`;

    appContent.innerHTML = pageHTML;

        document.querySelectorAll(".btn-invest").forEach(btn => {
            btn.addEventListener("click", () => {
                const planId = btn.getAttribute("data-plan-id");
                investInPlan(planId);
            });
        });

    } catch (error) {
        console.error('Error rendering VIP plans:', error);
        appContent.innerHTML = `<p style="text-align: center; color: red; margin-top: 50px;">Unable to load VIP plans.</p>`;
    }
};

//Investment plan ID
const investInPlan = async (planId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/investments/createVipInvestment/${planId}`, {
            method: "POST",
            credentials: "include"
        });

        const data = await response.json();
        console.log("Investment response:", data);

        if (data.success) {
            alert("Investment purchased successfully!");
            router(); 
        } else {
            alert(data.message || "Investment failed");
        }

    } catch (error) {
        console.error("Investment error:", error);
        alert("Error processing investment. Try again.");
    }
};

// --- 11. FIXED renderMePage (uses /users/balance) (OURS) ---
const renderMePage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Profile...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/user_profile`, { method: 'GET' });
        if (!response.ok) { throw new Error('Failed to load data.'); }
        // console.log('Response from /users/balance:', response);
        const data = await response.json();
        
        // Handle both data structures (user vs profile)
        const userData = data.user || data.profile || {};
        const referralCode = userData.referral_code || 'N/A';
        const email = userData.email || 'No email provided';
        const phone = userData.phone_number || 'No phone provided';
        const fullName = userData.full_name || 'User';

        const pageHTML = `
            <div class="page-container me-page">
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

                <!-- NEW: Standard Global Action List -->
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
            logoutUser(); 
        });
        
        document.getElementById('copyReferralBtn').addEventListener('click', handleCopyReferral);

    } catch (error) { 
        if (error.message && (error.message.includes('Promise') || error.message.includes('Authentication failed'))) { 
            console.log("Redirecting to login."); 
            return; 
        }
        appContent.innerHTML = `
            <div class="page-container" style="text-align: center; margin-top: 50px;">
                <p>Could not load profile. Please try again.</p>
                <a href="#" id="logoutButton" class="btn-auth" style="display: inline-block; margin-top: 20px;">Logout</a>
            </div>
        `;
        document.getElementById('logoutButton').addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser(); 
        });
    }
};

// --- 12. FIXED renderTaskPage (new Earnings Dashboard) (OURS) ---
const renderTaskPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Earnings...</p>';
    
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/earnings-summary`, { method: 'GET' });
        if (!response.ok) throw new Error('Failed to load earnings.');
        const data = await response.json();
        
        const earnings = {
            today: data.today || 0.00,
            yesterday: data.yesterday || 0.00,
            total: data.total || 0.00
        };

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

// --- 13. renderDepositPage (BABATUNDE'S + Our Fix) ---
const renderDepositPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading...</p>';

    let email, phone, userId;
    try {
        const userResponse = await fetchWithAuth(`${API_BASE_URL}/users/balance`, {
            method: 'GET'
        });
        if (!userResponse.ok) {
            throw new Error('Failed to load user data');
        }
        const userData = await userResponse.json();
        userId = userData.balance.id;
        email = userData.balance.email;
        phone = userData.balance.phone_number;
    } catch (e) {
        console.error("Failed to get user info:", e);
        alert("Your session is invalid. Please log in again.");
        logoutUser(); 
        return;
    }


    const pageHTML = `
        <div class="page-container">
            <div class="page-header"><h2>Deposit Funds</h2></div>
            <div class="withdraw-card">
                <form id="depositForm">
                    <div class="form-group">
                        <label for="amount">Amount (NGN)</label>
                        <input type="number" id="amount" min="1" step="0.01" required placeholder="Enter amount" />
                    </div>
                    <button type="submit" class="btn-auth">Proceed to Payment</button>
                </form>
            </div>
        </div>`;
    appContent.innerHTML = pageHTML;

    document.getElementById('depositForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        
        if (!amount || parseFloat(amount) <= 0) {
            return alert('Please enter a valid amount.');
        }

        try {
            console.log('[Deposit] Initializing payment...', { amount, email, phone, userId });
            
            const response = await fetchWithAuth(`${API_BASE_URL}/payment/initialize`, {
                method: 'POST',
                body: JSON.stringify({ 
                    userId,
                    amount: parseFloat(amount),
                    email,
                    name: phone || 'User'
                })
            });
            if (!response) return;

            console.log('[Deposit] Response status:', response.status);
            const result = await response.json();
            console.log('[Deposit] Response data:', result);
            
            if (!response.ok) {
                console.error('[Deposit] Error response:', result);
                return alert('Error: ' + result.message);
            }

            if (result.success && result.data && result.data.paymentLink) {
                console.log('[Deposit] Payment link received:', result.data.paymentLink);
                window.location.href = result.data.paymentLink;
            } else {
                console.error('[Deposit] Invalid response structure:', result);
                alert('Failed to get payment link. Check console for details.');
            }
        } catch (error) {
            if (error.message && error.message.includes('Promise')) { 
                console.log("Redirecting to login."); 
                return; 
            }
            console.error('[Deposit] Exception:', error);
            alert('An error occurred. Please check console and try again.');
        }
    });
};

// --- 14. renderHistoryPage (BABATUNDE'S + Our Fix) ---
const renderHistoryPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading History...</p>';

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/payment/history`, {
            method: 'GET'
        });

        if (!response.ok) throw new Error('Failed to load history.');

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message || 'Failed to load history.');
        }

        const transactions = data.transactions || [];
        let historyHTML = '';

        if (transactions.length === 0) {
            historyHTML = '<p style="text-align: center; color: var(--text-secondary);">No transaction history yet.</p>';
        } else {
            transactions.forEach(txn => {
                const date = new Date(txn.created_at).toLocaleString();
                const amount = Number(txn.amount).toLocaleString();
                // Sahil's audit mentioned 'type' might be missing. We add a fallback.
                const type = txn.type || 'transaction'; 
                const typeIcon = type === 'deposit' ? 'fa-arrow-down' : 'fa-arrow-up';
                const typeColor = type === 'deposit' ? 'var(--primary-color)' : '#ff5252';
                const statusBadge = txn.status === 'success' ? 'success' : txn.status === 'pending' ? 'pending' : 'failed';
                const statusColor = txn.status === 'success' ? '#4ade80' : txn.status === 'pending' ? '#fbbf24' : '#ff5252';

                historyHTML += `
                    <div class="history-item" data-transaction-id="${txn.id}" style="background: var(--card-background); border-radius: 1rem; padding: 1rem; margin-bottom: 1rem; border: 1px solid var(--border-color); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.3)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <i class="fas ${typeIcon}" style="color: ${typeColor}; font-size: 1.2rem;"></i>
                                <div>
                                    <p style="font-weight: 600; margin: 0; text-transform: capitalize;">${type.replace('_', ' ')}</p>
                                    <small style="color: var(--text-secondary);">${date}</small>
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <p style="font-weight: 700; font-size: 1.1rem; margin: 0; color: ${typeColor};">₦${amount}</p>
                                <span style="font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.25rem; background: ${statusColor}20; color: ${statusColor}; text-transform: capitalize;">${txn.status}</span>
                            </div>
                        </div>
                        <small style="color: var(--text-secondary);">Ref: ${txn.reference}</small>
                    </div>
                `;
            });
        }

        const pageHTML = `
            <div class="page-container">
                <div class="page-header">
                    <h2>Transaction History</h2>
                </div>
                <div style="margin-top: 1.5rem;">
                    ${historyHTML}
                </div>
            </div>
        `;
        
        appContent.innerHTML = pageHTML;
        
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const transactionId = item.dataset.transactionId;
                const transaction = transactions.find(t => t.id.toString() === transactionId);
                if (transaction) {
                    showTransactionDetails(transaction);
                }
            });
        });
    } catch (error) {
        if (error.message && error.message.includes('Promise')) { console.log("Redirecting to login."); return; }
        console.error('Error loading history:', error);
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load transaction history. Please try again.</p>';
    }
};

// --- 15. showTransactionDetails (BABATUNDE'S) ---
const showTransactionDetails = (transaction) => {
    const date = new Date(transaction.created_at).toLocaleString();
    const amount = Number(transaction.amount).toLocaleString();
    const type = transaction.type || 'transaction'; // Add fallback
    const typeIcon = type === 'deposit' ? 'fa-arrow-down' : 'fa-arrow-up';
    const typeColor = type === 'deposit' ? 'var(--primary-color)' : '#ff5252';
    const statusColor = transaction.status === 'success' ? '#4ade80' : transaction.status === 'pending' ? '#fbbf24' : '#ff5252';
    
    const bankDetails = transaction.bank_name || transaction.account_number || transaction.account_name;
    
    let detailsHTML = `
        <div style="text-align: left;">
            <div style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <i class="fas ${typeIcon}" style="color: ${typeColor}; font-size: 2rem;"></i>
                    <div>
                        <h3 style="margin: 0; text-transform: capitalize;">${type.replace('_', ' ')}</h3>
                        <span style="font-size: 0.85rem; padding: 0.4rem 0.8rem; border-radius: 0.5rem; background: ${statusColor}20; color: ${statusColor}; text-transform: capitalize; display: inline-block; margin-top: 0.5rem;">${transaction.status}</span>
                    </div>
                </div>
                <p style="font-size: 2rem; font-weight: 700; color: ${typeColor}; margin: 0;">₦${amount}</p>
            </div>
            
            <div style="display: grid; gap: 1rem;">
                <div>
                    <small style="color: var(--text-secondary); display: block; margin-bottom: 0.25rem;">Transaction ID</small>
                    <p style="margin: 0; font-weight: 600;">${transaction.id}</p>
                </div>
                
                <div>
                    <small style="color: var(--text-secondary); display: block; margin-bottom: 0.25rem;">Reference</small>
                    <p style="margin: 0; font-weight: 600;">${transaction.reference}</p>
                </div>
                
                <div>
                    <small style="color: var(--text-secondary); display: block; margin-bottom: 0.25rem;">Date & Time</small>
                    <p style="margin: 0; font-weight: 600;">${date}</p>
                </div>
                
                <div>
                    <small style="color: var(--text-secondary); display: block; margin-bottom: 0.25rem;">Type</small>
                    <p style="margin: 0; font-weight: 600; text-transform: capitalize;">${type.replace('_', ' ')}</p>
                </div>
                
                <div>
                    <small style="color: var(--text-secondary); display: block; margin-bottom: 0.25rem;">Status</small>
                    <p style="margin: 0; font-weight: 600; text-transform: capitalize; color: ${statusColor};">${transaction.status}</p>
                </div>
    `;
    
    if (bankDetails) {
        detailsHTML += `
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                    <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Bank Details</h4>
                    ${transaction.bank_name ? `
                    <div style="margin-bottom: 0.75rem;">
                        <small style="color: var(--text-secondary); display: block; margin-bottom: 0.25rem;">Bank Name</small>
                        <p style="margin: 0; font-weight: 600;">${transaction.bank_name}</p>
                    </div>
                    ` : ''}
                    ${transaction.account_number ? `
                    <div style="margin-bottom: 0.75rem;">
                        <small style="color: var(--text-secondary); display: block; margin-bottom: 0.25rem;">Account Number</small>
                        <p style="margin: 0; font-weight: 600;">${transaction.account_number}</p>
                    </div>
                    ` : ''}
                    ${transaction.account_name ? `
                    <div style="margin-bottom: 0.75rem;">
                        <small style="color: var(--text-secondary); display: block; margin-bottom: 0.25rem;">Account Name</small>
                        <p style="margin: 0; font-weight: 600;">${transaction.account_name}</p>
                    </div>
                    ` : ''}
                </div>
        `;
    }
    
    detailsHTML += `
            </div>
        </div>
    `;
    
    const modalHTML = `
        <div id="transactionDetailModal" class="modal-overlay" style="display: flex;">
            <div class="modal-content" style="max-width: 400px; width: 90%;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0;">Transaction Details</h2>
                    <button id="closeTransactionModal" style="background: none; border: none; color: var(--text-primary); font-size: 1.5rem; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">&times;</button>
                </div>
                ${detailsHTML}
                <button id="closeTransactionModalBtn" class="btn-cta" style="margin-top: 1.5rem; width: 100%;">Close</button>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('transactionDetailModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    document.getElementById('closeTransactionModal').addEventListener('click', () => {
        document.getElementById('transactionDetailModal').remove();
    });
    
    document.getElementById('closeTransactionModalBtn').addEventListener('click', () => {
        document.getElementById('transactionDetailModal').remove();
    });
    
    document.getElementById('transactionDetailModal').addEventListener('click', (e) => {
        if (e.target.id === 'transactionDetailModal') {
            e.target.remove();
        }
    });
};

// --- 16. renderWithdrawPage (BABATUNDE'S + Our Fix) ---
const renderWithdrawPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading...</p>';

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to load data.');
        const data = await response.json();
        const balance = data.balance?.balance || 0;
        
        const pageHTML = `
            <div class="page-container">
                <div class="page-header"><h2>Request Withdrawal</h2></div>
                <div class="withdraw-card">
                    <div class="balance-display">
                        <small>Available Balance</small>
                        <p>₦ ${Number(balance).toLocaleString()}</p>
                    </div>
                    <form id="withdrawForm">
                        <div class="form-group">
                            <label for="amount">Amount (NGN)</label>
                            <input type="number" id="amount" min="1" step="0.01" required placeholder="Enter amount" />
                        </div>
                        <div class="form-group">
                            <label for="bankName">Bank Name</label>
                            <input type="text" id="bankName" required placeholder="Enter bank name" />
                        </div>
                        <div class="form-group">
                            <label for="accountNumber">Account Number</label>
                            <input type="text" id="accountNumber" required placeholder="Enter account number" />
                        </div>
                        <div class="form-group">
                            <label for="accountName">Account Name</label>
                            <input type="text" id="accountName" required placeholder="Enter account name" />
                        </div>
                        <button type="submit" class="btn-auth">Submit Request</button>
                    </form>
                </div>
            </div>`;
        appContent.innerHTML = pageHTML;
        
        document.getElementById('withdrawForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const amount = parseFloat(document.getElementById('amount').value);
            const bankName = document.getElementById('bankName').value.trim();
            const accountNumber = document.getElementById('accountNumber').value.trim();
            const accountName = document.getElementById('accountName').value.trim();

            if (!amount || amount <= 0) {
                return alert('Please enter a valid amount.');
            }
            
            // --- TODO: We need the minimum withdrawal amount rule ---
            // if (amount < 800) {
            //     return alert('Minimum withdrawal is ₦800.');
            // }

            if (amount > balance) {
                return alert('Insufficient balance. Available: ₦' + balance.toLocaleString());
            }

            if (!confirm(`Request withdrawal of ₦${amount.toLocaleString()}?`)) return;

            try {
                const withdrawResponse = await fetchWithAuth(`${API_BASE_URL}/payment/withdraw`, {
                    method: 'POST',
                    body: JSON.stringify({
                        amount,
                        bank_name: bankName,
                        account_number: accountNumber,
                        account_name: accountName
                    })
                });
                if (!withdrawResponse) return;
                
                const result = await withdrawResponse.json();
                if (!withdrawResponse.ok) return alert('Error: ' + result.message);
                
                showSuccessModal(result.message || 'Withdrawal request submitted successfully!');
            } catch (error) {
                if (error.message && error.message.includes('Promise')) { console.log("Redirecting to login."); return; }
                alert('An error occurred. Please try again.');
            }
        });
    } catch (error) {
        if (error.message && error.message.includes('Promise')) { console.log("Redirecting to login."); return; }
        console.error('Error loading withdrawal page:', error);
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load page. Please try again.</p>';
    }
};

// --- NEW RENDER FUNCTIONS FOR LEGAL PAGES ---
const renderTermsPage = () => {
    bottomNav.style.display = 'none'; // Hide nav on legal pages
    appContent.innerHTML = `
        <div class="page-container legal-page" style="padding: 15px;">
            <div class="page-header" style="padding-bottom: 10px; border-bottom: 1px solid #eee;">
                <a href="${localStorage.getItem('authToken') ? '#me' : '#register'}" class="back-link" style="color: #6a0dad; text-decoration: none; font-weight: bold;">&larr; Back</a>
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
                <a href="${localStorage.getItem('authToken') ? '#me' : '#register'}" class="back-link" style="color: #6a0dad; text-decoration: none; font-weight: bold;">&larr; Back</a>
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

// --- NEW PLACEHOLDER RENDER FUNCTIONS ---
// Note: renderHistoryPage is already defined above (line 777)

const renderTeamPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Team Data...</p>';
    
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/referrals`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to load team data');
        }

        const data = await response.json();
        const teamCount = data.team_count || 0;
        const totalCommission = data.total_commission || 0;
        const teamList = data.team_list || [];

        let teamListHTML = '';
        if (teamList.length === 0) {
            teamListHTML = `
                <div class="placeholder-content" style="text-align: center; padding: 40px 20px;">
                    <i class="fas fa-users" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                    <p>No team members yet. Share your referral code to start earning!</p>
                </div>
            `;
        } else {
            teamListHTML = `
                <div style="margin: 20px 0;">
                    <h4 style="margin-bottom: 15px;">Team Members (${teamCount})</h4>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        ${teamList.map(member => `
                            <div style="padding: 15px; background: #f9f9f9; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong>${member.name}</strong>
                                    <p style="margin: 5px 0; font-size: 14px; color: #666;">
                                        ${member.phone} • Joined: ${new Date(member.joined_date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div style="text-align: right;">
                                    <p style="margin: 0; font-size: 14px; color: #666;">Balance</p>
                                    <strong>₦${Number(member.balance).toLocaleString()}</strong>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        const pageHTML = `
        <div class="page-container">
            <div class="page-header"><h2>My Team</h2></div>
                
                <div class="info-card" style="margin: 20px; padding: 20px; background: linear-gradient(135deg, #6a0dad 0%, #8b2fd6 100%); border-radius: 12px; color: white;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <div>
                            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Total Commission Earned</p>
                            <h2 style="margin: 5px 0;">₦${Number(totalCommission).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        </div>
                        <div style="text-align: right;">
                            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Team Members</p>
                            <h2 style="margin: 5px 0;">${teamCount}</h2>
                        </div>
                    </div>
                </div>

                ${teamListHTML}

                <div class="info-card" style="margin: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                    <h4 style="margin-top: 0;">Referral Commission</h4>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li>Level A: 6%</li>
                        <li>Level B: 2%</li>
                        <li>Level C: 1%</li>
                    </ul>
                    <h4>Team Commission (Daily)</h4>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li>Level A: 5% Daily</li>
                        <li>Level B: 3% Daily</li>
                        <li>Level C: 2% Daily</li>
                    </ul>
                </div>
            </div>
        `;
        
        appContent.innerHTML = pageHTML;
    } catch (error) {
        console.error('Error loading team data:', error);
        appContent.innerHTML = `
            <div class="page-container">
                <div class="page-header"><h2>My Team</h2></div>
                <div style="text-align: center; padding: 40px 20px; color: #dc3545;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i>
                    <p>Failed to load team data. Please try again later.</p>
            </div>
        </div>
    `;
    }
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
    document.getElementById('changePasswordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Password change feature is in development.');
    });
};
const renderSupportPage = () => {
    appContent.innerHTML = `
        <div class="page-container">
            <div class="page-header"><h2>Customer Support</h2></div>
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

// --- 18. NEW Certificate Page ---
const renderCertificatePage = () => {
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

// --- 19. NEW LEGAL PAGES (OURS) ---
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

// --- 20. FINAL, MERGED ROUTER (OURS + BABATUNDE'S) ---
// Note: renderTermsPage is already defined above (line 1070)
// Note: renderPrivacyPolicyPage is already defined above (line 1157)
const router = () => {
    const hash = window.location.hash || '#home';
    
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

    bottomNav.style.display = 'flex';

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#home' && (hash === '#home' || hash === '')) {
            link.classList.add('active');
        } 
        else if (link.getAttribute('href') === hash) { 
            link.classList.add('active'); 
        }
        else if (link.getAttribute('href') === '#me' && ['#history', '#team', '#settings', '#about', '#support'].includes(hash)) {
            link.classList.add('active');
        }
    });
    
    switch (hash) {
        case '#home': renderHomeScreen(); break;
        case '#products': renderProductsPage(); break;
        case '#vip': renderVipPage(); break;
        case '#me': renderMePage(); break;
        case '#task': renderTaskPage(); break;
        
        case '#deposit': renderDepositPage(); break;
        case '#withdraw': renderWithdrawPage(); break;
        case '#history': renderHistoryPage(); break;
        case '#team': renderTeamPage(); break;
        case '#settings': renderSettingsPage(); break;
        case '#about': renderAboutPage(); break;
        case '#support': renderSupportPage(); break;
        case '#rewards': renderRewardsPage(); break;
        case '#certificate': renderCertificatePage(); break;

        default: 
            renderHomeScreen();
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



