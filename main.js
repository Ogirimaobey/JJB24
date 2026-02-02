// ==========================================
// 1. CONFIGURATION & STYLING INJECTION (WORLD-CLASS UI)
// ==========================================

const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    :root {
        --glass-bg: rgba(255, 255, 255, 0.9);
        --glass-border: rgba(255, 255, 255, 0.4);
        --accent-primary: #8B5CF6; /* Electric Violet */
        --accent-success: #10B981; /* Emerald */
        --accent-danger: #EF4444;  /* Rose */
        --bg-main: #F8FAFC;        /* Slate 50 */
        --text-dark: #0F172A;      /* Slate 900 */
        --card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
    }

    body { font-family: 'Plus Jakarta Sans', sans-serif !important; background: var(--bg-main); color: var(--text-dark); margin: 0; }

    /* MODERN GLASS MODAL */
    #whatsappModal, #successModal {
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        justify-content: center; align-items: center;
        backdrop-filter: blur(12px); background: rgba(15, 23, 42, 0.7);
        z-index: 99999;
    }

    .modal-content {
        background: white; padding: 40px 30px; border-radius: 32px;
        text-align: center; max-width: 340px; width: 88%;
        box-shadow: 0 30px 60px -12px rgba(0,0,0,0.25);
        animation: springIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes springIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    /* PREMIUM ACTION BUTTONS */
    .btn-deposit, .btn-withdraw, .btn-invest-premium, .btn-auth {
        border: none !important; border-radius: 18px !important;
        font-weight: 700 !important; letter-spacing: -0.2px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex; align-items: center; justify-content: center; gap: 8px;
    }

    .btn-deposit { background: var(--accent-success) !important; color: white !important; box-shadow: 0 12px 24px -6px rgba(16, 185, 129, 0.3) !important; }
    .btn-withdraw { background: #1E293B !important; color: white !important; box-shadow: 0 12px 24px -6px rgba(30, 41, 59, 0.2) !important; }
    
    .btn-deposit:active, .btn-withdraw:active { transform: scale(0.95); }

    /* HIGH-END PRODUCT CARDS */
    .product-grid-wc { display: flex; flex-direction: column; gap: 20px; padding: 15px; }

    .product-card-wc {
        background: white; border-radius: 28px; overflow: hidden;
        border: 1px solid var(--glass-border); box-shadow: var(--card-shadow);
        transition: transform 0.3s ease;
    }

    .product-image-wc { height: 160px; position: relative; overflow: hidden; }
    .product-image-wc img { width: 100%; height: 100%; object-fit: cover; }
    
    .card-badge {
        position: absolute; top: 15px; left: 15px;
        background: rgba(255, 255, 255, 0.95); color: var(--text-dark);
        padding: 6px 14px; border-radius: 12px; font-size: 11px; font-weight: 800;
        backdrop-filter: blur(4px); box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .product-info-wc { padding: 24px; }
    .product-title { font-size: 20px; font-weight: 800; margin-bottom: 18px; color: var(--text-dark); }

    .product-stats {
        display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        margin-bottom: 20px;
    }

    .stat-item { background: #F1F5F9; padding: 14px; border-radius: 18px; }
    .stat-label { font-size: 10px; color: #64748B; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; display: block; }
    .stat-value { font-size: 14px; font-weight: 800; color: var(--text-dark); }
    .stat-value.price { color: var(--accent-success); }

    /* APP HEADER & BALANCE */
    .top-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; }
    .user-greeting h4 { margin: 0; font-size: 18px; font-weight: 800; }
    .user-greeting p { margin: 0; font-size: 12px; color: #64748B; }

    .balance-card {
        background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
        margin: 0 20px 25px; padding: 30px; border-radius: 32px;
        color: white; position: relative; overflow: hidden;
        box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.3);
    }

    .balance-card::before {
        content: ""; position: absolute; top: -50%; right: -20%; width: 200px; height: 200px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
    }

    .balance-card small { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6; font-weight: 600; }
    .balance-card h2 { font-size: 36px; font-weight: 800; margin: 10px 0 25px; letter-spacing: -1px; }

    /* QUICK ACTIONS GRID */
    .quick-actions {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 0 20px 25px;
    }

    .action-button {
        background: white; border-radius: 22px; padding: 18px 10px;
        display: flex; flex-direction: column; align-items: center; gap: 10px;
        text-decoration: none; box-shadow: var(--card-shadow); border: 1px solid var(--glass-border);
    }

    .action-button i { font-size: 20px; color: var(--accent-primary); }
    .action-button span { font-size: 11px; font-weight: 700; color: #475569; }

    /* LIST ITEMS */
    .activity-card { margin: 0 20px; background: white; border-radius: 32px; padding: 24px; box-shadow: var(--card-shadow); }
    .activity-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #F1F5F9; }
    .activity-item:last-child { border: none; }

    /* AUTH SCREEN */
    .auth-container { padding: 40px 25px; text-align: center; }
    .auth-logo { font-size: 32px; font-weight: 900; color: var(--accent-primary); margin-bottom: 40px; letter-spacing: -1px; }
    .form-group { text-align: left; margin-bottom: 20px; }
    .form-group label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 8px; color: #475569; }
    .form-group input, .security-input {
        width: 100%; padding: 16px; border-radius: 18px; border: 1px solid #E2E8F0;
        background: #F8FAFC; font-size: 15px; transition: all 0.3s;
    }
    .form-group input:focus { border-color: var(--accent-primary); outline: none; background: white; }

    /* BOTTOM NAV */
    .bottom-nav {
        position: fixed; bottom: 0; left: 0; width: 100%; height: 75px;
        background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px);
        display: flex; justify-content: space-around; align-items: center;
        border-top: 1px solid #E2E8F0; z-index: 1000; padding-bottom: 15px;
    }
    .nav-link { text-decoration: none; color: #94A3B8; display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .nav-link.active { color: var(--accent-primary); }
    .nav-link i { font-size: 20px; }
    .nav-link span { font-size: 10px; font-weight: 700; }
`;
document.head.appendChild(styleSheet);

// 

// Inject WhatsApp Modal Structure
const announcementDiv = document.createElement("div");
announcementDiv.id = "whatsappModal";
announcementDiv.innerHTML = `
    <div class="modal-content">
        <div style="width: 70px; height: 70px; background: #DCFCE7; border-radius: 24px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <i class="fab fa-whatsapp" style="font-size: 35px; color: #25D366;"></i>
        </div>
        <h3 style="margin: 0 0 10px; color: #0F172A; font-weight: 800;">Official Community</h3>
        <p style="color: #64748B; font-size: 14px; line-height: 1.5; margin-bottom: 25px;">Join 5,000+ members receiving real-time yield updates and priority support.</p>
        <a href="https://chat.whatsapp.com/Dw76vw5BJ68FONRPd6GPUi" target="_blank" onclick="closeWhatsappModal()" class="btn-whatsapp" style="background: #25D366; color: white !important; font-weight: 700; padding: 18px; border-radius: 18px; text-decoration: none; display: block; box-shadow: 0 10px 20px -5px rgba(37, 211, 102, 0.4);">ENTER COMMUNITY</a>
        <button onclick="closeWhatsappModal()" style="background:none; border:none; color:#94A3B8; margin-top:20px; cursor:pointer; font-size:12px; font-weight:600;">Maybe later / Already joined</button>
    </div>
`;
document.body.appendChild(announcementDiv);

const successModalDiv = document.createElement("div");
successModalDiv.id = "successModal";
successModalDiv.innerHTML = `
    <div class="modal-content">
        <div id="modalMessage"></div>
        <button id="closeModalBtn" style="width:100%; margin-top:25px; padding:16px; background: var(--text-dark); color:white; border:none; border-radius:18px; font-weight:800;">CONTINUE</button>
    </div>
`;
document.body.appendChild(successModalDiv);

window.closeWhatsappModal = () => {
    localStorage.setItem('jjb_community_joined', 'true');
    document.getElementById('whatsappModal').style.display = 'none';
};

// ==========================================
// 2. DATA CONFIGURATION
// ==========================================
const vipProducts = [
    { id: 101, name: 'CELLAR PRESTIGE VIP 1', price: 500000, total_return: 600000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=PRESTIGE+1' },
    { id: 102, name: 'CELLAR PRESTIGE VIP 2', price: 1000000, total_return: 1200000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=PRESTIGE+2' },
    { id: 103, name: 'CELLAR PRESTIGE VIP 3', price: 2000000, total_return: 2400000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=PRESTIGE+3' },
    { id: 104, name: 'CELLAR PRESTIGE VIP 4', price: 3000000, total_return: 3600000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=PRESTIGE+4' }
];

const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');

const API_BASE_URL = 'https://jjb24-backend-1.onrender.com/api';

// ==========================================
// 3. HELPER FUNCTIONS
// ==========================================

const showSuccessModal = (message) => {
    const successModal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');
    if (modalMessage) modalMessage.innerHTML = `
        <div style="width: 60px; height: 60px; background: #DCFCE7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <i class="fas fa-check" style="font-size: 24px; color: #10B981;"></i>
        </div>
        <span style="font-size: 18px; font-weight: 800; color: #0F172A;">Success</span>
        <p style="color: #64748B; margin-top: 10px; font-size: 14px;">${message}</p>`;
    if (successModal) successModal.style.display = 'flex';
};

const closeModal = () => {
    const successModal = document.getElementById('successModal');
    if (successModal) successModal.style.display = 'none';
    if (window.location.hash !== '#home') { window.location.hash = '#home'; } else { router(); }
};

window.copyReferralLink = async (referralCode) => {
    if (!referralCode || referralCode === 'N/A') { alert('No referral code available.'); return; }
    const fullLink = `${window.location.origin}/#register?ref=${referralCode}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try { await navigator.clipboard.writeText(fullLink); showSuccessModal('Link copied to clipboard'); return; } catch (err) { }
    }
    prompt("Copy your referral link:", fullLink);
};

window.copyAccountNumber = (accNumber) => {
    navigator.clipboard.writeText(accNumber).then(() => {
        const copyBtn = document.getElementById('copyAccBtn');
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "COPIED";
        copyBtn.style.background = "#10B981";
        copyBtn.style.color = "white";
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.background = "rgba(16, 185, 129, 0.1)";
            copyBtn.style.color = "#10B981";
        }, 2000);
    }).catch(err => {
        alert("Account number: " + accNumber);
    });
};

const getReferralFromUrl = () => {
    const fullHash = window.location.hash;
    if (fullHash.includes('?ref=')) { const parts = fullHash.split('?ref='); if (parts.length > 1) return parts[1].split('&')[0]; }
    return '';
};

const logoutUser = () => { 
    localStorage.removeItem('token'); 
    localStorage.removeItem('user_email');
    window.location.hash = '#login'; 
    router(); 
};
window.logoutUser = logoutUser;

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = new Headers(options.headers || {});
    if (token) headers.append('Authorization', `Bearer ${token}`);
    
    const isFormData = options.body instanceof FormData;
    if (!isFormData && !headers.has('Content-Type') && options.body) {
        headers.append('Content-Type', 'application/json');
    }

    try {
        const response = await fetch(url, { ...options, headers });
        if (response.status === 401) { logoutUser(); return null; }
        return response;
    } catch (e) { 
        console.error("Network Error Details:", e); 
        throw e; 
    }
};

const getReferralCardHTML = (code) => {
    return `
    <div style="background: white; border-radius: 28px; padding: 25px; margin-bottom: 25px; box-shadow: var(--card-shadow); border: 1px dashed var(--accent-primary);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
            <div style="width: 40px; height: 40px; background: #F5F3FF; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent-primary);">
                <i class="fas fa-gift"></i>
            </div>
            <div>
                <small style="color: #64748B; font-weight: 700; font-size: 10px; text-transform: uppercase;">Your Invitation Code</small>
                <div style="font-weight: 800; font-size: 18px; color: var(--text-dark);">${code}</div>
            </div>
        </div>
        <button onclick="window.copyReferralLink('${code}')" class="btn-deposit" style="width: 100%; padding: 14px; background: var(--accent-primary) !important; box-shadow: none !important;">COPY INVITE LINK</button>
    </div>`;
};

// ==========================================
// 4. ACTION HANDLERS
// ==========================================

const handleLogin = async (event) => {
    event.preventDefault();
    const id = document.getElementById('loginIdentifier').value.trim();
    const pass = document.getElementById('password').value;
    if (!id || !pass) return alert('Please provide email/phone and password.');

    const loginData = { password: pass };
    if (id.includes('@')) {
        loginData.email = id;
    } else {
        loginData.phone = id;
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
        localStorage.setItem('user_email', result.user?.email || (id.includes('@') ? id : ''));
        window.location.hash = '#home'; 
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
    const agreedToTerms = document.getElementById('termsCheckbox').checked;
    if (!agreedToTerms) return alert('You must agree to the Terms & Conditions.');
    if (!fullName || !email || !phone || !password) return alert('Please fill in all required fields.');
    if (password !== cpassword) return alert('Passwords do not match.');
    try {
        const payload = { fullName, phone, email, password, referralCode: referral || undefined };
        const response = await fetch(`${API_BASE_URL}/users/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        alert(`OTP sent to ${email}. Check your inbox.`); renderOTPVerificationScreen(email);
    } catch (error) { alert('Could not connect to server.'); }
};

const handleOTPVerification = async (event, email) => {
    event.preventDefault(); const otpCode = document.getElementById('otpCode').value;
    try {
        const response = await fetch(`${API_BASE_URL}/users/verify-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp: otpCode }) });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        showSuccessModal('Phone verified!'); renderLoginScreen();
    } catch (error) { alert('Verification failed.'); }
};

const handleResendOTP = async (email) => { 
    try {
        const response = await fetch(`${API_BASE_URL}/users/resend-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email }) });
        const result = await response.json(); if (!response.ok) return alert(`Error: ${result.message}`); alert('New OTP sent!');
    } catch (error) { alert('Failed to resend OTP.'); }
};

const handleInvestClick = async (event) => {
    if (event.target.classList.contains('btn-invest-premium') || event.target.classList.contains('btn-invest')) {
        const rawItemId = event.target.dataset.planId;
        const investType = event.target.dataset.type;
        let itemId = Number(rawItemId);
        if (isNaN(itemId) || itemId <= 0) return alert('Error: Invalid product ID.');
        const token = localStorage.getItem('token'); if (!token) { logoutUser(); return; }
        if (!confirm(`Confirm activation for this plan?`)) return;
        
        let endpoint = investType === 'vip' ? `${API_BASE_URL}/investments/createVipInvestment/${itemId}` : `${API_BASE_URL}/investments/createInvestment/${itemId}`;

        try {
            const response = await fetchWithAuth(endpoint, { method: 'POST' });
            const result = await response.json();
            if (response && response.ok && result.success) {
                showSuccessModal('Portfolio updated! Plan is now active.');
                setTimeout(() => { window.location.hash = '#home'; router(); }, 2000);
            } else { alert('Error: ' + ((result && result.message) || 'Action failed.')); }
        } catch (error) { alert('Action error.'); }
    }
};

window.handleForgotPassword = async () => {
    const email = prompt("Enter your registered email address:");
    if (!email) return;
    try {
        const response = await fetch(`${API_BASE_URL}/users/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const result = await response.json();
        if (response.ok) {
            alert("A temporary password has been sent to your email.");
        } else {
            alert("Error: " + result.message);
        }
    } catch (e) {
        alert("Server error.");
    }
};

// ==========================================
// 5. RENDER FUNCTIONS (MOBILE-FIRST PREMIUM)
// ==========================================

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
        <div class="auth-container">
            <div class="auth-logo">JJB24</div>
            <h2 style="font-weight: 800; letter-spacing: -0.5px; margin-bottom: 10px;">Welcome Back</h2>
            <p style="color: #64748B; font-size: 14px; margin-bottom: 35px;">Sign in to manage your winery assets</p>
            <form id="loginForm">
                <div class="form-group">
                    <label>Account ID</label>
                    <input type="text" id="loginIdentifier" placeholder="Email or Phone number" required />
                </div>
                <div class="form-group">
                    <label>Secure Password</label>
                    <input type="password" id="password" placeholder="••••••••" required />
                </div>
                <div style="text-align: right; margin-top: -5px; margin-bottom: 30px;">
                    <a href="javascript:void(0)" onclick="handleForgotPassword()" style="color: var(--accent-primary); font-size: 12px; text-decoration: none; font-weight: 700;">Reset Password</a>
                </div>
                <button type="submit" class="btn-auth" style="width:100%; padding:18px; background: var(--accent-primary); color:white; font-size:16px;">SECURE LOGIN</button>
            </form>
            <p style="margin-top: 30px; font-size: 14px; color: #64748B;">New member? <a href="#register" style="color: var(--accent-primary); text-decoration: none; font-weight: 700;">Join now</a></p>
        </div>`;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
};

const renderRegisterScreen = () => {
    bottomNav.style.display = 'none';
    const autoRefCode = getReferralFromUrl();
    appContent.innerHTML = `
    <div class="auth-container">
        <div class="auth-logo">JJB24</div>
        <h2 style="font-weight: 800; margin-bottom: 10px;">Join the Community</h2>
        <p style="color: #64748B; font-size: 14px; margin-bottom: 35px;">Start building your premium wine portfolio</p>
        <form id="registerForm">
            <div class="form-group"><label>Full Name</label><input type="text" id="fullName" placeholder="Legal Name" required /></div>
            <div class="form-group"><label>Email Address</label><input type="email" id="email" placeholder="name@email.com" required /></div>
            <div class="form-group"><label>Phone Number</label><input type="tel" id="phone" placeholder="080 0000 0000" required /></div>
            <div class="form-group"><label>Password</label><input type="password" id="password" placeholder="Min 6 characters" required /></div>
            <div class="form-group"><label>Confirm</label><input type="password" id="cpassword" placeholder="Repeat password" required /></div>
            <div class="form-group"><label>Referral Code</label><input type="text" id="referral" value="${autoRefCode}" ${autoRefCode ? 'readonly' : ''} /></div>
            <div style="display: flex; gap: 10px; margin: 25px 0; text-align: left; align-items: center;">
                <input type="checkbox" id="termsCheckbox" required style="width: 20px; height: 20px; border-radius: 6px;" />
                <label for="termsCheckbox" style="font-size: 11px; color: #64748B; font-weight: 500; margin: 0;">I accept the Investment Terms & Data Privacy Policy.</label>
            </div>
            <button type="submit" class="btn-auth" style="width:100%; padding:18px; background: var(--accent-primary); color:white; font-size:16px;">CREATE ACCOUNT</button>
        </form>
        <p style="margin-top: 25px; font-size: 14px; color: #64748B;">Member already? <a href="#login" style="color: var(--accent-primary); text-decoration: none; font-weight: 700;">Log in</a></p>
    </div>`;
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

const renderOTPVerificationScreen = (email) => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
    <div class="auth-container">
        <div class="auth-logo">JJB24</div>
        <h2 style="font-weight: 800;">Verify ID</h2>
        <p style="color: #64748B; margin-bottom: 30px;">Input the 6-digit code sent to<br><b>${email}</b></p>
        <form id="otpForm">
            <div class="form-group">
                <input type="text" id="otpCode" maxlength="6" style="text-align: center; font-size: 24px; letter-spacing: 8px; font-weight: 800;" placeholder="000000" required />
            </div>
            <button type="submit" class="btn-auth" style="width:100%; padding:18px; background: var(--text-dark); color:white;">VERIFY ACCOUNT</button>
        </form>
        <p style="margin-top: 30px;"><a id="resendOTP" style="cursor: pointer; color: var(--accent-primary); font-weight: 700; font-size: 14px;">Resend Code</a></p>
    </div>`;
    document.getElementById('otpForm').addEventListener('submit', (e) => handleOTPVerification(e, email));
    document.getElementById('resendOTP').addEventListener('click', () => handleResendOTP(email)); 
};

const renderHomeScreen = async () => {
    if (!localStorage.getItem('jjb_community_joined')) {
        setTimeout(() => { document.getElementById('whatsappModal').style.display = 'flex'; }, 2000);
    }
    appContent.innerHTML = '<div style="display:flex; height:50vh; align-items:center; justify-content:center; color:#64748B;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    const token = localStorage.getItem('token'); if (!token) { logoutUser(); return; }
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`, { method: "GET" });
        if (!response || !response.ok) throw new Error();
        const data = await response.json();
        const userObj = data.balance || {};
        const fullName = userObj.full_name || 'User'; 
        const balance = userObj.balance || 0;
        const userEmail = userObj.email || localStorage.getItem('user_email');
        
        let complianceCardHTML = '';
        if (userEmail === 'audit@flutterwave.com') {
            complianceCardHTML = `
                <div id="compliance-card" style="background: white; border-radius: 28px; padding: 25px; margin: 0 20px 25px; box-shadow: var(--card-shadow); border-left: 6px solid #F59E0B;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px; gap: 12px;">
                        <i class="fas fa-shield-check" style="color: #F59E0B; font-size: 20px;"></i>
                        <h3 style="margin: 0; font-size: 14px; font-weight: 800; text-transform: uppercase;">Compliance Review</h3>
                    </div>
                    <div style="font-size: 13px; color: #475569; line-height: 1.6;">
                        <p style="margin: 0 0 10px;"><b>CAC Address:</b> Monaya Rd, Ogoja 550101, Cross River.</p>
                        <p style="margin: 0;"><b>Lines:</b> +234 704 759 1968, +234 911 412 9537</p>
                    </div>
                </div>
            `;
        }

        let activityHTML = "<p style='color:#94A3B8; text-align:center; font-size:12px; padding: 20px;'>Clean History</p>";
        try {
            const histRes = await fetchWithAuth(`${API_BASE_URL}/payment/history`, { method: 'GET' });
            if (histRes && histRes.ok) {
                const histData = await histRes.json();
                if (histData.success && histData.transactions.length > 0) {
                    activityHTML = histData.transactions.slice(0, 4).map(txn => `
                        <div class="activity-item">
                            <div>
                                <div style="font-weight: 700; font-size: 13px; text-transform: capitalize;">${txn.type.replace(/_/g, ' ')}</div>
                                <small style="color: #94A3B8; font-size: 10px;">${new Date(txn.created_at).toLocaleDateString()}</small>
                            </div>
                            <div style="color:${txn.amount > 0 ? '#10B981' : '#0F172A'}; font-weight: 800; font-size: 15px;">
                                ${txn.amount > 0 ? '+' : ''}₦${Number(Math.abs(txn.amount)).toLocaleString()}
                            </div>
                        </div>`).join('');
                }
            }
        } catch(e) {}

        appContent.innerHTML = `
            <div class="top-header">
                <div class="user-greeting">
                    <h4>Hi, ${fullName.split(' ')[0]}</h4>
                    <p>Exclusive Member</p>
                </div>
                <div style="width: 44px; height: 44px; background: white; border-radius: 14px; display: flex; align-items: center; justify-content: center; box-shadow: var(--card-shadow);">
                    <i class="fas fa-bell" style="color: #64748B;"></i>
                </div>
            </div>

            ${complianceCardHTML}
            
            <div class="balance-card">
                <small>Total Net Assets</small>
                <h2>₦ ${Number(balance).toLocaleString()}</h2>
                <div style="display: flex; gap: 12px;">
                    <a href="#deposit" class="btn-deposit" style="flex: 1; padding: 15px; font-size: 13px; text-decoration:none;">FUND WALLET</a>
                    <a href="#withdraw" class="btn-withdraw" style="flex: 1; padding: 15px; font-size: 13px; text-decoration:none;">WITHDRAW</a>
                </div>
            </div>
            
            <div class="quick-actions">
                <a href="#my-plans" class="action-button"><i class="fas fa-vault"></i><span>Assets</span></a>
                <a href="#team" class="action-button"><i class="fas fa-users-crown"></i><span>Team</span></a>
                <a href="#history" class="action-button"><i class="fas fa-receipt"></i><span>Logs</span></a>
                <a href="#rewards" class="action-button"><i class="fas fa-sparkles"></i><span>Rewards</span></a>
                <a href="#support" class="action-button"><i class="fas fa-headset"></i><span>Help</span></a>
                <a href="#certificate" class="action-button"><i class="fas fa-stamp"></i><span>Legal</span></a>
            </div>

            <div class="activity-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h3 style="margin:0; font-size: 16px; font-weight: 800;">Recent Stream</h3>
                    <a href="#history" style="font-size: 11px; font-weight: 700; color: var(--accent-primary); text-decoration: none;">VIEW ALL</a>
                </div>
                <div class="activity-list">${activityHTML}</div>
            </div>
            <div style="height: 100px;"></div>`;
    } catch (error) { logoutUser(); }
};

const renderProductsPage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; align-items:center; justify-content:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/allItems`, { method: 'GET' });
        if (!response || !response.ok) throw new Error();
        const data = await response.json();
        let productHTML = ''; const items = data.items || [];
        if (items.length === 0) productHTML = '<p style="text-align:center; padding: 40px; color:#64748B;">Plans coming soon.</p>';
        else {
            items.forEach(item => {
                productHTML += `
                <div class="product-card-wc">
                    <div class="product-image-wc">
                        <span class="card-badge">COLLECTION 2024</span>
                        <img src="${item.itemimage}" onerror="this.src='https://placehold.co/400x300/1e293b/ffffff?text=Premium+Wine'">
                    </div>
                    <div class="product-info-wc">
                        <h4 class="product-title">${item.itemname}</h4>
                        <div class="product-stats">
                            <div class="stat-item"><span class="stat-label">Entry Price</span><span class="stat-value price">₦${Number(item.price).toLocaleString()}</span></div>
                            <div class="stat-item"><span class="stat-label">Daily Yield</span><span class="stat-value" style="color: var(--accent-primary);">₦${Number(item.dailyincome).toLocaleString()}</span></div>
                            <div class="stat-item"><span class="stat-label">Maturity</span><span class="stat-value">${item.duration} Days</span></div>
                            <div class="stat-item"><span class="stat-label">Liquidity</span><span class="stat-value">Instant</span></div>
                        </div>
                        <button class="btn-invest-premium" data-plan-id="${item.id}" data-type="regular" style="width: 100%; padding: 18px; background: var(--text-dark); color: white;">ACQUIRE ASSET</button>
                    </div>
                </div>`;
            });
        }
        appContent.innerHTML = `
            <div style="padding: 20px 20px 100px;">
                <h2 style="font-weight: 800; font-size: 24px; margin-bottom: 25px;">Available Collections</h2>
                <div class="product-grid-wc" style="padding: 0;">${productHTML}</div>
            </div>`;
    } catch (e) { appContent.innerHTML = '<p style="text-align:center; padding: 50px;">Sync Error.</p>'; }
};

const renderVipPage = () => {
    let vipHTML = '';
    const products = (typeof vipProducts !== 'undefined') ? vipProducts : [];
    products.forEach(plan => {
        vipHTML += `
        <div class="product-card-wc" style="border: 2px solid #EAB308;">
            <div class="product-image-wc">
                <span class="card-badge" style="background: #EAB308; color: #000;">PREMIUM VIP</span>
                <img src="${plan.itemimage}">
            </div>
            <div class="product-info-wc">
                <h4 class="product-title" style="color: #854D0E;">${plan.name}</h4>
                <div class="product-stats" style="background: #FEFCE8;">
                    <div class="stat-item" style="background: transparent;"><span class="stat-label">Commitment</span><span class="stat-value" style="color: #854D0E;">₦${plan.price.toLocaleString()}</span></div>
                    <div class="stat-item" style="background: transparent;"><span class="stat-label">Forecast</span><span class="stat-value" style="color: #854D0E;">₦${plan.total_return.toLocaleString()}</span></div>
                </div>
                <button class="btn-invest-premium" data-plan-id="${plan.id}" data-type="vip" style="width:100%; padding:18px; background: #EAB308; color: black;">CLAIM VIP SLOT</button>
            </div>
        </div>`;
    });
    appContent.innerHTML = `
        <div style="padding: 20px 20px 100px;">
            <h2 style="font-weight: 800; font-size: 24px; margin-bottom: 25px;">VIP Private Cellar</h2>
            <div class="product-grid-wc" style="padding: 0;">${vipHTML}</div>
        </div>`;
};

const renderTeamPage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    let refCode = 'N/A';
    try {
        const userRes = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        const userData = await userRes.json();
        refCode = userData.balance?.own_referral_code || 'N/A';
    } catch(e) {}

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/referrals`, { method: 'GET' });
        const data = await response.json();
        const teamMembers = data.team_list || [];
        const totalCommission = data.total_commission || 0; 

        let teamHTML = teamMembers.length === 0 ? 
            `<div style="text-align: center; padding: 40px;"><p style="color: #94A3B8; font-size: 14px;">No community referrals yet.</p></div>` :
            teamMembers.map(member => `
                <div style="background: white; padding: 18px; border-radius: 20px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--card-shadow);">
                    <div>
                        <div style="font-weight: 700; font-size: 14px; color: var(--text-dark);">${member.name || 'Anonymous Member'}</div>
                        <small style="color: #94A3B8; font-size: 11px;">Joined ${new Date(member.joined_date).toLocaleDateString()}</small>
                    </div>
                    <div style="background: #DCFCE7; color: #10B981; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 8px;">ACTIVE</div>
                </div>`).join('');

        appContent.innerHTML = `
            <div style="padding: 20px 20px 100px;">
                <h2 style="font-weight: 800; font-size: 24px; margin-bottom: 25px;">My Community</h2>
                ${getReferralCardHTML(refCode)}
                <div style="background: var(--text-dark); color: white; padding: 25px; border-radius: 28px; margin-bottom: 30px; text-align: center; position: relative;">
                    <small style="opacity: 0.6; font-size: 10px; text-transform: uppercase;">Direct Referral Rewards</small>
                    <h2 style="font-size: 32px; margin: 5px 0 0 0;">₦ ${Number(totalCommission).toLocaleString()}</h2>
                </div>
                <h4 style="font-weight: 800; color: #64748B; font-size: 12px; text-transform: uppercase; margin-bottom: 15px;">Network Members (${data.team_count || 0})</h4>
                ${teamHTML}
            </div>`;
    } catch (error) { appContent.innerHTML = '<p style="padding:50px;">Error syncing team.</p>'; }
};

const renderChangePasswordPage = async () => {
    appContent.innerHTML = `
        <div style="padding: 20px;">
            <h2 style="font-weight: 800; margin-bottom: 25px;">Security Control</h2>
            <div style="background:white; padding:30px; border-radius:28px; box-shadow: var(--card-shadow);">
                <form id="changePasswordForm">
                    <div class="form-group"><label>Current Password</label><input type="password" id="oldPassword" class="security-input" required></div>
                    <div class="form-group"><label>New Security Key</label><input type="password" id="newPassword" class="security-input" required></div>
                    <button type="submit" class="btn-deposit" style="width:100%; padding:18px; background: var(--text-dark) !important;">UPDATE CREDENTIALS</button>
                </form>
            </div>
        </div>`;
    document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth(`${API_BASE_URL}/users/change-password`, { 
            method: 'POST', 
            body: JSON.stringify({ oldPassword: oldPassword.value, newPassword: newPassword.value }) 
        });
        const result = await res.json();
        if (res.ok) { showSuccessModal("Access credentials updated."); setTimeout(() => { window.location.hash = '#me'; router(); }, 2000); } else { alert(result.message); }
    });
};

const renderResetPinPage = async () => {
    appContent.innerHTML = `
        <div style="padding: 20px;">
            <h2 style="font-weight: 800; margin-bottom: 25px;">Transaction PIN</h2>
            <div style="background:white; padding:40px 30px; border-radius:28px; text-align:center; box-shadow: var(--card-shadow);">
                <p style="color:#64748B; font-size: 14px; margin-bottom:30px;">Set a 4-digit code for withdrawal authorization.</p>
                <form id="resetPinForm">
                    <input type="password" id="newPinInput" class="security-input" maxlength="4" pattern="[0-9]*" inputmode="numeric" required 
                           style="text-align:center; letter-spacing:15px; font-size:28px; font-weight:900; background:#F1F5F9; border:none; margin-bottom:30px;">
                    <button type="submit" class="btn-deposit" style="width:100%; padding:18px;">RESET PIN</button>
                </form>
            </div>
        </div>`;
    document.getElementById('resetPinForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth(`${API_BASE_URL}/users/reset-pin`, { method: 'POST', body: JSON.stringify({ newPin: newPinInput.value }) });
        if (res.ok) { showSuccessModal("PIN established."); setTimeout(() => { window.location.hash = '#me'; router(); }, 2000); } else { alert("Reset failed."); }
    });
};

const renderSetPinPage = async () => {
    appContent.innerHTML = `
        <div style="padding: 20px;">
            <h2 style="font-weight: 800; margin-bottom: 25px;">Security PIN</h2>
            <div style="background:white; padding:40px 30px; border-radius:28px; text-align:center; box-shadow: var(--card-shadow);">
                <p style="color:#64748B; font-size: 14px; margin-bottom:30px;">Define a 4-digit withdrawal PIN.</p>
                <form id="pinForm">
                    <input type="password" id="pinInput" class="security-input" maxlength="4" pattern="[0-9]*" inputmode="numeric" required 
                           style="text-align:center; letter-spacing:15px; font-size:28px; font-weight:900; background:#F1F5F9; border:none; margin-bottom:30px;">
                    <button type="submit" class="btn-deposit" style="width:100%; padding:18px;">ACTIVATE PIN</button>
                </form>
            </div>
        </div>`;
    document.getElementById('pinForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth(`${API_BASE_URL}/users/set-pin`, { method: 'POST', body: JSON.stringify({ pin: pinInput.value }) });
        if (res.ok) { showSuccessModal("Security PIN active."); setTimeout(() => { window.location.hash = '#me'; router(); }, 2000); } else { alert("Failed."); }
    });
};

const renderActiveInvestmentsPage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/dashboard`, { method: 'GET' });
        const data = await response.json();
        const investments = data.active_investments || [];

        if (investments.length === 0) {
            appContent.innerHTML = `
                <div style="padding: 20px; text-align: center; height: 70vh; display: flex; flex-direction: column; justify-content: center;">
                    <h2 style="font-weight: 800;">No Active Assets</h2>
                    <p style="color: #64748B; margin: 15px 0 30px;">Your portfolio is currently empty.</p>
                    <a href="#products" class="btn-deposit" style="padding:18px; text-decoration:none;">BROWSE COLLECTIONS</a>
                </div>`;
            return;
        }

        let html = '<div style="padding: 20px 20px 100px;"><h2 style="font-weight: 800; margin-bottom: 25px;">My Portfolio</h2>';
        
        investments.forEach(inv => {
            const name = inv.itemname || inv.itemName || "Asset";
            const cost = Number(inv.price || inv.investmentAmount) || 0;
            const yieldAmt = Number(inv.daily_earning || inv.dailyYield) || 0;
            const collected = Number(inv.total_earning || inv.totalAccumulated) || 0;
            const daysLeft = inv.days_left !== undefined ? inv.days_left : (inv.daysLeft || 0);

            html += `
            <div style="background: white; border-radius: 28px; padding: 24px; margin-bottom: 20px; box-shadow: var(--card-shadow); border: 1px solid #F1F5F9;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                    <div>
                        <h4 style="margin: 0; font-weight: 800; color: var(--text-dark); text-transform: uppercase;">${name}</h4>
                        <div style="display: inline-flex; align-items: center; gap: 4px; color: #10B981; font-weight: 800; font-size: 10px; margin-top: 5px;">
                            <i class="fas fa-circle" style="font-size: 6px;"></i> EARNING LIVE
                        </div>
                    </div>
                    <div style="background: ${daysLeft > 5 ? '#F1F5F9' : '#FEE2E2'}; color: ${daysLeft > 5 ? '#64748B' : '#EF4444'}; padding: 6px 12px; border-radius: 10px; font-size: 10px; font-weight: 800;">
                        ${daysLeft}D REMAINING
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="stat-item"><span class="stat-label">Entry</span><span class="stat-value">₦${cost.toLocaleString()}</span></div>
                    <div class="stat-item"><span class="stat-label">Daily</span><span class="stat-value" style="color: #10B981;">₦${yieldAmt.toLocaleString()}</span></div>
                    <div class="stat-item"><span class="stat-label">Accumulated</span><span class="stat-value" style="color: var(--accent-primary);">₦${collected.toLocaleString()}</span></div>
                    <div class="stat-item"><span class="stat-label">Payout</span><span class="stat-value">Daily</span></div>
                </div>
            </div>`;
        });

        appContent.innerHTML = html + '</div>';
    } catch (e) { appContent.innerHTML = '<p style="padding:50px;">Sync Failed.</p>'; }
};

const renderMePage = async () => { 
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        const data = await response.json();
        const user = data.balance || {};
        const refCode = user.own_referral_code || user.referral_code || data.referral_code || 'N/A';
        const pinActionText = user.has_pin ? "Update Transaction PIN" : "Setup Transaction PIN";
        const pinActionHash = user.has_pin ? "#reset-pin" : "#set-pin";

        appContent.innerHTML = `
            <div style="padding: 20px 20px 100px;">
                <div style="background: white; padding: 35px 20px; border-radius: 32px; text-align: center; box-shadow: var(--card-shadow); margin-bottom: 25px;">
                    <div style="width: 80px; height: 80px; background: #F1F5F9; color: var(--text-dark); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 28px;">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <h3 style="margin: 0; font-weight: 800; font-size: 20px;">${user.full_name}</h3>
                    <p style="color: #94A3B8; font-size: 14px; margin-top: 5px;">${user.phone_number}</p>
                    <div style="margin-top: 25px;">${getReferralCardHTML(refCode)}</div>
                </div>

                <div style="background: white; border-radius: 32px; overflow: hidden; box-shadow: var(--card-shadow);">
                    <a href="#change-password" style="display:flex; justify-content:space-between; align-items:center; padding:22px; border-bottom:1px solid #F1F5F9; text-decoration:none; color:var(--text-dark);">
                        <div style="display:flex; align-items:center; gap:15px;"><i class="fas fa-shield-keyhole" style="color:var(--accent-primary);"></i><span style="font-weight:700; font-size:14px;">Update Password</span></div>
                        <i class="fas fa-chevron-right" style="font-size:12px; color:#CBD5E1;"></i>
                    </a>
                    <a href="${pinActionHash}" style="display:flex; justify-content:space-between; align-items:center; padding:22px; border-bottom:1px solid #F1F5F9; text-decoration:none; color:var(--text-dark);">
                        <div style="display:flex; align-items:center; gap:15px;"><i class="fas fa-lock-hashtag" style="color:var(--accent-primary);"></i><span style="font-weight:700; font-size:14px;">${pinActionText}</span></div>
                        <i class="fas fa-chevron-right" style="font-size:12px; color:#CBD5E1;"></i>
                    </a>
                    <a href="#history" style="display:flex; justify-content:space-between; align-items:center; padding:22px; border-bottom:1px solid #F1F5F9; text-decoration:none; color:var(--text-dark);">
                        <div style="display:flex; align-items:center; gap:15px;"><i class="fas fa-layer-group" style="color:var(--accent-primary);"></i><span style="font-weight:700; font-size:14px;">Transaction Records</span></div>
                        <i class="fas fa-chevron-right" style="font-size:12px; color:#CBD5E1;"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="window.logoutUser()" style="display:flex; align-items:center; gap:15px; padding:22px; text-decoration:none; color:#EF4444; font-weight:800; font-size:14px;">
                        <i class="fas fa-power-off"></i><span>Sign Out</span>
                    </a>
                </div>
            </div>`;
    } catch(e) {}
};

const renderDepositPage = async () => { 
    const accountNumber = "6669586597";
    appContent.innerHTML = `
        <div style="padding: 20px 20px 100px;">
            <h2 style="font-weight: 800; font-size: 24px; margin-bottom: 25px;">Add Assets</h2>
            
            <div style="background: #0F172A; color: white; padding: 30px; border-radius: 32px; margin-bottom: 25px; box-shadow: 0 20px 40px -12px rgba(15,23,42,0.4);">
                <small style="opacity: 0.5; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Bank Transfer Target</small>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                    <h3 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px; color: var(--accent-success);">${accountNumber}</h3>
                    <button id="copyAccBtn" onclick="window.copyAccountNumber('${accountNumber}')" style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--accent-success); color: var(--accent-success); padding: 8px 16px; border-radius: 12px; font-weight: 800; font-size: 11px; cursor: pointer;">COPY</button>
                </div>
                <div style="margin-top: 20px; font-weight: 800; font-size: 18px;">JJB BRANDED WINES LTD</div>
                <div style="opacity: 0.6; font-size: 14px; margin-top: 2px;">Moniepoint Microfinance Bank</div>
            </div>

            <div style="background: white; padding: 30px; border-radius: 32px; box-shadow: var(--card-shadow);">
                <h4 style="margin: 0 0 20px; font-weight: 800; color: var(--text-dark);">Upload Confirmation</h4>
                <form id="manualDepositForm">
                    <div class="form-group"><label>Transferred Amount (₦)</label><input type="number" id="depositAmountInput" placeholder="0.00" required></div>
                    <div class="form-group"><label>Transaction Screenshot</label><div style="position:relative;"><input type="file" id="receiptFileInput" accept="image/*" required style="width:100%; opacity:0; height:60px; z-index:2; position:relative;"><div style="position:absolute; top:0; left:0; width:100%; height:60px; background:#F1F5F9; border:2px dashed #CBD5E1; border-radius:18px; display:flex; align-items:center; justify-content:center; color:#64748B; font-weight:700; font-size:13px;"><i class="fas fa-cloud-upload" style="margin-right:10px;"></i> Select Receipt</div></div></div>
                    <button type="submit" id="submitBtn" class="btn-deposit" style="width:100%; padding:18px; font-size:15px; margin-top:10px;">NOTIFY AUDITORS</button>
                </form>
            </div>
        </div>`;

    document.getElementById('manualDepositForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = document.getElementById('depositAmountInput').value;
        const fileInput = document.getElementById('receiptFileInput');
        if (!fileInput.files[0]) return alert("Please select a file.");

        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('receipt', fileInput.files[0]);

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerText = "VERIFYING...";

        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/payment/deposit/manual`, { method: 'POST', body: formData });
            if (response && response.ok) {
                showSuccessModal('Audit process initiated. Confirmation within 24hrs.');
                setTimeout(() => { window.location.hash = '#home'; router(); }, 2500);
            } else {
                const err = await response.json();
                alert('Error: ' + err.message);
                submitBtn.disabled = false;
                submitBtn.innerText = "NOTIFY AUDITORS";
            }
        } catch (error) { alert('Network Error'); submitBtn.disabled = false; }
    });
};

const renderWithdrawPage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`, { method: 'GET' });
        const data = await response.json();
        const balance = data.balance?.balance || 0;
        appContent.innerHTML = `
            <div style="padding: 20px 20px 100px;">
                <h2 style="font-weight: 800; font-size: 24px; margin-bottom: 25px;">Liquidate Assets</h2>
                <div style="background: linear-gradient(135deg, #1E293B, #0F172A); padding: 30px; border-radius: 32px; box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.4);">
                    <div style="text-align: center; margin-bottom: 30px; background: rgba(255,255,255,0.05); padding: 20px; border-radius: 20px;">
                        <small style="color: #94A3B8; text-transform: uppercase; font-weight: 800; font-size: 10px; letter-spacing: 1px;">Withdrawable Fund</small>
                        <p style="color: white; font-weight: 900; font-size: 32px; margin: 8px 0 0 0;">₦ ${Number(balance).toLocaleString()}</p>
                    </div>
                    <form id="withdrawForm">
                        <div class="form-group" style="margin-bottom: 20px;"><label style="color: white; opacity: 0.6;">Payout Amount (₦)</label><input type="number" id="amount" min="800" step="0.01" style="background: white; border: none; padding: 18px; border-radius: 18px; font-weight: 800;" placeholder="Min ₦800" required /></div>
                        
                        <div id="feeContainer" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 18px; border-radius: 18px; margin-bottom: 25px; display: none;">
                            <div style="display: flex; justify-content: space-between; font-size: 12px; color: #94A3B8;"><span>Handling Fee (9%):</span><span id="feeDisplay" style="color: #EF4444; font-weight:700;">- ₦0.00</span></div>
                            <div style="display: flex; justify-content: space-between; font-weight: 800; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-top: 10px; font-size: 16px; color: white;"><span>Net Credit:</span><span id="finalDisplay" style="color: #10B981;">₦0.00</span></div>
                        </div>

                        <div class="form-group"><label style="color: white; opacity: 0.6;">Destination Bank</label><select id="bankName" required style="width: 100%; padding: 18px; border-radius: 18px; font-weight: 800; border: none; background: white;"><option value="">Select Bank</option><option value="OPay">OPay</option><option value="PalmPay">PalmPay</option><option value="Moniepoint">Moniepoint</option><option value="GTBank">GTBank</option><option value="Access Bank">Access Bank</option><option value="Zenith Bank">Zenith Bank</option><option value="First Bank">First Bank</option><option value="UBA">UBA</option><option value="Kuda Bank">Kuda Bank</option></select></div>
                        <div class="form-group"><label style="color: white; opacity: 0.6;">Account Number</label><input type="text" id="accountNumber" placeholder="10 Digits" required style="background: white; border: none; padding: 18px; border-radius: 18px; font-weight: 800;" /></div>
                        <div class="form-group"><label style="color: white; opacity: 0.6;">Account Name</label><input type="text" id="accountName" placeholder="Beneficiary Name" required style="background: white; border: none; padding: 18px; border-radius: 18px; font-weight: 800;" /></div>
                        
                        <div style="background: #F59E0B; padding: 2px; border-radius: 20px; margin-top: 30px;">
                            <div style="background: #0F172A; border-radius: 18px; padding: 15px;">
                                <label style="color: #F59E0B; font-weight: 800; display: block; margin-bottom: 10px; font-size: 10px; text-transform: uppercase;">Security Authorization</label>
                                <input type="password" id="withdrawPin" maxlength="4" placeholder="••••" required style="width: 100%; background: transparent; border: 1px solid rgba(245, 158, 11, 0.3); color: white; padding: 15px; border-radius: 12px; text-align: center; letter-spacing: 15px; font-size: 24px; font-weight: 900;" />
                            </div>
                        </div>
                        <button type="submit" class="btn-withdraw" style="width: 100%; padding: 20px; margin-top: 30px; background: var(--accent-success) !important; font-size: 16px;">AUTHORIZE PAYOUT</button>
                    </form>
                </div>
            </div>`;

        const amountInput = document.getElementById('amount');
        const feeContainer = document.getElementById('feeContainer');
        amountInput.addEventListener('input', () => {
            const val = parseFloat(amountInput.value);
            if (val >= 800) {
                const fee = (val * 0.09).toFixed(2);
                const final = (val - fee).toFixed(2);
                document.getElementById('feeDisplay').innerText = `- ₦${Number(fee).toLocaleString()}`;
                document.getElementById('finalDisplay').innerText = `₦${Number(final).toLocaleString()}`;
                feeContainer.style.display = 'block';
            } else { feeContainer.style.display = 'none'; }
        });

        document.getElementById('withdrawForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const res = await fetchWithAuth(`${API_BASE_URL}/payment/withdraw`, { 
                method:'POST', 
                body: JSON.stringify({ 
                    amount: amountInput.value, 
                    bank_name: document.getElementById('bankName').value, 
                    account_number: document.getElementById('accountNumber').value, 
                    account_name: document.getElementById('accountName').value, 
                    pin: document.getElementById('withdrawPin').value 
                })
            });
            const r = await res.json(); 
            if(res.ok) showSuccessModal(r.message); else alert(r.message);
        });
    } catch (e) {}
};

const renderRewardsPage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/reward-history`, { method: 'GET' });
        const data = await response.json();
        const rewardList = data.rewards || [];
        const summary = data.summary || { total_rewards: 0 };
        let itemsHTML = rewardList.length === 0 ? `<div style="text-align:center; padding: 40px;"><p style="color: #94A3B8;">No reward activity found.</p></div>` :
            rewardList.map(item => `
                <div style="background: white; border-radius: 20px; padding: 20px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--card-shadow);">
                    <div>
                        <div style="font-weight: 700; font-size: 14px; color: var(--text-dark);">${item.source}</div>
                        <small style="color: #94A3B8; font-size: 11px;">${new Date(item.date).toLocaleDateString()}</small>
                    </div>
                    <div style="color: #10B981; font-weight: 800; font-size: 15px;">+₦${Number(item.amount).toLocaleString()}</div>
                </div>`).join('');
        appContent.innerHTML = `
            <div style="padding: 20px 20px 100px;">
                <h2 style="font-weight: 800; font-size: 24px; margin-bottom: 25px;">Reward Streams</h2>
                <div style="background: #10B981; color: white; padding: 30px; border-radius: 32px; margin-bottom: 30px; text-align: center; box-shadow: 0 20px 40px -10px rgba(16, 185, 129, 0.4);">
                    <small style="opacity: 0.7; font-weight: 700; text-transform: uppercase; font-size: 10px;">Total Accumulated Rewards</small>
                    <h2 style="font-size: 32px; margin: 5px 0 0 0;">₦ ${Number(summary.total_rewards).toLocaleString()}</h2>
                </div>
                ${itemsHTML}
            </div>`;
    } catch (e) {}
};

const renderHistoryPage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    const res = await fetchWithAuth(`${API_BASE_URL}/payment/history`, { method:'GET' });
    const data = await res.json();
    const list = (data.transactions || []).map(t => `
        <div style="background: white; border-radius: 20px; padding: 20px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--card-shadow);">
            <div>
                <div style="font-weight: 700; font-size: 14px; color: var(--text-dark); text-transform: uppercase;">${t.type.replace(/_/g, ' ')}</div>
                <small style="color: #94A3B8; font-size: 11px;">${new Date(t.created_at).toLocaleDateString()}</small>
            </div>
            <div style="color: ${t.amount > 0 ? '#10B981' : '#0F172A'}; font-weight: 800; font-size: 15px;">
                ${t.amount > 0 ? '+' : ''}₦${Number(Math.abs(t.amount)).toLocaleString()}
            </div>
        </div>`).join('');
    appContent.innerHTML = `
        <div style="padding: 20px 20px 100px;">
            <h2 style="font-weight: 800; font-size: 24px; margin-bottom: 25px;">Vault History</h2>
            <div>${list || '<p style="text-align:center; padding: 40px; color:#94A3B8;">No records.</p>'}</div>
        </div>`;
};

const renderSupportPage = () => { 
    appContent.innerHTML = `
    <div style="padding: 20px 20px 100px;">
        <h2 style="font-weight: 800; font-size: 24px; margin-bottom: 25px;">Concierge Support</h2>
        <div style="background: white; padding: 35px 25px; border-radius: 32px; box-shadow: var(--card-shadow); text-align: center;">
            <div style="width: 70px; height: 70px; background: #DCFCE7; border-radius: 24px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <i class="fab fa-whatsapp" style="font-size: 35px; color: #25D366;"></i>
            </div>
            <h3 style="margin: 0 0 10px; font-weight: 800;">WhatsApp Support</h3>
            <p style="color: #64748B; font-size: 14px; margin-bottom: 25px;">Fastest response for yield queries and verification assistance.</p>
            <a href="https://chat.whatsapp.com/Dw76vw5BJ68FONRPd6GPUi" target="_blank" class="btn-deposit" style="background: #25D366 !important; padding: 18px; text-decoration: none; width: 100%;">OPEN CHAT</a>
            
            <div style="margin-top: 40px; border-top: 1px solid #F1F5F9; padding-top: 30px; text-align: left;">
                <div style="margin-bottom: 20px;">
                    <small style="color: #94A3B8; font-weight: 700; text-transform: uppercase; font-size: 10px;">Email Channel</small>
                    <div style="font-weight: 800; color: var(--accent-primary); margin-top: 5px;">jjb24wines@gmail.com</div>
                </div>
                <div>
                    <small style="color: #94A3B8; font-weight: 700; text-transform: uppercase; font-size: 10px;">Corporate Desk</small>
                    <div style="font-weight: 800; color: var(--text-dark); margin-top: 5px;">+234 704 759 1968</div>
                </div>
            </div>
        </div>
    </div>`; 
};

const renderCertificatePage = () => { 
    appContent.innerHTML = `
        <div style="padding: 20px 20px 100px;">
            <h2 style="font-weight: 800; font-size: 24px; margin-bottom: 25px;">Legal Assets</h2>
            <div style="background: white; padding: 15px; border-radius: 28px; box-shadow: var(--card-shadow);">
                <img src="image.png" style="width: 100%; border-radius: 20px;" onerror="this.parentElement.innerHTML='<p style=\'padding:40px; color:#94A3B8; text-align:center;\'>Document loading...</p>'">
            </div>
            <p style="text-align: center; color: #64748B; font-size: 12px; margin-top: 20px; font-weight: 600;">© 2024 JJB Branded Wines Ltd. All Rights Reserved.</p>
        </div>`; 
};

// ==========================================
// 7. ROUTER & EVENTS (UNCHANGED LOGIC)
// ==========================================

const router = () => {
    const token = localStorage.getItem('token');
    let hash = window.location.hash || '#home';
    if (hash.includes('?')) hash = hash.split('?')[0];
    
    if (['#login', '#register'].includes(hash)) { 
        bottomNav.style.display = 'none'; 
        if(hash === '#login') renderLoginScreen(); else renderRegisterScreen(); 
        return; 
    }
    
    if (!token) { logoutUser(); return; }
    bottomNav.style.display = 'flex';
    document.querySelectorAll('.nav-link').forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === hash) link.classList.add('active'); });

    switch (hash) {
        case '#home': renderHomeScreen(); break;
        case '#products': renderProductsPage(); break;
        case '#vip': renderVipPage(); break;
        case '#me': renderMePage(); break;
        case '#deposit': renderDepositPage(); break;
        case '#withdraw': renderWithdrawPage(); break;
        case '#history': renderHistoryPage(); break;
        case '#team': renderTeamPage(); break;
        case '#certificate': renderCertificatePage(); break;
        case '#rewards': renderRewardsPage(); break; 
        case '#support': renderSupportPage(); break;
        case '#set-pin': renderSetPinPage(); break; 
        case '#reset-pin': renderResetPinPage(); break; 
        case '#change-password': renderChangePasswordPage(); break; 
        case '#my-plans': renderActiveInvestmentsPage(); break;
        default: renderHomeScreen(); 
    }
    window.scrollTo(0, 0);
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
appContent.addEventListener('click', handleInvestClick);

// ==========================================
// 8. SOCIAL PROOF POPUPS (UNCHANGED FOMO)
// ==========================================
(function startSocialProof() {
    if (localStorage.getItem('user_email') === 'audit@flutterwave.com') return;

    const fomoData = {
        names: ["Adewale Okafor", "Chioma Adeyemi", "Musa Ibrahim", "Ngozi Okeke", "Tunde Bakare", "Fatima Bello", "Emeka Nwosu", "Zainab Sani", "Olumide Balogun", "Aisha Mohammed", "Chinedu Eze", "Yusuf Abdullahi", "Funke Adegoke", "Grace Okafor", "Ahmed Suleiman", "Kehinde Alabi", "Amaka Onwuka", "Ibrahim Kabiru", "Toyin Oladipo", "Chika Nnaji", "Sadiq Umar", "Bisi Akindele", "Ifeanyi Okonkwo", "Halima Yusuf", "Seun Adebayo", "Uche Obi", "Maryam Abubakar", "Femi Olayinka", "Nneka Umeh", "Aliyu Garba", "Bolaji Coker", "Ogechi Ibe", "Kabiru Haruna", "Tola Fashola", "Chidi Okpara", "Rukayat Hassan", "Kunle Afolabi", "Ebele Chukwu", "Mustapha Idris", "Yemi Ojo", "Chinwe Dike", "Hauwa Adamu", "Segun Ogundipe", "Amarachi Eze", "Usman Bello", "Simi Adeola", "Obinna Uche", "Khadija Salihu", "Rotimi Cole", "Ada Obi", "Bashir Aminu", "Bukola Ayeni", "Kelechi Ibeh", "Nafisa Musa", "Jide Soweto", "Chinyere Kalu", "Aminu Kano", "Lola Omotola", "Emeka Ugochukwu", "Zarah Ahmed", "Tope Adeniyi", "Ify Nwachukwu", "Sani Danladi", "Remi Coker", "Chuks Okereke", "Farida Lawal", "Wale Tinubu", "Oby Ezekwesili", "Yakubu Moses", "Folake Adeyemi", "Chigozie Obi", "Rakiya Sani", "Bayo Adekunle", "Nkiru Okoye", "Isah Mohammed", "Titilayo Ajayi", "Collins Eke", "Jumoke Adeleke", "Abba Kyari", "Ronke Odusanya", "Prince Okon", "Asabe Kabir", "Deji Olanrewaju", "Chi-Chi Okoro", "Balarabe Musa", "Sola Sobowale", "Ebube Nnamdi", "Lami George", "Femi Falana", "Uju Nwafor", "Gambo Shehu", "Kemi Adetiba", "Pascal Atuma", "Hassana Garba", "Lanre Olusola", "Anita Okoye", "Shehu Shagari", "Bimbo Akintola", "Ikechukwu Uche", "Salamatu Bako", "Dayo Ajayi", "Blessing Onoh", "Suleiman Audu", "Chika Uzor", "Babatunde Fash", "Hauwa Garba", "Nkem Okoro", "Bashir Usman", "Yinka Davies", "Zainab Idris", "Umar Danjuma", "Ekaette Akpan", "Olawale Cole", "Nneoma Dike", "Garba Shehu", "Bukky Wright", "Chinedu Ikedieze", "Osas Ighodaro", "Toke Makinwa", "Banky W", "Tiwa Savage", "Don Jazzy", "Wizkid Ayo", "Davido Adeleke", "Burna Boy", "Olamide Baddo", "Phyno Nelson", "Patoranking Okolo", "Flavour N'abania", "Tekno Miles", "Falz BahdGuy", "Mr Eazi", "Simi Kosoko", "Adekunle Gold", "Yemi Alade", "Kizz Daniel", "Fireboy DML", "Rema Divine", "Joeboy Akinfenwa", "Tems Openiyi", "Ayra Starr", "Ckay Kasari", "Zlatan Ibile", "Naira Marley", "Bella Shmurda", "Mohbad Aloba", "Omah Lay", "Buju Benson", "Oxlade Olaitan", "Victony Anthony", "Blaqbonez Emeka", "Teni Apata", "Skales Raoul", "Ice Prince", "M.I Abaga", "Reminisce Alaga", "Vector Tha Viper", "Ladipoe Eso", "Dremo Abori", "Mayorkun Adewale", "Peruzzi Okoro", "Tunde Ednut", "Bobrisky Okuneye", "Eniola Badmus", "Funke Akindele", "Mercy Johnson", "Rita Dominic", "Genevieve Nnaji", "Omotola Jalade", "Ini Edo", "Uche Jombo", "Omoni Oboli", "Toyin Abraham", "Iyabo Ojo", "Mercy Aigbe", "Odunlade Adekola", "Femi Adebayo", "Muyiwa Ademola", "Ali Nuhu", "Rahama Sadau", "Hadiza Gabon", "Sadiq Sani Sadiq", "Nuhu Abdullahi", "Ado Gwanja", "Hamisu Breaker", "Umar M Shareef", "Zpreety Queen", "Momee Gombe", "Maryam Yahaya", "Fati Washa", "Aisha Tsamiya", "Amal Umar", "Bilkisu Shema", "Nafisat Abdullahi", "Haleema Atete", "Sadiya Kabala", "Jamila Nagudu", "Fati SU"],
        locations: ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Enugu", "Warri", "Benin City", "Kaduna", "Jos"],
        actions: [ { text: "just joined community", icon: "👤", color: "#3b82f6" }, { text: "acquired plan ₦50,000", icon: "💰", color: "#10b981" }, { text: "acquired plan ₦100,000", icon: "💰", color: "#10b981" }, { text: "joined VIP community", icon: "🍷", color: "#eab308" }, { text: "received yield ₦15,000", icon: "🏦", color: "#f43f5e" } ],
        times: ["Just now", "2 secs ago", "5 secs ago", "10 secs ago"]
    };
    const style = document.createElement('style');
    style.innerHTML = `#fomo-popup { position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%) translateY(200%); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.8); border-left: 5px solid #10B981; padding: 12px 18px; border-radius: 20px; box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.1); font-family: inherit; z-index: 9999; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; align-items: center; gap: 12px; width: 90%; max-width: 340px; pointer-events: none; } #fomo-popup.show { transform: translateX(-50%) translateY(0); } .fomo-icon-box { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; background: #F1F5F9; flex-shrink: 0; } .fomo-content { display: flex; flex-direction: column; } .fomo-name { font-size: 13px; font-weight: 800; color: #0F172A; } .fomo-desc { font-size: 12px; color: #64748B; } .fomo-meta { font-size: 10px; color: #94A3B8; margin-top: 1px; }`;
    document.head.appendChild(style);
    const popup = document.createElement('div'); popup.id = 'fomo-popup'; popup.innerHTML = `<div class="fomo-icon-box" id="fomo-icon">👋</div><div class="fomo-content"><span class="fomo-name" id="fomo-name">...</span><span class="fomo-desc" id="fomo-action">...</span><span class="fomo-meta"><span id="fomo-location">Lagos</span> • <span id="fomo-time">Just now</span></span></div>`;
    document.body.appendChild(popup);
    function showNotification() {
        const hash = window.location.hash; if(hash !== '#home' && hash !== '') return; 
        const name = fomoData.names[Math.floor(Math.random() * fomoData.names.length)];
        const loc = fomoData.locations[Math.floor(Math.random() * fomoData.locations.length)];
        const actionObj = fomoData.actions[Math.floor(Math.random() * fomoData.actions.length)];
        const time = fomoData.times[Math.floor(Math.random() * fomoData.times.length)];
        const nameEl = document.getElementById('fomo-name');
        const actEl = document.getElementById('fomo-action');
        const locEl = document.getElementById('fomo-location');
        const timeEl = document.getElementById('fomo-time');
        const iconEl = document.getElementById('fomo-icon');
        const popupEl = document.getElementById('fomo-popup');
        if (nameEl && actEl && locEl && timeEl && iconEl && popupEl) {
            nameEl.innerText = name; actEl.innerText = actionObj.text; locEl.innerText = loc; timeEl.innerText = time; iconEl.innerText = actionObj.icon;
            popupEl.style.borderLeftColor = actionObj.color;
            popupEl.classList.add('show'); setTimeout(() => { popupEl.classList.remove('show'); }, 4000);
        }
    }
    setTimeout(showNotification, 2000); setInterval(() => { showNotification(); }, 15000);
})();
