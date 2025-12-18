// ==========================================
// 1. CONFIGURATION & STYLING INJECTION
// ==========================================

// --- INJECT PREMIUM CSS STYLES ---
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


// 2. DATA CONFIGURATION (VIP Products)
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

const copyReferralLink = async (referralCode) => {
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

const logoutUser = () => { localStorage.removeItem('token'); window.location.hash = '#login'; router(); };

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = new Headers(options.headers || {});
    if (token) headers.append('Authorization', `Bearer ${token}`);
    if (!headers.has('Content-Type') && options.body) headers.append('Content-Type', 'application/json');
    try {
        const response = await fetch(url, { ...options, headers });
        if (response.status === 401 || response.status === 403) { alert('Session expired.'); logoutUser(); return null; }
        return response;
    } catch (e) { console.error("Network Error", e); return null; }
};


// ==========================================
// 4. ACTION HANDLERS
// ==========================================

const handleLogin = async (event) => {
    event.preventDefault();
    const loginIdentifier = document.getElementById('loginIdentifier').value.trim();
    const password = document.getElementById('password').value;
    if (!loginIdentifier || !password) return alert('Please provide email/phone and password.');
    const isEmail = loginIdentifier.includes('@');
    const loginData = { password: password, email: isEmail ? loginIdentifier : '', phone: isEmail ? '' : loginIdentifier };
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
        const payload = { fullName, phone, email, password, referral: referral || undefined };
        const response = await fetch(`${API_BASE_URL}/users/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        alert(`OTP sent to ${email}. Please check your inbox.`); renderOTPVerificationScreen(email);
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
        
        let endpoint = `${API_BASE_URL}/investments/createInvestment/${itemId}`;
        if (investType === 'vip') endpoint = `${API_BASE_URL}/investments/createVipInvestment/${itemId}`;

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
        
        // --- FETCH UNIFIED HISTORY FOR RECENT ACTIVITY ---
        let activityHTML = "<p>No recent activity.</p>";
        try {
            const histRes = await fetchWithAuth(`${API_BASE_URL}/payment/history`, { method: 'GET' });
            if (histRes && histRes.ok) {
                const histData = await histRes.json();
                if (histData.success && histData.transactions.length > 0) {
                    activityHTML = histData.transactions.slice(0, 3).map(txn => 
                        `<div style="display:flex; justify-content:space-between; padding: 10px; border-bottom: 1px solid #eee;">
                            <span style="text-transform: capitalize;">${txn.type.replace(/_/g, ' ')}</span>
                            <span style="color:${txn.amount > 0 ? 'green' : 'red'}; font-weight:bold;">₦${Number(Math.abs(txn.amount)).toLocaleString()}</span>
                        </div>`
                    ).join('');
                }
            }
        } catch(e) {}

        appContent.innerHTML = `
            <div class="top-header"><div class="user-greeting"><h4>Hello, ${fullName.split(' ')[0]}</h4><p>Welcome back!</p></div><div class="profile-icon"><i class="fas fa-user"></i></div></div>
            <div class="balance-card"><small>Total Assets (NGN)</small><h2>₦ ${Number(balance).toLocaleString()}</h2><div class="header-buttons" style="gap: 15px;"><a href="#deposit" class="btn-deposit" style="flex:1; text-align:center; padding: 12px; border-radius: 12px; text-decoration:none;">Deposit</a><a href="#withdraw" class="btn-withdraw" style="flex:1; text-align:center; padding: 12px; border-radius: 12px; text-decoration:none;">Withdraw</a></div></div>
            <div class="home-content"><div class="quick-actions"><a href="#certificate" class="action-button"><i class="fas fa-file-certificate"></i><span>Certificate</span></a><a href="#team" class="action-button"><i class="fas fa-users"></i><span>Team</span></a><a href="#history" class="action-button"><i class="fas fa-history"></i><span>History</span></a><a href="#support" class="action-button"><i class="fas fa-headset"></i><span>Support</span></a><a href="#rewards" class="action-button"><i class="fas fa-gift"></i><span>Rewards</span></a></div><div class="activity-card"><h3>Recent Activity</h3><div class="activity-list">${activityHTML}</div></div></div>`;
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

// --- CONNECTED: RENDER TEAM PAGE ---
const renderTeamPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Team Data...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/referrals`, { method: 'GET' });
        if (!response || !response.ok) throw new Error('Failed');

        const data = await response.json();
        const teamMembers = data.referrals || [];
        const totalCommission = data.total_commission || 0; 
        
        let teamHTML = teamMembers.length === 0 ? 
            `<div class="placeholder-card" style="text-align: center; padding: 30px;"><p style="color: #666;">No team members yet.</p></div>` :
            teamMembers.map(member => `
                <div style="background: #fff; padding: 15px; border-radius: 10px; margin-bottom: 10px; border: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                    <div><h4 style="margin: 0; font-size: 14px;">${member.full_name}</h4><small style="color: #888;">Joined: ${new Date(member.created_at).toLocaleDateString()}</small></div>
                    <div style="text-align: right;"><strong style="color: #10b981;">+₦${Number(member.commission_earned || 0).toLocaleString()}</strong></div>
                </div>`).join('');

        appContent.innerHTML = `<div class="page-container"><div class="page-header"><h2>My Team</h2></div><div class="balance-card" style="margin-bottom: 20px; background: linear-gradient(135deg, #6a0dad, #8e24aa);"><small style="color: #e1bee7;">Total Team Commission</small><h2 style="color: white; margin-top: 5px;">₦ ${Number(totalCommission).toLocaleString()}</h2><p style="color: #e1bee7; font-size: 12px;">Total Members: ${teamMembers.length}</p></div><div style="margin-bottom: 15px;"><h3 style="font-size: 16px; margin-bottom: 10px;">Team List</h3>${teamHTML}</div><div style="background: #f9f9f9; padding: 15px; border-radius: 10px; font-size: 12px; color: #666;"><strong>Commission:</strong><br>Earn 5% on every direct referral investment.</div></div>`;
    } catch (error) { appContent.innerHTML = '<p style="text-align:center;">Error loading team page.</p>'; }
};

const renderMePage = async () => { 
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`, { method: 'GET' });
        if (!response || !response.ok) throw new Error();
        const data = await response.json();
        const finalReferralCode = data.balance.referral_code || 'N/A';
        appContent.innerHTML = `
            <div class="page-container"><div class="profile-header-card"><div class="profile-icon"><i class="fas fa-user"></i></div><h3>${data.balance.full_name}</h3><p>${data.balance.phone_number}</p><div class="referral-box" style="background: #f4f4f4; border-radius: 8px; padding: 10px; margin-top: 15px; text-align: center;"><small>My Referral Code:</small><div style="display: flex; justify-content: space-between; margin-top: 5px; background: #fff; padding: 5px 10px; border-radius: 5px;"><strong id="referralCode">${finalReferralCode}</strong><button id="copyReferralBtn" class="btn-copy" style="background: #6a0dad; color: white; border: none; border-radius: 5px;">Copy</button></div></div></div><div class="action-list-card"><a href="#history" class="action-list-item"><i class="fas fa-history"></i><span>History</span><i class="fas fa-chevron-right"></i></a><a href="#team" class="action-list-item"><i class="fas fa-users"></i><span>Team</span><i class="fas fa-chevron-right"></i></a><a href="#" id="logoutButton" class="action-list-item"><i class="fas fa-sign-out-alt"></i><span>Logout</span><i class="fas fa-chevron-right"></i></a></div></div>`;
        document.getElementById('logoutButton').addEventListener('click', (e) => { e.preventDefault(); logoutUser(); });
        document.getElementById('copyReferralBtn').addEventListener('click', () => copyReferralLink(finalReferralCode));
    } catch(e) { logoutUser(); }
};

const renderTaskPage = async () => { appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Use Rewards Tab for Earnings.</p>'; };

const renderDepositPage = async () => { 
    appContent.innerHTML = `
        <div class="page-container">
            <div class="page-header"><h2>Deposit Funds</h2></div>
            <div class="withdraw-card">
                <form id="depositForm">
                    <div class="form-group"><label for="amount">Amount (NGN)</label><input type="number" id="amount" min="1" step="0.01" required placeholder="Enter amount" /></div>
                    <button type="submit" class="btn-deposit" style="width:100%; padding:15px; margin-top:10px; border-radius:8px;">Proceed to Payment</button>
                </form>
            </div>
        </div>`;

    document.getElementById('depositForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/payment/initialize`, {
                method: 'POST',
                body: JSON.stringify({ amount: parseFloat(amount) })
            });
            const result = await response.json();
            if (result.success && result.data.paymentLink) window.location.href = result.data.paymentLink;
            else alert(result.message);
        } catch (error) { alert('An error occurred.'); }
    });
};

const renderWithdrawPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`, { method: 'GET' });
        const data = await response.json();
        const balance = data.balance?.balance || 0;
        
        appContent.innerHTML = `
            <div class="page-container"><div class="page-header"><h2>Request Withdrawal</h2></div><div class="withdraw-card"><div class="balance-display"><small>Available Balance</small><p>₦ ${Number(balance).toLocaleString()}</p></div><form id="withdrawForm"><div class="form-group"><label for="amount">Amount (NGN)</label><input type="number" id="amount" min="1" step="0.01" required /></div><div id="feeContainer" style="background: #fff8e1; border: 1px solid #ffecb3; padding: 10px; border-radius: 8px; margin-bottom: 15px; font-size: 13px; color: #666; display: none;"><div style="display: flex; justify-content: space-between;"><span>Fee (9%):</span><span id="feeDisplay" style="color: red;">- ₦0.00</span></div><div style="display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #eee; padding-top: 5px;"><span>Receive:</span><span id="finalDisplay" style="color: green;">₦0.00</span></div></div><div class="form-group"><label>Bank Name</label><input type="text" id="bankName" required /></div><div class="form-group"><label>Account Number</label><input type="text" id="accountNumber" required /></div><button type="submit" class="btn-withdraw" style="width:100%; padding:15px; margin-top:10px; border-radius:8px;">Submit Request</button></form></div></div>`;
        
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

        document.getElementById('withdrawForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const amount = parseFloat(amountInput.value);
            if (amount > balance) return alert('Insufficient balance.');
            try {
                const res = await fetchWithAuth(`${API_BASE_URL}/payment/withdraw`, {
                    method: 'POST',
                    body: JSON.stringify({ amount, bank_name: document.getElementById('bankName').value, account_number: document.getElementById('accountNumber').value })
                });
                const result = await res.json();
                if (res.ok) showSuccessModal(result.message); else alert(result.message);
            } catch (error) { alert('An error occurred.'); }
        });
    } catch (error) { appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Error loading page.</p>'; }
};

// --- CONNECTED: RENDER REWARDS PAGE ---
const renderRewardsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Rewards...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/reward-history`, { method: 'GET' });
        const data = await response.json();
        const totalDailyReward = data.total_daily_income || 0;
        const rewardHistory = data.history || [];

        let detailsHTML = rewardHistory.length === 0 ? 
            `<div class="placeholder-card" style="text-align:center; padding: 40px;"><p style="color: #666;">No earnings yet.</p></div>` :
            rewardHistory.map(item => `
                <div style="background: #fff; border-radius: 10px; padding: 15px; margin-bottom: 10px; border-left: 5px solid ${item.type === 'referral' ? '#8b5cf6' : '#10b981'};">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0; font-size: 15px; text-transform: capitalize;">${item.type.replace(/_/g, ' ')}</h4>
                            <small style="color: #888;">${new Date(item.created_at).toLocaleDateString()}</small>
                        </div>
                        <strong style="color: green; font-size: 16px;">+₦${Number(item.amount).toLocaleString()}</strong>
                    </div>
                </div>`).join('');

        appContent.innerHTML = `<div class="page-container"><div class="page-header"><h2>My Rewards</h2></div><div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; text-align: center;"><small>Accumulated Daily Income</small><h1 style="margin: 5px 0;">₦ ${Number(totalDailyReward).toLocaleString()}</h1></div><div style="margin-bottom: 10px;"><h3 style="font-size: 16px; color: #333;">Reward History</h3></div>${detailsHTML}</div>`;
    } catch (e) { appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Error loading rewards.</p>'; }
};

// --- CONNECTED: UNIFIED HISTORY PAGE ---
const renderHistoryPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading History...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/payment/history`, { method: 'GET' });
        const data = await response.json();
        const txns = data.transactions || [];
        
        let histHTML = txns.length === 0 ? '<p style="text-align:center;">No records found.</p>' :
            txns.map(t => `
            <div style="background: #fff; padding: 15px; border-radius: 10px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #eee;">
                <div><strong style="text-transform: uppercase; font-size: 12px;">${t.type.replace(/_/g, ' ')}</strong><br><small style="color: #999;">${new Date(t.created_at).toLocaleDateString()}</small></div>
                <strong style="color: ${t.amount > 0 ? 'green' : 'red'};">₦${Number(Math.abs(t.amount)).toLocaleString()}</strong>
            </div>`).join('');

        appContent.innerHTML = `<div class="page-container"><h2>Activity History</h2><div style="padding: 15px 0;">${histHTML}</div></div>`;
    } catch (e) { appContent.innerHTML = '<p style="text-align:center;">Error loading history.</p>'; }
};

const renderSupportPage = () => { appContent.innerHTML = '<div class="page-container"><h2>Support</h2><p style="text-align:center;">Email: jjb24wines@gmail.com</p></div>'; };
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
        case '#task': renderTaskPage(); break;
        case '#deposit': renderDepositPage(); break;
        case '#withdraw': renderWithdrawPage(); break;
        case '#history': renderHistoryPage(); break;
        case '#team': renderTeamPage(); break;
        case '#support': renderSupportPage(); break;
        case '#certificate': renderCertificatePage(); break;
        case '#rewards': renderRewardsPage(); break; 
        default: renderHomeScreen(); 
    }
};

window.addEventListener('hashchange', router); window.addEventListener('DOMContentLoaded', router);
document.getElementById('closeModalBtn').addEventListener('click', closeModal); appContent.addEventListener('click', handleInvestClick);

// ==========================================
// 🚀 SOCIAL PROOF (ONLY SHOWS ON HOME)
// ==========================================
(function startSocialProof() {
    const fomoData = {
        names: ["Musa Ibrahim", "Chioma Eze", "Tunde Bakare", "Ngozi Okafor", "Emeka Adebayo", "Yusuf Sani", "Fatima Bello"],
        locations: ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan"],
        actions: [ { text: "just registered", icon: "👤", color: "#3b82f6" }, { text: "invested ₦50,000", icon: "💰", color: "#10b981" }, { text: "invested ₦100,000", icon: "💰", color: "#10b981" }, { text: "joined VIP Gold", icon: "🍷", color: "#eab308" }, { text: "withdrew ₦15,000", icon: "🏦", color: "#f43f5e" } ],
        times: ["Just now", "2 secs ago", "5 secs ago"]
    };
    const style = document.createElement('style');
    style.innerHTML = `#fomo-popup { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%) translateY(200%); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.8); border-left: 5px solid #10B981; padding: 12px 16px; border-radius: 16px; box-shadow: 0 10px 40px -5px rgba(0, 0, 0, 0.15); font-family: sans-serif; z-index: 9999; transition: all 0.5s ease; display: flex; align-items: center; gap: 15px; width: 90%; max-width: 380px; pointer-events: none; } #fomo-popup.show { transform: translateX(-50%) translateY(0); } .fomo-icon-box { width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; background: #f3f4f6; flex-shrink: 0; } .fomo-content { display: flex; flex-direction: column; } .fomo-name { font-size: 14px; font-weight: 800; color: #111; } .fomo-desc { font-size: 13px; color: #555; } .fomo-meta { font-size: 11px; color: #999; margin-top: 2px; }`;
    document.head.appendChild(style);
    const popup = document.createElement('div'); popup.id = 'fomo-popup'; popup.innerHTML = `<div class="fomo-icon-box" id="fomo-icon">👋</div><div class="fomo-content"><span class="fomo-name" id="fomo-name">...</span><span class="fomo-desc" id="fomo-action">...</span><span class="fomo-meta"><span id="fomo-location">Lagos</span> • <span id="fomo-time">Just now</span></span></div>`;
    document.body.appendChild(popup);
    function showNotification() {
        const hash = window.location.hash; if(hash !== '#home' && hash !== '') return; 
        const name = fomoData.names[Math.floor(Math.random() * fomoData.names.length)];
        const loc = fomoData.locations[Math.floor(Math.random() * fomoData.locations.length)];
        const actionObj = fomoData.actions[Math.floor(Math.random() * fomoData.actions.length)];
        const time = fomoData.times[Math.floor(Math.random() * fomoData.times.length)];
        document.getElementById('fomo-name').innerText = name; document.getElementById('fomo-action').innerText = actionObj.text; document.getElementById('fomo-location').innerText = loc; document.getElementById('fomo-time').innerText = time; document.getElementById('fomo-icon').innerText = actionObj.icon;
        const elPopup = document.getElementById('fomo-popup'); const elIcon = document.getElementById('fomo-icon'); elPopup.style.borderLeftColor = actionObj.color; elIcon.style.background = actionObj.color + '20'; elIcon.style.color = actionObj.color;
        elPopup.classList.add('show'); setTimeout(() => { elPopup.classList.remove('show'); }, 4000);
    }
    setTimeout(showNotification, 2000); setInterval(() => { showNotification(); }, 12000);
})();
