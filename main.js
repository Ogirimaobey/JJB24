// ==========================================
// 1. CONFIGURATION & STYLING INJECTION
// ==========================================

const styleSheet = document.createElement("style");
styleSheet.innerText = `
    /* PREMIUM BUTTONS */
    .btn-deposit { background: linear-gradient(135deg, #10b981, #059669) !important; color: white !important; font-weight: 800 !important; border: none !important; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4) !important; text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s ease; cursor: pointer; }
    .btn-withdraw { background: linear-gradient(135deg, #ef4444, #b91c1c) !important; color: white !important; font-weight: 800 !important; border: none !important; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4) !important; text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s ease; cursor: pointer; }
    
    /* PRODUCT CARDS */
    .product-grid-wc { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; padding: 10px 0; }
    .product-card-wc { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 30px rgba(0,0,0,0.08); border: 1px solid #f0f0f0; transition: transform 0.2s ease; display: flex; flex-direction: column; }
    .product-card-wc:hover { transform: translateY(-5px); }
    .product-image-wc { height: 180px; width: 100%; position: relative; }
    .product-image-wc img { width: 100%; height: 100%; object-fit: cover; }
    .card-badge { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: bold; backdrop-filter: blur(4px); }
    .product-info-wc { padding: 20px; display: flex; flex-direction: column; gap: 15px; }
    .product-title { font-size: 1.2rem; font-weight: 800; color: #1f2937; margin: 0; line-height: 1.2; }
    .product-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #f9fafb; padding: 10px; border-radius: 12px; }
    .stat-item { display: flex; flex-direction: column; }
    .stat-label { font-size: 10px; color: #6b7280; text-transform: uppercase; font-weight: 600; }
    .stat-value { font-size: 14px; font-weight: 700; color: #111; }
    .btn-invest-premium { background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; font-weight: 700; border: none; padding: 14px; border-radius: 12px; width: 100%; cursor: pointer; font-size: 14px; transition: all 0.2s; }
    
    /* MODAL */
    #successModal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; justify-content: center; align-items: center; backdrop-filter: blur(8px); background: rgba(0, 0, 0, 0.5); z-index: 10000; }
    #successModal .modal-content { background: #fff; padding: 30px; border-radius: 24px; text-align: center; max-width: 320px; width: 85%; box-shadow: 0 20px 60px rgba(0,0,0,0.2); animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    #closeModalBtn { margin-top: 20px; padding: 12px 30px; background: #10b981; color: white; border: none; border-radius: 12px; font-weight: bold; cursor: pointer; }
`;
document.head.appendChild(styleSheet);

// DATA & GLOBALS
const API_BASE_URL = 'https://jjb24-backend.onrender.com/api';
const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');

const vipProducts = [
    { id: 101, name: 'CASPERVIP1', price: 500000, total_return: 600000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPER+VIP+1' },
    { id: 102, name: 'CASPERVIP2', price: 1000000, total_return: 1200000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPER+VIP+2' },
    { id: 103, name: 'CASPER3', price: 2000000, total_return: 2400000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPER+3' },
    { id: 104, name: 'CASPER4', price: 3000000, total_return: 3600000, duration: 30, itemimage: 'https://placehold.co/300x200/1a1a1a/ffffff?text=CASPER+4' }
];

// ==========================================
// 2. CORE HELPER FUNCTIONS
// ==========================================

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = new Headers(options.headers || {});
    if (token) headers.append('Authorization', `Bearer ${token}`);
    if (!headers.has('Content-Type') && options.body) headers.append('Content-Type', 'application/json');
    try {
        const response = await fetch(url, { ...options, headers });
        if (response.status === 401 || response.status === 403) { logoutUser(); return null; }
        return response;
    } catch (e) { return null; }
};

const logoutUser = () => { localStorage.removeItem('token'); window.location.hash = '#login'; router(); };

const showSuccessModal = (message) => {
    const modal = document.getElementById('successModal');
    const msg = document.getElementById('modalMessage');
    if (msg) msg.innerHTML = `<i class="fas fa-check-circle" style="font-size: 48px; color: #10b981; margin-bottom: 15px; display:block;"></i><span style="font-size: 18px; font-weight: 700; color: #333;">${message}</span>`;
    if (modal) modal.style.display = 'flex';
};

const closeModal = () => { document.getElementById('successModal').style.display = 'none'; router(); };

const getReferralFromUrl = () => {
    const parts = window.location.hash.split('?ref=');
    return parts.length > 1 ? parts[1].split('&')[0] : '';
};

const copyReferralLink = async (referralCode) => {
    if (!referralCode || referralCode === 'N/A') { alert('No referral code available.'); return; }
    const fullLink = `${window.location.origin}/#register?ref=${referralCode}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try { await navigator.clipboard.writeText(fullLink); showSuccessModal('Referral link copied!'); return; } catch (err) { }
    }
    prompt("Copy your referral link:", fullLink);
};

// ==========================================
// 3. ACTION HANDLERS
// ==========================================

const handleLogin = async (e) => {
    e.preventDefault();
    const loginIdentifier = document.getElementById('loginIdentifier').value.trim();
    const password = document.getElementById('password').value;
    const isEmail = loginIdentifier.includes('@');
    const payload = { password, email: isEmail ? loginIdentifier : '', phone: isEmail ? '' : loginIdentifier };
    
    try {
        const res = await fetch(`${API_BASE_URL}/users/login`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
        const data = await res.json();
        if (!res.ok) return alert(data.message);
        localStorage.setItem('token', data.token);
        window.location.hash = '#home';
        router();
    } catch (err) { alert("Server connection failed."); }
};

const handleRegister = async (e) => {
    e.preventDefault();
    const payload = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        referral: document.getElementById('referral').value || undefined
    };
    if (payload.password !== document.getElementById('cpassword').value) return alert("Passwords match error");
    
    try {
        const res = await fetch(`${API_BASE_URL}/users/register`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
        const data = await res.json();
        if (!res.ok) return alert(data.message);
        alert("OTP sent to your email!");
        renderOTPVerificationScreen(payload.email);
    } catch (err) { alert("Registration error."); }
};

const handleOTPVerification = async (e, email) => {
    e.preventDefault();
    const otp = document.getElementById('otpCode').value;
    try {
        const res = await fetch(`${API_BASE_URL}/users/verify-otp`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email, otp }) });
        if (!res.ok) return alert("Invalid OTP");
        showSuccessModal("Phone verified!");
        renderLoginScreen();
    } catch (err) { alert("Verification failed."); }
};

const handleInvestClick = async (e) => {
    if (e.target.classList.contains('btn-invest-premium')) {
        const itemId = e.target.dataset.planId;
        const type = e.target.dataset.type;
        if (!confirm("Confirm this investment?")) return;
        
        let url = `${API_BASE_URL}/investments/createInvestment/${itemId}`;
        if (type === 'vip') url = `${API_BASE_URL}/investments/createVipInvestment/${itemId}`;

        try {
            const res = await fetchWithAuth(url, { method: 'POST' });
            const data = await res.json();
            if (data.success) { showSuccessModal("Investment Successful!"); } 
            else { alert(data.message); }
        } catch (err) { alert("Investment error."); }
    }
};

// ==========================================
// 4. RENDER FUNCTIONS
// ==========================================

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `<div class="auth-container"><div class="auth-logo">JJB24</div><h2>Login</h2><form id="loginForm"><div class="form-group"><label>Email or Phone</label><input type="text" id="loginIdentifier" required /></div><div class="form-group"><label>Password</label><input type="password" id="password" required /></div><button type="submit" class="btn-auth">Login</button></form><p class="auth-link">No account? <a href="#register">Register</a></p></div>`;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
};

const renderRegisterScreen = () => {
    bottomNav.style.display = 'none';
    const ref = getReferralFromUrl();
    appContent.innerHTML = `<div class="auth-container"><div class="auth-logo">JJB24</div><h2>Register</h2><form id="registerForm"><div class="form-group"><label>Full Name</label><input type="text" id="fullName" required /></div><div class="form-group"><label>Email</label><input type="email" id="email" required /></div><div class="form-group"><label>Phone</label><input type="tel" id="phone" required /></div><div class="form-group"><label>Password</label><input type="password" id="password" required /></div><div class="form-group"><label>Confirm</label><input type="password" id="cpassword" required /></div><div class="form-group"><label>Referral Code</label><input type="text" id="referral" value="${ref}" /></div><button type="submit" class="btn-auth">Sign Up</button></form></div>`;
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

const renderOTPVerificationScreen = (email) => {
    appContent.innerHTML = `<div class="auth-container"><h2>Verify</h2><p>OTP sent to ${email}</p><form id="otpForm"><input type="text" id="otpCode" placeholder="6-digit code" required /><button type="submit" class="btn-auth">Verify</button></form></div>`;
    document.getElementById('otpForm').addEventListener('submit', (e) => handleOTPVerification(e, email));
};

const renderHomeScreen = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Dashboard...</p>';
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        const data = await res.json();
        const balance = data.balance.balance || 0;
        appContent.innerHTML = `
            <div class="top-header"><h4>Hello, ${data.balance.full_name.split(' ')[0]}</h4></div>
            <div class="balance-card"><small>Available Balance</small><h2>₦ ${Number(balance).toLocaleString()}</h2>
            <div class="header-buttons" style="display:flex; gap:10px; margin-top:15px;"><a href="#deposit" class="btn-deposit" style="flex:1; text-align:center; padding:12px; border-radius:10px; text-decoration:none;">Deposit</a><a href="#withdraw" class="btn-withdraw" style="flex:1; text-align:center; padding:12px; border-radius:10px; text-decoration:none;">Withdraw</a></div></div>
            <div class="home-content"><div class="quick-actions" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; margin-top:20px;"><a href="#team" class="action-button"><i class="fas fa-users"></i><span>Team</span></a><a href="#history" class="action-button"><i class="fas fa-history"></i><span>History</span></a><a href="#rewards" class="action-button"><i class="fas fa-gift"></i><span>Rewards</span></a></div></div>`;
    } catch (e) { logoutUser(); }
};

const renderProductsPage = async () => {
    appContent.innerHTML = '<p style="text-align:center; margin-top:50px;">Loading Products...</p>';
    const res = await fetchWithAuth(`${API_BASE_URL}/users/allItems`);
    const data = await res.json();
    const items = data.items.map(item => `
        <div class="product-card-wc"><div class="product-image-wc"><img src="${item.itemimage}"><span class="card-badge">HOT</span></div>
        <div class="product-info-wc"><h4 class="product-title">${item.itemname}</h4>
        <div class="product-stats"><div class="stat-item"><span class="stat-label">Price</span><span class="stat-value">₦${Number(item.price).toLocaleString()}</span></div><div class="stat-item"><span class="stat-label">Daily</span><span class="stat-value">₦${Number(item.dailyincome).toLocaleString()}</span></div></div>
        <button class="btn-invest-premium" data-plan-id="${item.id}" data-type="regular">Invest Now</button></div></div>`).join('');
    appContent.innerHTML = `<div class="page-container"><h2>Products</h2><div class="product-grid-wc">${items}</div></div>`;
};

const renderVipPage = () => {
    const items = vipProducts.map(plan => `
        <div class="product-card-wc" style="border: 1px solid #ffd700;"><div class="product-image-wc"><img src="${plan.itemimage}"><span class="card-badge" style="background:#eab308;">VIP</span></div>
        <div class="product-info-wc"><h4>${plan.name}</h4><div class="product-stats"><div class="stat-item"><span class="stat-label">Price</span><span class="stat-value">₦${plan.price.toLocaleString()}</span></div><div class="stat-item"><span class="stat-label">ROI</span><span class="stat-value">₦${plan.total_return.toLocaleString()}</span></div></div>
        <button class="btn-invest-premium" data-plan-id="${plan.id}" data-type="vip" style="background:linear-gradient(135deg, #eab308, #ca8a04);">Join VIP</button></div></div>`).join('');
    appContent.innerHTML = `<div class="page-container"><h2>VIP Plans</h2><div class="product-grid-wc">${items}</div></div>`;
};

// --- SAHIL'S NEW UNIFIED ENDPOINTS (PR #58) ---
const renderHistoryPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading History...</p>';
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
        const data = await res.json();
        const history = (data.transactions || []).map(t => {
            const isPlus = ["deposit", "referral_bonus", "investment_roi"].includes(t.type);
            return `
            <div style="background:#fff; padding:15px; border-radius:12px; margin-bottom:10px; border:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
                <div><strong style="display:block; font-size:13px; text-transform:uppercase;">${t.type.replace(/_/g, ' ')}</strong><small style="color:#888;">${new Date(t.created_at).toLocaleDateString()}</small></div>
                <strong style="color:${isPlus ? '#10b981' : '#ef4444'};">${isPlus ? '+' : '-'}₦${Number(Math.abs(t.amount)).toLocaleString()}</strong>
            </div>`;
        }).join('');
        appContent.innerHTML = `<div class="page-container"><h2>Activity History</h2>${history || '<p>No activity yet.</p>'}</div>`;
    } catch (e) { appContent.innerHTML = '<p>Error loading history.</p>'; }
};

const renderTeamPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Team...</p>';
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/referrals`);
        const data = await res.json();
        const list = (data.referrals || []).map(m => `<div style="background:#fff; padding:12px; border-radius:10px; margin-bottom:10px; display:flex; justify-content:space-between; border:1px solid #eee;"><span>${m.full_name}</span><strong style="color:#10b981;">+₦${Number(m.commission_earned || 0).toLocaleString()}</strong></div>`).join('');
        appContent.innerHTML = `<div class="page-container"><h2>My Team</h2><div style="background:linear-gradient(135deg, #6a0dad, #8e24aa); color:white; padding:20px; border-radius:15px; margin-bottom:20px; text-align:center;"><small>Total Referral Earnings</small><h2>₦${Number(data.total_commission || 0).toLocaleString()}</h2></div>${list || '<p>No team members yet.</p>'}</div>`;
    } catch (e) { appContent.innerHTML = '<p>Error loading team.</p>'; }
};

const renderRewardsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Rewards...</p>';
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/reward-history`);
        const data = await res.json();
        const items = (data.history || []).map(h => `
            <div style="background:#fff; padding:12px; border-radius:10px; margin-bottom:8px; border-left:5px solid #10b981; display:flex; justify-content:space-between;">
                <div><small>${new Date(h.created_at).toLocaleDateString()}</small><br><strong>${h.type.replace(/_/g, ' ')}</strong></div>
                <strong style="color:#10b981;">+₦${Number(h.amount).toLocaleString()}</strong>
            </div>`).join('');
        appContent.innerHTML = `<div class="page-container"><h2>Rewards</h2><div style="background:linear-gradient(135deg, #10b981, #059669); color:white; padding:20px; border-radius:15px; text-align:center; margin-bottom:20px;"><small>Total Income</small><h2>₦${Number(data.total_daily_income || 0).toLocaleString()}</h2></div>${items || '<p>No rewards yet.</p>'}</div>`;
    } catch (e) { appContent.innerHTML = '<p>Error loading rewards.</p>'; }
};

const renderDepositPage = async () => { 
    appContent.innerHTML = `<div class="page-container"><h2>Deposit</h2><form id="depositForm"><input type="number" id="amount" placeholder="Amount" required /><button type="submit" class="btn-deposit" style="width:100%; margin-top:10px;">Deposit Now</button></form></div>`;
    document.getElementById('depositForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const res = await fetchWithAuth(`${API_BASE_URL}/payment/initialize`, { method: 'POST', body: JSON.stringify({ amount }) });
        const result = await res.json();
        if(result.success) window.location.href = result.data.paymentLink;
    });
};

const renderWithdrawPage = async () => {
    appContent.innerHTML = `<div class="page-container"><h2>Withdraw</h2><form id="withdrawForm"><input type="number" id="amount" placeholder="Amount" required /><input type="text" id="bankName" placeholder="Bank" required /><input type="text" id="accNo" placeholder="Account Number" required /><button type="submit" class="btn-withdraw" style="width:100%; margin-top:10px;">Withdraw</button></form></div>`;
    document.getElementById('withdrawForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = { amount: document.getElementById('amount').value, bank_name: document.getElementById('bankName').value, account_number: document.getElementById('accNo').value };
        const res = await fetchWithAuth(`${API_BASE_URL}/payment/withdraw`, { method: 'POST', body: JSON.stringify(payload) });
        const result = await res.json();
        if(res.ok) showSuccessModal("Withdrawal Requested!");
    });
};

// ==========================================
// 5. ROUTER & SOCIAL PROOF
// ==========================================

const router = () => {
    const token = localStorage.getItem('token');
    let hash = window.location.hash || '#home';
    if (!token && !['#login', '#register'].includes(hash)) hash = '#login';
    bottomNav.style.display = (['#login', '#register'].includes(hash)) ? 'none' : 'flex';

    switch(hash) {
        case '#home': renderHomeScreen(); break;
        case '#products': renderProductsPage(); break;
        case '#vip': renderVipPage(); break;
        case '#team': renderTeamPage(); break;
        case '#history': renderHistoryPage(); break;
        case '#rewards': renderRewardsPage(); break;
        case '#login': renderLoginScreen(); break;
        case '#register': renderRegisterScreen(); break;
        case '#deposit': renderDepositPage(); break;
        case '#withdraw': renderWithdrawPage(); break;
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
appContent.addEventListener('click', handleInvestClick);

// SOCIAL PROOF
(function startSocialProof() {
    const fomoData = { names: ["Musa I.", "Chioma E.", "Tunde B.", "Ngozi O.", "Emeka A."], actions: ["registered", "invested ₦50k", "joined VIP", "withdrew ₦15k"] };
    const popup = document.createElement('div');
    popup.id = 'fomo-popup';
    document.body.appendChild(popup);
    setInterval(() => {
        if(window.location.hash !== '#home' && window.location.hash !== '') return;
        const name = fomoData.names[Math.floor(Math.random() * 5)];
        const action = fomoData.actions[Math.floor(Math.random() * 4)];
        popup.innerHTML = `<div style="position:fixed; bottom:80px; left:20px; background:white; padding:10px 15px; border-radius:12px; box-shadow:0 10px 20px rgba(0,0,0,0.1); border-left:5px solid #10b981; z-index:9999;"><strong>${name}</strong> ${action}</div>`;
        setTimeout(() => popup.innerHTML = '', 4000);
    }, 15000);
})();
