// ==========================================
// 1. CONFIGURATION & STYLING INJECTION
// ==========================================

const styleSheet = document.createElement("style");
styleSheet.innerText = `
    /* 1. BOLD GLOBAL BUTTONS */
    .btn-deposit {
        background: linear-gradient(135deg, #10b981, #059669) !important;
        color: white !important;
        font-weight: 800 !important;
        border: none !important;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4) !important;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: transform 0.2s ease;
    }
    .btn-deposit:active { transform: scale(0.98); }

    .btn-withdraw {
        background: linear-gradient(135deg, #ef4444, #b91c1c) !important;
        color: white !important;
        font-weight: 800 !important;
        border: none !important;
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4) !important;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: transform 0.2s ease;
    }
    .btn-withdraw:active { transform: scale(0.98); }

    /* 2. PREMIUM PRODUCT CARDS */
    .product-grid-wc {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        padding: 10px 0;
    }
    .product-card-wc {
        background: #fff;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        border: 1px solid #f0f0f0;
        transition: transform 0.2s ease;
        display: flex;
        flex-direction: column;
    }
    .product-card-wc:hover { transform: translateY(-5px); }
    .product-image-wc { height: 180px; width: 100%; position: relative; }
    .product-image-wc img { width: 100%; height: 100%; object-fit: cover; }
    .card-badge {
        position: absolute; top: 10px; right: 10px;
        background: rgba(0,0,0,0.7); color: #fff;
        padding: 4px 10px; border-radius: 20px;
        font-size: 10px; font-weight: bold; backdrop-filter: blur(4px);
    }
    .product-info-wc { padding: 20px; display: flex; flex-direction: column; gap: 15px; }
    .product-title { font-size: 1.2rem; font-weight: 800; color: #1f2937; margin: 0; line-height: 1.2; }
    
    .product-stats {
        display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        background: #f9fafb; padding: 10px; border-radius: 12px;
    }
    .stat-item { display: flex; flex-direction: column; }
    .stat-label { font-size: 10px; color: #6b7280; text-transform: uppercase; font-weight: 600; }
    .stat-value { font-size: 14px; font-weight: 700; color: #111; }
    .stat-value.price { color: #10b981; font-size: 15px; }
    .stat-value.roi { color: #8b5cf6; }

    .btn-invest-premium {
        background: linear-gradient(135deg, #8b5cf6, #6d28d9);
        color: white; font-weight: 700; border: none;
        padding: 14px; border-radius: 12px; width: 100%;
        cursor: pointer; font-size: 14px;
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        transition: all 0.2s;
    }
    .btn-invest-premium:active { transform: scale(0.98); }

    /* 3. DESIGNER ALERT NOTIFICATION */
    #successModal {
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        justify-content: center; align-items: center;
        backdrop-filter: blur(8px); background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
    }
    #successModal .modal-content {
        background: #fff; padding: 30px; border-radius: 24px;
        text-align: center; max-width: 320px; width: 85%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 1px solid rgba(255,255,255,0.8);
    }
    @keyframes popIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    #closeModalBtn {
        margin-top: 20px; padding: 12px 30px;
        background: #10b981; color: white; border: none;
        border-radius: 12px; font-weight: bold; cursor: pointer;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
`;
document.head.appendChild(styleSheet);

// 2. DATA CONFIGURATION
const vipProducts = [
    { id: 101, name: 'CASPERVIP1', price: 500000, total_return: 600000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPER+VIP+1' },
    { id: 102, name: 'CASPERVIP2', price: 1000000, total_return: 1200000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPER+VIP+2' },
    { id: 103, name: 'CASPER3', price: 2000000, total_return: 2400000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPER+3' },
    { id: 104, name: 'CASPER4', price: 3000000, total_return: 3600000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPER+4' }
];

const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');
const API_BASE_URL = 'https://jjb24-backend.onrender.com/api';

// ==========================================
// 3. HELPER FUNCTIONS
// ==========================================

const showSuccessModal = (message) => {
    const successModal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');
    if (modalMessage) modalMessage.innerHTML = `<i class="fas fa-check-circle" style="font-size: 48px; color: #10b981; margin-bottom: 15px; display:block;"></i><span style="font-size: 18px; font-weight: 700; color: #333; line-height: 1.4;">${message}</span>`;
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
        try { await navigator.clipboard.writeText(fullLink); showSuccessModal('Referral link copied!'); return; } catch (err) { }
    }
    prompt("Copy your referral link:", fullLink);
};

const getReferralFromUrl = () => {
    const fullHash = window.location.hash;
    if (fullHash.includes('?ref=')) { const parts = fullHash.split('?ref='); if (parts.length > 1) return parts[1].split('&')[0]; }
    return '';
};

const logoutUser = () => { 
    localStorage.removeItem('token'); 
    window.location.hash = '#login'; 
    router(); 
};
window.logoutUser = logoutUser;

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = new Headers(options.headers || {});
    if (token) headers.append('Authorization', `Bearer ${token}`);
    
    // ADJUSTMENT: Only set JSON Content-Type if we aren't sending a file (FormData)
    if (!(options.body instanceof FormData) && !headers.has('Content-Type') && options.body) {
        headers.append('Content-Type', 'application/json');
    }

    try {
        const response = await fetch(url, { ...options, headers });
        if (response.status === 401) { logoutUser(); return null; }
        return response;
    } catch (e) { console.error("Network Error", e); return null; }
};

const getReferralCardHTML = (code) => {
    const link = `${window.location.origin}/#register?ref=${code}`;
    return `
    <div class="referral-box" style="background: #fdf2f8; border: 1px dashed #db2777; border-radius: 12px; padding: 15px; margin-bottom: 20px; text-align: center;">
        <small style="color: #be185d; font-weight: bold;">INVITE & EARN</small>
        <div style="margin: 10px 0; background: #fff; padding: 10px; border-radius: 8px; font-size: 11px; word-break: break-all; color: #555; border: 1px solid #fbcfe8;">
            ${link}
        </div>
        <div style="display: flex; justify-content: space-between; align-items:center;">
            <strong style="color:#be185d; font-size: 16px;">${code}</strong>
            <button onclick="window.copyReferralLink('${code}')" class="btn-deposit" style="background: #db2777 !important; padding: 8px 20px; font-size: 12px; border-radius: 8px !important; cursor:pointer; width: auto; box-shadow: 0 4px 10px rgba(219, 39, 119, 0.3) !important;">COPY</button>
        </div>
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
    const isEmail = id.includes('@');
    const loginData = { password: pass, email: isEmail ? id : '', phone: isEmail ? '' : id };
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(loginData) });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        localStorage.setItem('token', result.token); window.location.hash = '#home'; router();
    } catch (error) { alert('Could not connect to server.'); }
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
        if (!confirm(`Are you sure you want to invest?`)) return;
        
        let endpoint = investType === 'vip' ? `${API_BASE_URL}/investments/createVipInvestment/${itemId}` : `${API_BASE_URL}/investments/createInvestment/${itemId}`;

        try {
            const response = await fetchWithAuth(endpoint, { method: 'POST' });
            const result = await response.json();
            if (response && response.ok && result.success) {
                showSuccessModal('Investment Successful!');
                setTimeout(() => { window.location.hash = '#home'; router(); }, 2000);
            } else { alert('Error: ' + ((result && result.message) || 'Failed.')); }
        } catch (error) { alert('Investment error.'); }
    }
};

// ==========================================
// 5. RENDER FUNCTIONS
// ==========================================

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `<div class="auth-container"><div class="auth-logo">JJB24</div><h2>Welcome Back</h2><form id="loginForm"><div class="form-group"><label>Email/Phone</label><input type="text" id="loginIdentifier" required /></div><div class="form-group"><label>Password</label><input type="password" id="password" required /></div><button type="submit" class="btn-auth">Login</button></form><p class="auth-link"><a href="#register">Create Account</a></p></div>`;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
};

const renderRegisterScreen = () => {
    bottomNav.style.display = 'none';
    const autoRefCode = getReferralFromUrl();
    appContent.innerHTML = `<div class="auth-container"><div class="auth-logo">JJB24</div><h2>Create Account</h2><form id="registerForm"><div class="form-group"><label>Full Name</label><input type="text" id="fullName" required /></div><div class="form-group"><label>Email</label><input type="email" id="email" required /></div><div class="form-group"><label>Phone</label><input type="tel" id="phone" required /></div><div class="form-group"><label>Password</label><input type="password" id="password" required /></div><div class="form-group"><label>Confirm</label><input type="password" id="cpassword" required /></div><div class="form-group"><label>Referral Code</label><input type="text" id="referral" value="${autoRefCode}" ${autoRefCode ? 'readonly' : ''} /></div><div class="form-group-checkbox" style="flex-direction: row; gap: 10px; margin-top: 15px;"><input type="checkbox" id="termsCheckbox" required style="width: auto;" /><label for="termsCheckbox" style="font-size: 12px; color: #666;">I agree to Terms & Privacy.</label></div><button type="submit" class="btn-auth">Register</button></form><p class="auth-link"><a href="#login">Login here</a></p></div>`;
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

const renderOTPVerificationScreen = (email) => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `<div class="auth-container"><div class="auth-logo">JJB24</div><h2>Verify Phone</h2><p>Code sent to ${email}</p><form id="otpForm"><div class="form-group"><label>OTP</label><input type="text" id="otpCode" maxlength="6" required /></div><button type="submit" class="btn-auth">Verify</button></form><p class="auth-link"><a id="resendOTP" style="cursor: pointer;">Resend OTP</a></p><p class="auth-link"><a href="#login">Back to Login</a></p></div>`;
    document.getElementById('otpForm').addEventListener('submit', (e) => handleOTPVerification(e, email));
    document.getElementById('resendOTP').addEventListener('click', () => handleResendOTP(email)); 
};

const renderHomeScreen = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Dashboard...</p>';
    const token = localStorage.getItem('token'); if (!token) { logoutUser(); return; }
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`, { method: "GET" });
        if (!response || !response.ok) throw new Error();
        const data = await response.json();
        const fullName = data.balance.full_name || 'User'; const balance = data.balance.balance || 0;
        
        let activityHTML = "<p>No recent activity.</p>";
        try {
            const histRes = await fetchWithAuth(`${API_BASE_URL}/payment/history`, { method: 'GET' });
            if (histRes && histRes.ok) {
                const histData = await histRes.json();
                if (histData.success && histData.transactions.length > 0) {
                    activityHTML = histData.transactions.slice(0, 4).map(txn => 
                        `<div style="display:flex; justify-content:space-between; padding: 10px; border-bottom: 1px solid #eee;">
                            <span style="text-transform: capitalize; font-size: 13px; font-weight: bold; color: #555;">${txn.type.replace(/_/g, ' ')}</span>
                            <span style="color:${txn.amount > 0 ? 'green' : 'red'}; font-weight:bold; font-size: 13px;">₦${Number(Math.abs(txn.amount)).toLocaleString()}</span>
                        </div>`
                    ).join('');
                }
            }
        } catch(e) {}

        appContent.innerHTML = `
            <div class="top-header"><div class="user-greeting"><h4>Hello, ${fullName.split(' ')[0]}</h4><p>Welcome back!</p></div><div class="profile-icon"><i class="fas fa-user"></i></div></div>
            <div class="balance-card"><small>Total Assets (NGN)</small><h2>₦ ${Number(balance).toLocaleString() || '0.00'}</h2><div class="header-buttons" style="gap: 15px;"><a href="#deposit" class="btn-deposit" style="flex:1; text-align:center; padding: 12px; border-radius: 12px; text-decoration:none;">Deposit</a><a href="#withdraw" class="btn-withdraw" style="flex:1; text-align:center; padding: 12px; border-radius: 12px; text-decoration:none;">Withdraw</a></div></div>
            <div class="home-content"><div class="quick-actions">
                <a href="#my-investments" class="action-button"><i class="fas fa-chart-pie"></i><span>My Plans</span></a>
                <a href="#certificate" class="action-button"><i class="fas fa-file-certificate"></i><span>Certificate</span></a>
                <a href="#team" class="action-button"><i class="fas fa-users"></i><span>Team</span></a>
                <a href="#history" class="action-button"><i class="fas fa-history"></i><span>History</span></a>
                <a href="#rewards" class="action-button"><i class="fas fa-gift"></i><span>Rewards</span></a>
                <a href="#support" class="action-button"><i class="fas fa-headset"></i><span>Support</span></a>
            </div><div class="activity-card"><h3>Recent Activity</h3><div class="activity-list">${activityHTML}</div></div></div>`;
    } catch (error) { logoutUser(); }
};

const renderProductsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Products...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/allItems`, { method: 'GET' });
        if (!response || !response.ok) throw new Error();
        const data = await response.json();
        let productHTML = ''; const items = data.items || [];
        if (items.length === 0) productHTML = '<p style="text-align:center;">No products.</p>';
        else {
            items.forEach(item => {
                productHTML += `<div class="product-card-wc"><div class="product-image-wc"><span class="card-badge">HOT</span><img src="${item.itemimage}" alt="${item.itemname}" onerror="this.src='https://placehold.co/300x200/6a0dad/ffffff?text=Product'"></div><div class="product-info-wc"><h4 class="product-title">${item.itemname}</h4><div class="product-stats"><div class="stat-item"><span class="stat-label"><i class="fas fa-coins"></i> Price</span><span class="stat-value price">₦${Number(item.price).toLocaleString()}</span></div><div class="stat-item"><span class="stat-label"><i class="fas fa-chart-line"></i> Daily</span><span class="stat-value roi">₦${Number(item.dailyincome).toLocaleString()}</span></div><div class="stat-item"><span class="stat-label"><i class="fas fa-clock"></i> Duration</span><span class="stat-value">${item.duration} Days</span></div><div class="stat-item"><span class="stat-label">Withdrawal</span><span class="stat-value">Daily</span></div></div><button class="btn-invest-premium" data-plan-id="${item.id}" data-type="regular">Invest Now</button></div></div>`;
            });
        }
        appContent.innerHTML = `<div class="page-container"><div class="page-header"><h2>Investment Products</h2></div><div class="product-grid-wc">${productHTML}</div></div>`;
    } catch (e) { appContent.innerHTML = '<p style="text-align:center;">Could not load products.</p>'; }
};

const renderVipPage = () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading VIP...</p>';
    const products = (typeof vipProducts !== 'undefined') ? vipProducts : [];
    let vipHTML = '';
    products.forEach(plan => {
        vipHTML += `<div class="product-card-wc" style="border: 1px solid #ffd700;"> <div class="product-image-wc"><span class="card-badge" style="background:#eab308; color:#000;">VIP</span><img src="${plan.itemimage}" alt="${plan.name}" onerror="this.src='https://placehold.co/300x200/1a1a1a/ffffff?text=VIP'"></div><div class="product-info-wc"><h4 class="product-title" style="color:#b45309;">${plan.name}</h4><div class="product-stats" style="background:#fffbeb;"><div class="stat-item"><span class="stat-label">Price</span><span class="stat-value price" style="color:#b45309;">₦${plan.price.toLocaleString()}</span></div><div class="stat-item"><span class="stat-label">Total ROI</span><span class="stat-value roi" style="color:#b45309;">₦${plan.total_return.toLocaleString()}</span></div><div class="stat-item"><span class="stat-label">Duration</span><span class="stat-value">${plan.duration} Days</span></div></div><button class="btn-invest-premium" data-plan-id="${plan.id}" data-type="vip" style="background: linear-gradient(135deg, #eab308, #ca8a04);">Join VIP</button></div></div>`;
    });
    appContent.innerHTML = `<div class="page-container"><div class="page-header"><h2>VIP Promotions</h2></div><div class="product-grid-wc">${vipHTML}</div></div>`;
};

const renderTeamPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Team Data...</p>';
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
            `<div class="placeholder-card" style="text-align: center; padding: 30px;"><p style="color: #666;">No team members found yet.</p></div>` :
            teamMembers.map(member => `
                <div style="background: #fff; padding: 15px; border-radius: 10px; margin-bottom: 10px; border: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="margin: 0; font-size: 14px;">${member.name || 'User'}</h4>
                        <small style="color: #888;">Joined: ${new Date(member.joined_date).toLocaleDateString()}</small>
                    </div>
                    <div style="text-align: right;">
                        <span style="display: block; font-size: 12px; color: #888;">Wallet</span>
                        <strong style="color: #10b981;">₦${Number(member.balance || 0).toLocaleString()}</strong>
                    </div>
                </div>`).join('');

        appContent.innerHTML = `
            <div class="page-container">
                <div class="page-header"><h2>My Team</h2></div>
                ${getReferralCardHTML(refCode)}
                <div class="balance-card" style="margin-bottom: 20px; background: linear-gradient(135deg, #6a0dad, #8e24aa);">
                    <small style="color: #e1bee7;">Total Referral Commission</small>
                    <h2 style="color: white; margin-top: 5px;">₦ ${Number(totalCommission).toLocaleString()}</h2>
                    <p style="color: #e1bee7; font-size: 12px;">Total Members: ${data.team_count || 0}</p>
                </div>
                <div style="margin-bottom: 15px;"><h3 style="font-size: 16px; margin-bottom: 10px;">Team List</h3>${teamHTML}</div>
            </div>`;
    } catch (error) { appContent.innerHTML = '<p style="text-align:center;">Error loading team data.</p>'; }
};

const renderSetPinPage = async () => {
    appContent.innerHTML = `
        <div class="page-container">
            <div class="page-header"><h2>Security PIN</h2></div>
            <div style="background:white; padding:30px; border-radius:20px; text-align:center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <p style="color:#555; margin-bottom:20px;">Create a 4-digit PIN to secure your withdrawals.</p>
                <form id="pinForm">
                    <div class="form-group">
                        <label style="font-weight:bold;">Enter 4-Digit PIN</label>
                        <input type="password" id="pinInput" maxlength="4" pattern="[0-9]*" inputmode="numeric" required style="text-align:center; letter-spacing:10px; font-size:24px; padding:15px; border-radius:12px; border:2px solid #ddd; width:80%; margin:0 auto; display:block;">
                    </div>
                    <button type="submit" class="btn-deposit" style="width:100%; margin-top:20px; padding:15px; border-radius:12px;">Save Security PIN</button>
                </form>
            </div>
        </div>`;

    document.getElementById('pinForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const pin = document.getElementById('pinInput').value;
        if (pin.length !== 4) return alert("PIN must be exactly 4 digits.");
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/users/set-pin`, { method: 'POST', body: JSON.stringify({ pin }) });
            const data = await res.json();
            if (res.ok) { 
                showSuccessModal("PIN Set Successfully!"); 
                setTimeout(() => { window.location.hash = '#me'; router(); }, 2000);
            } else { alert(data.message || "Failed to set PIN"); }
        } catch (err) { alert("Error connecting to server"); }
    });
};

const renderActiveInvestmentsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Investments...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/dashboard`, { method: 'GET' });
        const data = await response.json();
        const investments = data.active_investments || [];

        if (investments.length === 0) {
            appContent.innerHTML = `<div class="page-container"><div class="page-header"><h2>My Investments</h2></div><div class="placeholder-card" style="text-align:center; padding: 40px;"><p style="color: #666;">You have no active investments.</p><a href="#products" class="btn-deposit" style="display:inline-block; margin-top:10px; padding:10px 20px; border-radius:10px; text-decoration:none;">Start Investing</a></div></div>`;
            return;
        }

        let html = investments.map(inv => `
            <div class="product-card-wc" style="padding:15px; margin-bottom:15px; border-left: 5px solid #10b981;">
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div>
                        <h4 style="margin:0; font-size:16px;">${inv.itemname || 'Investment Plan'}</h4>
                        <small style="color:#666;">Daily: <span style="color:#10b981; font-weight:bold;">₦${Number(inv.daily_earning).toLocaleString()}</span></small>
                    </div>
                    <div style="text-align:right;">
                        <span class="days-left-badge" style="background:${inv.days_left > 5 ? '#10b981' : '#ef4444'}; color:white; padding:4px 10px; border-radius:15px; font-size:11px;">${inv.days_left} Days Left</span>
                    </div>
                </div>
                <div style="margin-top:10px; padding-top:10px; border-top:1px dashed #eee; display:flex; justify-content:space-between; font-size:13px;">
                    <span>Invested: <strong>₦${Number(inv.amount || inv.price).toLocaleString()}</strong></span>
                    <span>Total Earned: <strong>₦${Number(inv.total_earning).toLocaleString()}</strong></span>
                </div>
            </div>
        `).join('');

        appContent.innerHTML = `<div class="page-container"><div class="page-header"><h2>Active Plans</h2></div>${html}</div>`;
    } catch (e) { appContent.innerHTML = '<p style="text-align:center;">Could not load investments.</p>'; }
};

const renderMePage = async () => { 
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Syncing Profile...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        if (!response || !response.ok) throw new Error();
        
        const data = await response.json();
        const user = data.balance || {};
        const refCode = user.own_referral_code || user.referral_code || data.referral_code || 'N/A';
        const fullName = user.full_name || 'JJB24 User';
        const phone = user.phone_number || '';
        const uniqueReferralLink = `${window.location.origin}/#register?ref=${refCode}`;

        appContent.innerHTML = `
            <div class="page-container" style="padding:20px;">
                <div class="profile-header-card" style="background:white; padding:20px; border-radius:20px; text-align:center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <div class="profile-icon" style="width:70px; height:70px; background:#f3e8ff; color:#6a0dad; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; font-size:24px;"><i class="fas fa-user"></i></div>
                    <h3 style="margin-bottom:5px;">${fullName}</h3>
                    <p style="color:#666; font-size:14px;">${phone}</p>
                    <div class="referral-box" style="background: #f4f4f4; border-radius: 12px; padding: 15px; margin-top: 15px; text-align: center; border: 1px dashed #6a0dad;">
                        <small style="font-weight:bold; color:#555;">SHARE LINK & EARN 5%</small>
                        <div style="margin-top:10px; background: #fff; padding: 10px; border-radius: 8px; font-size: 11px; word-break: break-all; color: #666; border: 1px solid #eee;">${uniqueReferralLink}</div>
                        <div style="display: flex; justify-content: space-between; align-items:center; margin-top: 10px;">
                            <strong style="color:#6a0dad; font-size: 18px;">${refCode}</strong>
                            <button onclick="window.copyReferralLink('${refCode}')" class="btn-deposit" style="padding:8px 20px; font-size:12px; border-radius:8px !important; cursor:pointer;">COPY LINK</button>
                        </div>
                    </div>
                </div>
                <div class="action-list-card" style="margin-top:20px; background:white; border-radius:20px; overflow:hidden;">
                    <a href="#set-pin" class="action-list-item" style="display:flex; justify-content:space-between; padding:18px; border-bottom:1px solid #f0f0f0; text-decoration:none; color:#333;">
                        <span><i class="fas fa-lock" style="width:25px; color:#6a0dad;"></i> Set Transaction PIN</span><i class="fas fa-chevron-right" style="color:#ccc;"></i>
                    </a>
                    <a href="#history" class="action-list-item" style="display:flex; justify-content:space-between; padding:18px; border-bottom:1px solid #f0f0f0; text-decoration:none; color:#333;">
                        <span><i class="fas fa-history" style="width:25px; color:#6a0dad;"></i> History</span><i class="fas fa-chevron-right" style="color:#ccc;"></i>
                    </a>
                    <a href="#team" class="action-list-item" style="display:flex; justify-content:space-between; padding:18px; border-bottom:1px solid #f0f0f0; text-decoration:none; color:#333;">
                        <span><i class="fas fa-users" style="width:25px; color:#6a0dad;"></i> My Team</span><i class="fas fa-chevron-right" style="color:#ccc;"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="window.logoutUser()" class="action-list-item" style="display:flex; padding:18px; text-decoration:none; color:#ef4444; font-weight:bold;">
                        <span><i class="fas fa-sign-out-alt" style="width:25px;"></i> Logout</span>
                    </a>
                </div>
            </div>`;
    } catch(e) { 
        appContent.innerHTML = '<div style="text-align:center; padding:50px;"><p>Sync Error. Please check connection.</p></div>';
    }
};

// ==========================================
// ADJUSTED: renderDepositPage (FIXED MANUAL SYSTEM)
// ==========================================
const renderDepositPage = async () => { 
    appContent.innerHTML = `
        <div class="page-container" style="padding:20px;">
            <div class="page-header"><h2>Deposit Funds</h2></div>
            
            <div style="background: #1e293b; color: white; padding: 25px; border-radius: 20px; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.15);">
                <small style="opacity:0.7; text-transform:uppercase; letter-spacing:1px;">Transfer to Account Below</small>
                <h3 style="margin: 15px 0 5px 0; color: #10b981; font-size: 26px;">6669586597</h3>
                <p style="margin:0; font-weight:bold; font-size:16px;">JJB BRANDED WINES LTD</p>
                <p style="margin:0; opacity:0.8;">Moniepoint MFB</p>
                <div style="margin-top:15px; padding-top:15px; border-top: 1px solid rgba(255,255,255,0.1); font-size:12px; color: #fbbf24;">
                    <i class="fas fa-info-circle"></i> Transfer first, then upload your receipt below.
                </div>
            </div>

            <div class="withdraw-card" style="background:white; padding:20px; border-radius:20px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <form id="manualDepositForm">
                    <div class="form-group" style="margin-bottom:15px;">
                        <label>Amount Transferred (₦)</label>
                        <input type="number" id="depositAmount" placeholder="e.g. 5000" required 
                               style="width:100%; padding:12px; border:1px solid #ddd; border-radius:10px; font-size: 16px;">
                    </div>
                    <div class="form-group" style="margin-bottom:15px;">
                        <label>Upload Payment Proof (Screenshot)</label>
                        <input type="file" id="receiptFile" accept="image/*" required 
                               style="width:100%; padding:10px; border:1px dashed #6a0dad; border-radius:10px; background:#f3e8ff;">
                    </div>
                    <button type="submit" id="submitBtn" class="btn-deposit" style="width:100%; padding:15px; border-radius:12px; font-weight:800; cursor:pointer;">SUBMIT FOR APPROVAL</button>
                </form>
            </div>
        </div>`;

    const form = document.getElementById('manualDepositForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevents page reload
        
        const amount = document.getElementById('depositAmount').value;
        const fileInput = document.getElementById('receiptFile');
        
        if (!fileInput.files[0]) {
            return alert("Please select a screenshot of your receipt.");
        }

        // Prepare File Data
        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('receipt', fileInput.files[0]);

        // UI Feedback
        submitBtn.disabled = true;
        submitBtn.innerText = "UPLOADING...";

        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/transactions/upload-receipt`, {
                method: 'POST',
                body: formData // Browser handles headers for FormData
            });

            if (response && response.ok) {
                showSuccessModal('Receipt submitted! Admin will verify your payment shortly.');
                setTimeout(() => { window.location.hash = '#home'; router(); }, 3000);
            } else {
                const errorData = await response.json();
                alert('Upload failed: ' + (errorData.message || 'Please try again.'));
                submitBtn.disabled = false;
                submitBtn.innerText = "SUBMIT FOR APPROVAL";
            }
        } catch (error) {
            console.error("Upload Error:", error);
            alert('A network error occurred. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerText = "SUBMIT FOR APPROVAL";
        }
    });
};

const renderWithdrawPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`, { method: 'GET' });
        const data = await response.json();
        const balance = data.balance?.balance || 0;
        appContent.innerHTML = `
            <div class="page-container"><div class="page-header"><h2>Request Withdrawal</h2></div><div class="withdraw-card"><div class="balance-display"><small>Available Balance</small><p>₦ ${Number(balance).toLocaleString()}</p></div><form id="withdrawForm">
            
            <div class="form-group">
                <label for="amount">Amount (NGN)</label>
                <input type="number" id="amount" min="800" step="0.01" placeholder="Minimum ₦800" required />
                <small style="color: #666; font-size: 11px;">Minimum withdrawal is ₦800</small>
            </div>

            <div id="feeContainer" style="background: #fff8e1; border: 1px solid #ffecb3; padding: 10px; border-radius: 8px; margin-bottom: 15px; font-size: 13px; color: #666; display: none;">
                <div style="display: flex; justify-content: space-between;"><span>Fee (9%):</span><span id="feeDisplay" style="color: #d32f2f;">- ₦0.00</span></div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #eee; padding-top: 5px;"><span>Receive:</span><span id="finalDisplay" style="color: #388e3c;">₦0.00</span></div>
            </div>
            
            <div class="form-group"><label>Bank Name</label>
            <select id="bankName" required style="width:100%; padding:12px; border-radius:8px; border:1px solid #ddd; background:white;">
                <option value="">Select Bank</option>
                <optgroup label="Popular Fintech">
                    <option value="Paycom">OPay (Paycom)</option>
                    <option value="PalmPay">PalmPay</option>
                    <option value="Kuda Bank">Kuda Bank</option>
                    <option value="Moniepoint Microfinance Bank">Moniepoint</option>
                </optgroup>
                <optgroup label="Commercial Banks">
                    <option value="Access Bank">Access Bank</option>
                    <option value="Guaranty Trust Bank">GTB</option>
                    <option value="Zenith Bank">Zenith Bank</option>
                    <option value="United Bank for Africa">UBA</option>
                    <option value="First Bank of Nigeria">First Bank</option>
                </optgroup>
            </select>
            </div>
            
            <div class="form-group"><label>Account Number</label><input type="text" id="accountNumber" required /></div><div class="form-group"><label>Account Name</label><input type="text" id="accountName" required /></div>
            
            <div class="form-group" style="margin-top:15px; padding-top:15px; border-top:1px dashed #ccc;">
                <label style="color:#d32f2f; font-weight:bold;">Withdrawal PIN</label>
                <input type="password" id="withdrawPin" maxlength="4" placeholder="Enter 4-digit PIN" required style="letter-spacing: 5px; text-align:center;" />
            </div>

            <button type="submit" class="btn-withdraw" style="width:100%; padding:15px; margin-top:10px; border-radius:8px;">Submit Request</button></form></div></div>`;
        
        const amountInput = document.getElementById('amount');
        amountInput.addEventListener('input', () => {
            const val = parseFloat(amountInput.value);
            if (!isNaN(val) && val > 0) {
                const fee = val * 0.09; const final = val - fee;
                document.getElementById('feeDisplay').textContent = '- ₦' + fee.toLocaleString();
                document.getElementById('finalDisplay').textContent = '₦' + final.toLocaleString();
                document.getElementById('feeContainer').style.display = 'block';
            } else document.getElementById('feeContainer').style.display = 'none';
        });
        
        document.getElementById('withdrawForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const val = parseFloat(amountInput.value);
            if (val < 800) return alert("Minimum withdrawal amount is ₦800");

            const res = await fetchWithAuth(`${API_BASE_URL}/payment/withdraw`, { 
                method:'POST', 
                body: JSON.stringify({ 
                    amount: val, 
                    bank_name: document.getElementById('bankName').value, 
                    account_number: document.getElementById('accountNumber').value, 
                    account_name: document.getElementById('accountName').value,
                    pin: document.getElementById('withdrawPin').value
                }) 
            });
            const r = await res.json(); 
            if(r.ok) showSuccessModal(r.message); else alert(r.message);
        });
    } catch (error) { appContent.innerHTML = '<p>Error loading page.</p>'; }
};

const renderRewardsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Rewards...</p>';
    let refCode = 'N/A';
    try {
        const userRes = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        const userData = await userRes.json();
        refCode = userData.balance?.own_referral_code || 'N/A';
    } catch(e) {}

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/reward-history`, { method: 'GET' });
        const data = await response.json();
        const rewardList = data.rewards || [];
        const summary = data.summary || { total_rewards: 0 };

        let itemsHTML = rewardList.length === 0 ? 
            `<div class="placeholder-card" style="text-align:center; padding: 40px;"><p style="color: #666;">No earnings yet.</p></div>` :
            rewardList.map(item => `
                <div style="background: #fff; border-radius: 10px; padding: 15px; margin-bottom: 10px; border-left: 5px solid ${item.type === 'referral_bonus' ? '#8b5cf6' : '#10b981'}; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <h4 style="margin: 0; font-size: 14px; text-transform: capitalize;">${item.source}</h4>
                        <small style="color: #888;">${new Date(item.date).toLocaleDateString()}</small>
                    </div>
                    <strong style="color: ${item.type === 'referral_bonus' ? '#8b5cf6' : '#10b981'}; font-size: 16px;">+₦${Number(item.amount).toLocaleString()}</strong>
                </div>`).join('');

        appContent.innerHTML = `
            <div class="page-container">
                <div class="page-header"><h2>My Rewards</h2></div>
                ${getReferralCardHTML(refCode)}
                <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
                    <small>Accumulated ROI</small>
                    <h1 style="margin: 5px 0;">₦ ${Number(summary.total_rewards).toLocaleString()}</h1>
                </div>
                <div style="margin-bottom: 10px;"><h3 style="font-size: 16px; color: #333;">Reward History</h3></div>
                ${itemsHTML}
            </div>`;
    } catch (e) { appContent.innerHTML = '<p>Error loading rewards.</p>'; }
};

const renderHistoryPage = async () => {
    appContent.innerHTML = '<p style="text-align:center; margin-top:50px;">Loading History...</p>';
    const res = await fetchWithAuth(`${API_BASE_URL}/payment/history`, { method:'GET' });
    const data = await res.json();
    const list = (data.transactions || []).map(t => `<div style="background:#fff; padding:15px; border-radius:10px; margin-bottom:10px; border:1px solid #eee; display:flex; justify-content:space-between;"><div><strong style="text-transform:uppercase; font-size:12px;">${t.type.replace(/_/g, ' ')}</strong><br><small>${new Date(t.created_at).toLocaleDateString()}</small></div><strong style="color:${t.amount > 0 ? 'green' : 'red'};">₦${Number(Math.abs(t.amount)).toLocaleString()}</strong></div>`).join('');
    appContent.innerHTML = `<div class="page-container"><h2>Full History</h2><div style="padding: 15px 0;">${list || '<p>No records found.</p>'}</div></div>`;
};

const renderSupportPage = () => { appContent.innerHTML = '<div class="page-container"><h2>Support</h2><div style="background:white; padding:30px; border-radius:20px; text-align:center;"><p>Contact support at:</p><h3 style="color:#6a0dad;">jjb24wines@gmail.com</h3></div></div>'; };
const renderCertificatePage = () => { appContent.innerHTML = `<div class="page-container" style="text-align:center;"><h2>Certificate</h2><img src="image.png" style="width:100%; border-radius: 10px;" onerror="this.style.display='none'"></div>`; };

const router = () => {
    const token = localStorage.getItem('token');
    let hash = window.location.hash || '#home';
    if (hash.includes('?')) hash = hash.split('?')[0];
    if (['#login', '#register'].includes(hash)) { bottomNav.style.display = 'none'; if(hash === '#login') renderLoginScreen(); else renderRegisterScreen(); return; }
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
        case '#my-investments': renderActiveInvestmentsPage(); break;
        default: renderHomeScreen(); 
    }
};

window.addEventListener('hashchange', router); window.addEventListener('DOMContentLoaded', router);
document.getElementById('closeModalBtn').addEventListener('click', closeModal); appContent.addEventListener('click', handleInvestClick);

// SOCIAL PROOF POPUPS
(function startSocialProof() {
    const fomoData = {
        names: ["Adewale Okafor", "Chioma Adeyemi", "Musa Ibrahim", "Ngozi Okeke", "Tunde Bakare", "Fatima Bello", "Emeka Nwosu", "Zainab Sani", "Olumide Balogun", "Aisha Mohammed", "Chinedu Eze", "Yusuf Abdullahi", "Funke Adegoke", "Grace Okafor", "Ahmed Suleiman", "Kehinde Alabi", "Amaka Onwuka", "Ibrahim Kabiru", "Toyin Oladipo", "Chika Nnaji", "Sadiq Umar", "Bisi Akindele", "Ifeanyi Okonkwo", "Halima Yusuf", "Seun Adebayo", "Uche Obi", "Maryam Abubakar", "Femi Olayinka", "Nneka Umeh", "Aliyu Garba", "Bolaji Coker", "Ogechi Ibe", "Kabiru Haruna", "Tola Fashola", "Chidi Okpara", "Rukayat Hassan", "Kunle Afolabi", "Ebele Chukwu", "Mustapha Idris", "Yemi Ojo", "Chinwe Dike", "Hauwa Adamu", "Segun Ogundipe", "Amarachi Eze", "Usman Bello", "Simi Adeola", "Obinna Uche", "Khadija Salihu", "Rotimi Cole", "Ada Obi", "Bashir Aminu", "Bukola Ayeni", "Kelechi Ibeh", "Nafisa Musa", "Jide Soweto", "Chinyere Kalu", "Aminu Kano", "Lola Omotola", "Emeka Ugochukwu", "Zarah Ahmed", "Tope Adeniyi", "Ify Nwachukwu", "Sani Danladi", "Remi Coker", "Chuks Okereke", "Farida Lawal", "Wale Tinubu", "Oby Ezekwesili", "Yakubu Moses", "Folake Adeyemi", "Chigozie Obi", "Rakiya Sani", "Bayo Adekunle", "Nkiru Okoye", "Isah Mohammed", "Titilayo Ajayi", "Collins Eke", "Jumoke Adeleke", "Abba Kyari", "Ronke Odusanya", "Prince Okon", "Asabe Kabir", "Deji Olanrewaju", "Chi-Chi Okoro", "Balarabe Musa", "Sola Sobowale", "Ebube Nnamdi", "Lami George", "Femi Falana", "Uju Nwafor", "Gambo Shehu", "Kemi Adetiba", "Pascal Atuma", "Hassana Garba", "Lanre Olusola", "Anita Okoye", "Shehu Shagari", "Bimbo Akintola", "Ikechukwu Uche", "Salamatu Bako"],
        locations: ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan"],
        actions: [ { text: "just registered", icon: "👤", color: "#3b82f6" }, { text: "invested ₦50,000", icon: "💰", color: "#10b981" }, { text: "invested ₦100,000", icon: "💰", color: "#10b981" }, { text: "joined VIP Gold", icon: "🍷", color: "#eab308" }, { text: "withdrew ₦15,000", icon: "🏦", color: "#f43f5e" } ],
        times: ["Just now", "2 secs ago", "5 secs ago"]
    };
    const style = document.createElement('style');
    style.innerHTML = `#fomo-popup { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%) translateY(200%); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.8); border-left: 5px solid #10B981; padding: 12px 16px; border-radius: 16px; box-shadow: 0 10px 40px -5px rgba(0, 0, 0, 0.15); font-family: sans-serif; z-index: 9999; transition: all 0.5s ease; display: flex; align-items: center; gap: 15px; width: 90%; max-width: 380px; pointer-events: none; } #fomo-popup.show { transform: translateX(-50%) translateY(0); } .fomo-icon-box { width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; background: #f3f4f6; flex-shrink: 0; } .fomo-content { display: flex; flex-direction: column; } .fomo-name { font-size: 14px; font-weight: 800; color: #111; } .fomo-desc { font-size: 13px; color: #555; } .fomo-meta { font-size: 11px; color: #999; margin-top: 2px; }`;
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
    setTimeout(showNotification, 2000); setInterval(() => { showNotification(); }, 12000);
})();
