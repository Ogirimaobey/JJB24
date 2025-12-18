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

const copyReferralLink = async (referralCode) => {
    if (!referralCode || referralCode === 'N/A') { alert('No referral code available.'); return; }
    const fullLink = `${window.location.origin}/#register?ref=${referralCode}`;
    try { await navigator.clipboard.writeText(fullLink); showSuccessModal('Referral link copied!'); } catch (err) { prompt("Copy your referral link:", fullLink); }
};

const getReferralFromUrl = () => {
    const fullHash = window.location.hash;
    if (fullHash.includes('?ref=')) { const parts = fullHash.split('?ref='); if (parts.length > 1) return parts[1].split('&')[0]; }
    return '';
};

const logoutUser = () => { localStorage.removeItem('token'); window.location.hash = '#login'; router(); };

// fetchWithAuth - The Silent Guard
const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = new Headers(options.headers || {});
    if (token) headers.append('Authorization', `Bearer ${token}`);
    if (!headers.has('Content-Type') && options.body) headers.append('Content-Type', 'application/json');
    try {
        const response = await fetch(url, { ...options, headers });
        if (response.status === 401) { logoutUser(); return null; }
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
    const isEmail = loginIdentifier.includes('@');
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, email: isEmail ? loginIdentifier : '', phone: isEmail ? '' : loginIdentifier }) });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        localStorage.setItem('token', result.token); window.location.hash = '#home'; router();
    } catch (error) { alert('Could not connect to server.'); }
};

const handleRegister = async (event) => {
    event.preventDefault();
    const payload = { 
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        password: document.getElementById('password').value,
        referralCode: document.getElementById('referral').value.trim() || undefined 
    };
    if (!document.getElementById('termsCheckbox').checked) return alert('You must agree to terms.');
    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        alert(`OTP sent to ${payload.email}.`); renderOTPVerificationScreen(payload.email);
    } catch (error) { alert('Could not connect to server.'); }
};

const handleOTPVerification = async (event, email) => {
    event.preventDefault(); const otpCode = document.getElementById('otpCode').value;
    try {
        const response = await fetch(`${API_BASE_URL}/users/verify-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp: otpCode }) });
        const result = await response.json();
        if (!response.ok) return alert(`Error: ${result.message}`);
        showSuccessModal('Account verified!'); renderLoginScreen();
    } catch (error) { alert('Verification failed.'); }
};

const handleInvestClick = async (event) => {
    if (event.target.classList.contains('btn-invest-premium')) {
        const itemId = event.target.dataset.planId;
        const investType = event.target.dataset.type;
        if (!confirm(`Are you sure you want to invest?`)) return;
        let endpoint = investType === 'vip' ? `${API_BASE_URL}/investments/createVipInvestment/${itemId}` : `${API_BASE_URL}/investments/createInvestment/${itemId}`;
        try {
            const response = await fetchWithAuth(endpoint, { method: 'POST' });
            const result = await response.json();
            if (response && response.ok && result.success) { showSuccessModal('Investment Successful!'); setTimeout(() => { window.location.hash = '#home'; router(); }, 2000); }
            else { alert('Error: ' + (result.message || 'Failed.')); }
        } catch (error) { alert('Investment error.'); }
    }
};

// ==========================================
// 5. RENDER FUNCTIONS
// ==========================================

const renderHomeScreen = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Dashboard...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        const data = await response.json();
        const user = data.balance || {};
        
        let activityHTML = "<p>No recent activity.</p>";
        const histRes = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
        if (histRes && histRes.ok) {
            const histData = await histRes.json();
            if (histData.success && histData.transactions.length > 0) {
                activityHTML = histData.transactions.slice(0, 4).map(txn => 
                    `<div style="display:flex; justify-content:space-between; padding: 10px; border-bottom: 1px solid #eee;">
                        <span style="font-size: 13px; font-weight: bold; color: #555;">${txn.type.replace(/_/g, ' ')}</span>
                        <span style="color:${txn.amount > 0 ? 'green' : 'red'}; font-weight:bold;">₦${Number(Math.abs(txn.amount)).toLocaleString()}</span>
                    </div>`).join('');
            }
        }

        appContent.innerHTML = `
            <div class="top-header"><div class="user-greeting"><h4>Hello, ${user.full_name.split(' ')[0]}</h4><p>Welcome back!</p></div><div class="profile-icon"><i class="fas fa-user"></i></div></div>
            <div class="balance-card"><small>Total Assets (NGN)</small><h2>₦ ${Number(user.balance).toLocaleString()}</h2><div class="header-buttons" style="gap: 15px;"><a href="#deposit" class="btn-deposit" style="flex:1; text-align:center; padding: 12px; border-radius: 12px; text-decoration:none;">Deposit</a><a href="#withdraw" class="btn-withdraw" style="flex:1; text-align:center; padding: 12px; border-radius: 12px; text-decoration:none;">Withdraw</a></div></div>
            <div class="home-content"><div class="quick-actions">
                <a href="#certificate" class="action-button"><i class="fas fa-file-certificate"></i><span>Certificate</span></a>
                <a href="#team" class="action-button"><i class="fas fa-users"></i><span>Team</span></a>
                <a href="#history" class="action-button"><i class="fas fa-history"></i><span>History</span></a>
                <a href="#support" class="action-button"><i class="fas fa-headset"></i><span>Support</span></a>
                <a href="#rewards" class="action-button"><i class="fas fa-gift"></i><span>Rewards</span></a>
            </div><div class="activity-card"><h3>Recent Activity</h3><div class="activity-list">${activityHTML}</div></div></div>`;
    } catch (error) { logoutUser(); }
};

// --- MERGED AGGRESSIVE FIX ---
const renderMePage = async () => { 
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Syncing Profile...</p>';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        if (!response || !response.ok) throw new Error();
        const data = await response.json();
        
        // --- THE AGGRESSIVE FIX: Mapping keys exactly to backend ---
        const user = data.balance || {};
        const refCode = user.own_referral_code || user.referral_code || data.referral_code || 'N/A';
        const uniqueReferralLink = `${window.location.origin}/#register?ref=${refCode}`;

        appContent.innerHTML = `
            <div class="page-container" style="padding:20px;">
                <div class="profile-header-card" style="background:white; padding:20px; border-radius:20px; text-align:center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <div class="profile-icon" style="width:70px; height:70px; background:#f3e8ff; color:#6a0dad; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; font-size:24px;"><i class="fas fa-user"></i></div>
                    <h3 style="margin-bottom:5px;">${user.full_name || 'User'}</h3>
                    <p style="color:#666; font-size:14px;">${user.phone_number || ''}</p>
                    <div class="referral-box" style="background: #f4f4f4; border-radius: 12px; padding: 15px; margin-top: 15px; text-align: center; border: 1px dashed #6a0dad;">
                        <small style="font-weight:bold; color:#555;">SHARE LINK & EARN 5%</small>
                        <div style="margin-top:10px; background: #fff; padding: 10px; border-radius: 8px; font-size: 11px; word-break: break-all; color: #666; border: 1px solid #eee;">
                            ${uniqueReferralLink}
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items:center; margin-top: 10px;">
                            <strong style="color:#6a0dad; font-size: 18px;">${refCode}</strong>
                            <button onclick="copyReferralLink('${refCode}')" class="btn-deposit" style="padding:8px 20px; font-size:12px; border-radius:8px !important; cursor:pointer;">COPY LINK</button>
                        </div>
                    </div>
                </div>
                <div class="action-list-card" style="margin-top:20px; background:white; border-radius:20px; overflow:hidden;">
                    <a href="#history" class="action-list-item" style="display:flex; justify-content:space-between; padding:18px; border-bottom:1px solid #f0f0f0; text-decoration:none; color:#333;">
                        <span><i class="fas fa-history" style="width:25px; color:#6a0dad;"></i> History</span><i class="fas fa-chevron-right" style="color:#ccc;"></i>
                    </a>
                    <a href="#team" class="action-list-item" style="display:flex; justify-content:space-between; padding:18px; border-bottom:1px solid #f0f0f0; text-decoration:none; color:#333;">
                        <span><i class="fas fa-users" style="width:25px; color:#6a0dad;"></i> My Team</span><i class="fas fa-chevron-right" style="color:#ccc;"></i>
                    </a>
                    <a href="#" onclick="logoutUser()" class="action-list-item" style="display:flex; padding:18px; text-decoration:none; color:#ef4444; font-weight:bold;">
                        <span><i class="fas fa-sign-out-alt" style="width:25px;"></i> Logout</span>
                    </a>
                </div>
            </div>`;
    } catch(e) { appContent.innerHTML = '<div style="text-align:center; padding:50px;"><p>Sync Error. Please check backend connection.</p></div>'; }
};

const renderProductsPage = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}/users/allItems`);
    const data = await response.json();
    const productHTML = data.items.map(item => `
        <div class="product-card-wc"><div class="product-image-wc"><span class="card-badge">HOT</span><img src="${item.itemimage}" onerror="this.src='https://placehold.co/300x200/6a0dad/ffffff?text=Product'"></div><div class="product-info-wc"><h4 class="product-title">${item.itemname}</h4><div class="product-stats"><div class="stat-item"><span class="stat-label">Price</span><span class="stat-value price">₦${Number(item.price).toLocaleString()}</span></div><div class="stat-item"><span class="stat-label">Daily</span><span class="stat-value roi">₦${Number(item.dailyincome).toLocaleString()}</span></div><div class="stat-item"><span class="stat-label">Duration</span><span class="stat-value">${item.duration} Days</span></div></div><button class="btn-invest-premium" data-plan-id="${item.id}" data-type="regular">Invest Now</button></div></div>
    `).join('');
    appContent.innerHTML = `<div class="page-container"><div class="page-header"><h2>Products</h2></div><div class="product-grid-wc">${productHTML}</div></div>`;
};

const renderTeamPage = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}/users/referrals`);
    const data = await response.json();
    const teamHTML = (data.team_list || []).map(m => `
        <div style="background: #fff; padding: 15px; border-radius: 10px; margin-bottom: 10px; border: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
            <div><h4 style="margin: 0; font-size: 14px;">${m.name || 'User'}</h4><small style="color: #888;">Joined: ${new Date(m.joined_date).toLocaleDateString()}</small></div>
            <strong style="color: #10b981;">₦${Number(m.balance || 0).toLocaleString()}</strong>
        </div>`).join('');
    appContent.innerHTML = `<div class="page-container"><div class="balance-card" style="background: linear-gradient(135deg, #6a0dad, #8e24aa);"><h2>₦ ${Number(data.total_commission || 0).toLocaleString()}</h2><small>Total Commission</small></div>${teamHTML || '<p>No team yet.</p>'}</div>`;
};

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `<div class="auth-container"><div class="auth-logo">JJB24</div><form id="loginForm"><input type="text" id="loginIdentifier" placeholder="Phone/Email" required /><input type="password" id="password" placeholder="Password" required /><button type="submit" class="btn-deposit">Login</button></form></div>`;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
};

const renderRegisterScreen = () => {
    bottomNav.style.display = 'none';
    const autoRefCode = getReferralFromUrl();
    appContent.innerHTML = `<div class="auth-container"><h2>Create Account</h2><form id="registerForm"><input type="text" id="fullName" placeholder="Full Name" required /><input type="email" id="email" placeholder="Email" required /><input type="tel" id="phone" placeholder="Phone" required /><input type="password" id="password" placeholder="Password" required /><input type="password" id="cpassword" placeholder="Confirm" required /><input type="text" id="referral" value="${autoRefCode}" ${autoRefCode ? 'readonly' : ''} /><input type="checkbox" id="termsCheckbox" required /> Agree to Terms<button type="submit" class="btn-deposit">Register</button></form></div>`;
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

const renderOTPVerificationScreen = (email) => {
    appContent.innerHTML = `<div class="auth-container"><h2>Verify</h2><p>${email}</p><form id="otpForm"><input type="text" id="otpCode" required /><button type="submit" class="btn-deposit">Verify</button></form></div>`;
    document.getElementById('otpForm').addEventListener('submit', (e) => handleOTPVerification(e, email));
};

const router = () => {
    const token = localStorage.getItem('token');
    let hash = window.location.hash || '#home';
    if (hash.includes('?')) hash = hash.split('?')[0];
    if (['#login', '#register'].includes(hash)) { bottomNav.style.display = 'none'; if(hash === '#login') renderLoginScreen(); else renderRegisterScreen(); return; }
    if (!token) { logoutUser(); return; }
    bottomNav.style.display = 'flex';
    switch (hash) {
        case '#home': renderHomeScreen(); break;
        case '#products': renderProductsPage(); break;
        case '#team': renderTeamPage(); break;
        case '#me': renderMePage(); break;
        case '#rewards': renderTeamPage(); break; 
        default: renderHomeScreen(); 
    }
};

window.addEventListener('hashchange', router); window.addEventListener('DOMContentLoaded', router);
appContent.addEventListener('click', handleInvestClick);

// SOCIAL PROOF POPUPS
(function startSocialProof() {
    const fomoData = {
        names: ["Musa Ibrahim", "Chioma Eze", "Tunde Bakare", "Ngozi Okafor", "Emeka Adebayo"],
        actions: [{ text: "just registered", icon: "👤", color: "#3b82f6" }, { text: "invested ₦50,000", icon: "💰", color: "#10b981" }]
    };
    const style = document.createElement('style');
    style.innerHTML = `#fomo-popup { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%) translateY(200%); background: rgba(255, 255, 255, 0.95); border-left: 5px solid #10B981; padding: 12px 16px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); z-index: 9999; transition: all 0.5s ease; display: flex; align-items: center; gap: 15px; width: 90%; max-width: 380px; } #fomo-popup.show { transform: translateX(-50%) translateY(0); }`;
    document.head.appendChild(style);
    const popup = document.createElement('div'); popup.id = 'fomo-popup'; popup.innerHTML = `<div id="fomo-icon">👋</div><div class="fomo-content"><span id="fomo-name" style="font-weight:bold;"></span> <span id="fomo-action"></span></div>`;
    document.body.appendChild(popup);
    function showNotification() {
        if(window.location.hash !== '#home' && window.location.hash !== '') return; 
        const name = fomoData.names[Math.floor(Math.random() * fomoData.names.length)];
        const actionObj = fomoData.actions[Math.floor(Math.random() * fomoData.actions.length)];
        document.getElementById('fomo-name').innerText = name; 
        document.getElementById('fomo-action').innerText = actionObj.text;
        document.getElementById('fomo-popup').classList.add('show');
        setTimeout(() => document.getElementById('fomo-popup').classList.remove('show'), 4000);
    }
    setInterval(showNotification, 12000);
})();
