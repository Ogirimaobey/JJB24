// ==========================================
// 1. CONFIGURATION & STYLING INJECTION (PREMIUM FINTECH SHELL)
// ==========================================

const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    :root {
        --accent-primary: #8B5CF6; /* Electric Violet */
        --accent-success: #10B981; /* Emerald */
        --accent-danger: #EF4444;  /* Rose */
        --bg-main: #F8FAFC;        /* Slate 50 */
        --text-dark: #0F172A;      /* Deep Slate for high visibility */
        --text-muted: #475569;     
        --card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04);
        --nav-height: 75px;
    }

    /* THE APP-CENTRIC FRAMEWORK (MACBOOK FIX) */
    body { 
        font-family: 'Plus Jakarta Sans', sans-serif !important; 
        background: #E2E8F0; /* MacBook Desktop Background */
        margin: 0; 
        display: flex;
        justify-content: center;
        min-height: 100vh;
        color: var(--text-dark);
    }

    #app-content {
        background: var(--bg-main);
        width: 100%;
        max-width: 500px; /* Centered Frame */
        min-height: 100vh;
        position: relative;
        box-shadow: 0 0 100px rgba(0,0,0,0.1);
        padding-bottom: 110px;
        overflow-x: hidden;
    }

    /* INFORMATION HIERARCHY & FONTS (BOLD & VISIBLE) */
    h2, h3, h4, strong { color: var(--text-dark) !important; font-weight: 800 !important; }
    p, span, label { font-weight: 600; color: var(--text-dark); }

    /* GLOBAL BUTTONS WITH TACTILE FEEDBACK */
    .btn-deposit, .btn-withdraw, .btn-invest-premium, .btn-auth, #closeModalBtn {
        border: none !important; border-radius: 18px !important;
        font-weight: 800 !important; letter-spacing: -0.2px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex; align-items: center; justify-content: center; gap: 8px;
        cursor: pointer;
    }
    .btn-deposit:active, .btn-withdraw:active, .btn-invest-premium:active { transform: scale(0.96); }

    .btn-deposit { background: var(--accent-success) !important; color: white !important; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3) !important; }
    .btn-withdraw { background: #1E293B !important; color: white !important; }
    .btn-invest-premium { background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; padding: 16px; }

    /* PREMIUM BALANCE CARD (THE HERO) */
    .balance-card {
        background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
        margin: 0 20px 25px; padding: 35px 25px; border-radius: 32px;
        color: white !important; position: relative; overflow: hidden;
        box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.3);
    }
    .balance-card h2 { font-size: 38px !important; margin: 10px 0 25px; color: white !important; }
    .balance-card small { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; font-weight: 700; color: white !important; }

    /* PRODUCT CARDS (GLASSMORPHISM) */
    .product-grid-wc { display: flex; flex-direction: column; gap: 20px; padding: 15px; }
    .product-card-wc {
        background: white; border-radius: 28px; overflow: hidden;
        border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--card-shadow);
    }
    .product-image-wc { height: 180px; position: relative; }
    .product-image-wc img { width: 100%; height: 100%; object-fit: cover; }
    .card-badge {
        position: absolute; top: 15px; left: 15px;
        background: rgba(255, 255, 255, 0.95); color: var(--text-dark);
        padding: 6px 14px; border-radius: 12px; font-size: 11px; font-weight: 800;
        backdrop-filter: blur(4px); box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    /* BOTTOM NAVIGATION RESTORATION */
    .bottom-nav {
        position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
        width: 100%; max-width: 500px; height: var(--nav-height);
        background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);
        display: flex; justify-content: space-around; align-items: center;
        border-top: 1px solid #E2E8F0; z-index: 10000; padding-bottom: 10px;
    }
    .nav-link { text-decoration: none; color: #94A3B8; display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; transition: 0.3s; }
    .nav-link.active { color: var(--accent-primary); }
    .nav-link i { font-size: 20px; }
    .nav-link span { font-size: 10px; font-weight: 700; }

    /* MODAL STYLING */
    #whatsappModal, #successModal {
        display: none; position: fixed; top: 0; left: 50%; transform: translateX(-50%);
        width: 100%; max-width: 500px; height: 100%;
        justify-content: center; align-items: center;
        backdrop-filter: blur(8px); background: rgba(0, 0, 0, 0.5); z-index: 20000;
    }
    .modal-content {
        background: #fff; padding: 40px 30px; border-radius: 32px;
        text-align: center; max-width: 320px; width: 85%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    .btn-whatsapp { background: #25D366; color: white !important; font-weight: 800; padding: 16px; border-radius: 15px; text-decoration: none; display: block; margin-top: 20px; }

    /* INPUTS */
    .form-group input, .security-input, select { 
        width: 100%; padding: 18px; border-radius: 20px; border: 1.5px solid #E2E8F0; 
        background: #F8FAFC; box-sizing: border-box; font-weight: 700; font-size: 16px;
        color: var(--text-dark) !important;
    }
    .form-group label { display: block; font-size: 13px; font-weight: 800; margin-bottom: 8px; color: var(--text-muted); }
`;
document.head.appendChild(styleSheet);

// ==========================================
// 2. MODAL & DATA INJECTION
// ==========================================

const announcementDiv = document.createElement("div");
announcementDiv.id = "whatsappModal";
announcementDiv.innerHTML = `
    <div class="modal-content">
        <i class="fab fa-whatsapp" style="font-size: 50px; color: #25D366;"></i>
        <h3 style="margin: 15px 0 10px;">Official Community</h3>
        <p style="color: #666; font-size: 14px; line-height: 1.5;">Join our winery community for real-time yield updates and priority support.</p>
        <a href="https://chat.whatsapp.com/Dw76vw5BJ68FONRPd6GPUi" target="_blank" onclick="closeWhatsappModal()" class="btn-whatsapp">JOIN COMMUNITY</a>
        <button onclick="closeWhatsappModal()" style="background:none; border:none; color:#aaa; margin-top:20px; cursor:pointer; font-size:12px; font-weight:700;">Maybe later / Close</button>
    </div>
`;
document.body.appendChild(announcementDiv);

const successModalDiv = document.createElement("div");
successModalDiv.id = "successModal";
successModalDiv.innerHTML = `
    <div class="modal-content">
        <div id="modalMessage"></div>
        <button id="closeModalBtn" style="width:100%; padding:16px; background:#10b981; color:white; margin-top:25px; border-radius:15px; font-weight:800; border:none;">CONTINUE</button>
    </div>
`;
document.body.appendChild(successModalDiv);

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
// 3. HELPERS & HANDSHAKES
// ==========================================

const showSuccessModal = (message) => {
    const modalMessage = document.getElementById('modalMessage');
    if (modalMessage) modalMessage.innerHTML = `<i class="fas fa-check-circle" style="font-size: 50px; color: #10b981; margin-bottom: 20px; display:block;"></i><h3>Success</h3><p style="color:#64748B;">${message}</p>`;
    document.getElementById('successModal').style.display = 'flex';
};

const closeModal = () => {
    document.getElementById('successModal').style.display = 'none';
    if (window.location.hash !== '#home') { window.location.hash = '#home'; } else { router(); }
};

window.closeWhatsappModal = () => {
    localStorage.setItem('jjb_community_joined', 'true');
    document.getElementById('whatsappModal').style.display = 'none';
};

window.copyReferralLink = async (referralCode) => {
    if (!referralCode || referralCode === 'N/A') return;
    const fullLink = `${window.location.origin}/#register?ref=${referralCode}`;
    try { await navigator.clipboard.writeText(fullLink); showSuccessModal('Link copied!'); } catch (err) { prompt("Copy link:", fullLink); }
};

window.copyAccountNumber = (accNumber) => {
    navigator.clipboard.writeText(accNumber).then(() => {
        const copyBtn = document.getElementById('copyAccBtn');
        copyBtn.innerText = "COPIED!";
        setTimeout(() => { copyBtn.innerText = "COPY"; }, 2000);
    });
};

const logoutUser = () => { localStorage.clear(); window.location.hash = '#login'; router(); };
window.logoutUser = logoutUser;

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = new Headers(options.headers || {});
    if (token) headers.append('Authorization', `Bearer ${token}`);
    if (!(options.body instanceof FormData) && !headers.has('Content-Type') && options.body) {
        headers.append('Content-Type', 'application/json');
    }
    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) { logoutUser(); return null; }
    return response;
};

// ==========================================
// 4. ACTION HANDLERS
// ==========================================

const handleLogin = async (event) => {
    event.preventDefault();
    const id = document.getElementById('loginIdentifier').value.trim();
    const pass = document.getElementById('password').value;
    const loginData = id.includes('@') ? { email: id, password: pass } : { phone: id, password: pass };
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(loginData) });
        const result = await response.json();
        if (!response.ok) return alert(result.message);
        localStorage.setItem('token', result.token); 
        localStorage.setItem('user_email', result.user?.email || (id.includes('@') ? id : ''));
        window.location.hash = '#home'; router();
    } catch (error) { alert('Server error.'); }
};

const handleRegister = async (event) => {
    event.preventDefault();
    const payload = { 
        fullName: document.getElementById('fullName').value, 
        phone: document.getElementById('phone').value, 
        email: document.getElementById('email').value, 
        password: document.getElementById('password').value, 
        referralCode: document.getElementById('referral').value || undefined 
    };
    if (payload.password !== document.getElementById('cpassword').value) return alert('Passwords mismatch');
    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const result = await response.json();
        if (!response.ok) return alert(result.message);
        alert(`OTP sent to ${payload.email}`); renderOTPVerificationScreen(payload.email);
    } catch (error) { alert('Server error.'); }
};

const handleOTPVerification = async (e, email) => {
    e.preventDefault();
    const otp = document.getElementById('otpCode').value;
    const res = await fetch(`${API_BASE_URL}/users/verify-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp }) });
    if (res.ok) { showSuccessModal('Phone verified!'); renderLoginScreen(); } else { alert('Failed'); }
};

const handleInvestClick = async (event) => {
    if (event.target.classList.contains('btn-invest-premium') || event.target.classList.contains('btn-invest')) {
        const itemId = event.target.dataset.planId;
        const type = event.target.dataset.type;
        if (!confirm(`Activate plan?`)) return;
        const endpoint = type === 'vip' ? `${API_BASE_URL}/investments/createVipInvestment/${itemId}` : `${API_BASE_URL}/investments/createInvestment/${itemId}`;
        const res = await fetchWithAuth(endpoint, { method: 'POST' });
        const result = await res.json();
        if (res.ok && result.success) { showSuccessModal('Plan Activated!'); window.location.hash = '#home'; router(); } else { alert(result.message); }
    }
};

window.handleForgotPassword = async () => {
    const email = prompt("Enter registered email:");
    if (!email) return;
    try {
        const res = await fetch(`${API_BASE_URL}/users/forgot-password`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
        const result = await res.json(); alert(result.message);
    } catch (e) { alert("Error."); }
};

// ==========================================
// 5. RENDER FUNCTIONS
// ==========================================

const renderHomeScreen = async () => {
    if (!localStorage.getItem('jjb_community_joined')) setTimeout(() => { document.getElementById('whatsappModal').style.display = 'flex'; }, 2000);
    appContent.innerHTML = '<div style="display:flex; height:50vh; align-items:center; justify-content:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    const res = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
    const data = await res.json();
    const user = data.balance || {};
    const userEmail = user.email || localStorage.getItem('user_email');

    let complianceCardHTML = '';
    if (userEmail === 'audit@flutterwave.com') {
        complianceCardHTML = `<div style="background:white; border-radius:28px; padding:25px; margin:0 20px 25px; border-left:6px solid #F59E0B; box-shadow:var(--card-shadow);"><h3 style="margin:0; font-size:15px;">AUDIT REVIEW</h3><p style="font-size:13px; margin:10px 0 0;">CAC: Monaya Rd, Ogoja 550101, Cross River.</p></div>`;
    }

    let activityHTML = "<p style='text-align:center; font-size:12px; color:#94A3B8;'>Clean History</p>";
    try {
        const hRes = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
        const hData = await hRes.json();
        if (hData.transactions.length > 0) {
            activityHTML = hData.transactions.slice(0, 4).map(t => `
                <div class="activity-item">
                    <div><div style="font-weight:700; font-size:14px;">${t.type.replace(/_/g, ' ')}</div><small style="color:#94A3B8; font-weight:700;">${new Date(t.created_at).toLocaleDateString()}</small></div>
                    <div style="font-weight:800; color:${t.amount > 0 ? '#10B981' : '#0F172A'}; font-size:16px;">₦${Number(Math.abs(t.amount)).toLocaleString()}</div>
                </div>`).join('');
        }
    } catch(e) {}

    appContent.innerHTML = `
        <div class="top-header">
            <div class="user-greeting"><h4>Hi, ${user.full_name}</h4><p>Exclusive Member</p></div>
            <div style="width:44px; height:44px; background:white; border-radius:14px; display:flex; align-items:center; justify-content:center; box-shadow:var(--card-shadow);"><i class="fas fa-bell" style="color:#64748B;"></i></div>
        </div>
        ${complianceCardHTML}
        <div class="balance-card">
            <small>Net Assets</small>
            <h2>₦ ${Number(user.balance).toLocaleString()}</h2>
            <div style="display:flex; gap:12px;"><a href="#deposit" class="btn-deposit" style="flex:1; padding:18px; text-decoration:none;">FUND WALLET</a><a href="#withdraw" class="btn-withdraw" style="flex:1; padding:18px; text-decoration:none;">WITHDRAW</a></div>
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
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"><h3 style="margin:0; font-size:16px;">Stream</h3><a href="#history" style="font-size:12px; color:var(--accent-primary); text-decoration:none; font-weight:800;">VIEW ALL</a></div>
            <div class="activity-list">${activityHTML}</div>
        </div>`;
};

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
        <div class="auth-container">
            <div class="auth-logo">JJB24</div>
            <h2>Login</h2>
            <p style="color:#64748B; margin-bottom:40px; font-weight:700;">Manage winery assets</p>
            <form id="loginForm">
                <div class="form-group"><label>Account ID</label><input type="text" id="loginIdentifier" placeholder="Email or Phone" required /></div>
                <div class="form-group"><label>Password</label><input type="password" id="password" placeholder="••••••••" required /></div>
                <a href="javascript:void(0)" onclick="handleForgotPassword()" style="color:var(--accent-primary); font-size:13px; font-weight:800; text-decoration:none; display:block; text-align:right;">Reset key?</a>
                <button type="submit" class="btn-auth" style="width:100%; padding:20px; background: var(--accent-primary); color:white; font-size:16px; margin-top:30px; border-radius:20px !important;">SECURE LOGIN</button>
            </form>
            <p style="margin-top: 40px; font-size: 14px; font-weight:700;">New? <a href="#register" style="color: var(--accent-primary); text-decoration: none;">Open Account</a></p>
        </div>`;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
};

const renderRegisterScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `<div class="auth-container"><div class="auth-logo">JJB24</div><h2>Open Account</h2><form id="registerForm"><div class="form-group"><label>Full Name</label><input type="text" id="fullName" required /></div><div class="form-group"><label>Email Address</label><input type="email" id="email" required /></div><div class="form-group"><label>Phone Number</label><input type="tel" id="phone" required /></div><div class="form-group"><label>Password</label><input type="password" id="password" required /></div><div class="form-group"><label>Confirm</label><input type="password" id="cpassword" required /></div><div class="form-group"><label>Ref Code</label><input type="text" id="referral" /></div><button type="submit" class="btn-auth" style="width:100%; padding:20px; background: var(--accent-primary); color:white; margin-top:20px; border-radius:20px !important;">CREATE ACCOUNT</button></form></div>`;
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

const renderProductsPage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    const res = await fetchWithAuth(`${API_BASE_URL}/users/allItems`);
    const data = await res.json();
    let html = (data.items || []).map(item => `<div class="product-card-wc"><div class="product-image-wc"><span class="card-badge">HOT</span><img src="${item.itemimage}" onerror="this.src='https://placehold.co/400x300/1e293b/ffffff?text=Wine'"></div><div class="product-info-wc" style="padding:24px;"><h4 class="product-title">${item.itemname}</h4><div class="product-stats"><div class="stat-item"><span class="stat-label">Acquisition Price</span><span class="stat-value price">₦${Number(item.price).toLocaleString()}</span></div><div class="stat-item"><span class="stat-label">Daily Yield</span><span class="stat-value roi">₦${Number(item.dailyincome).toLocaleString()}</span></div></div><button class="btn-invest-premium" data-plan-id="${item.id}" data-type="regular">ACQUIRE ASSET</button></div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; margin-bottom:20px; font-size:24px;">Asset Collections</h2><div class="product-grid-wc" style="padding:0;">${html || '<p>Loading...</p>'}</div></div>`;
};

const renderVipPage = () => {
    let html = vipProducts.map(p => `<div class="product-card-wc" style="border:2px solid #EAB308;"><div class="product-image-wc"><span class="card-badge" style="background:#EAB308; color:#000;">VIP</span><img src="${p.itemimage}"></div><div class="product-info-wc" style="padding:24px;"><h4 class="product-title" style="color:#854D0E;">${p.name}</h4><div class="product-stats" style="background:#FEFCE8;"><div class="stat-item" style="background:transparent;"><span class="stat-label">Entry</span><span class="stat-value" style="color:#854D0E;">₦${p.price.toLocaleString()}</span></div><div class="stat-item" style="background:transparent;"><span class="stat-label">Forecast</span><span class="stat-value" style="color:#854D0E;">₦${p.total_return.toLocaleString()}</span></div></div><button class="btn-invest-premium" data-plan-id="${p.id}" data-type="vip" style="background:#EAB308; color:black;">CLAIM VIP SLOT</button></div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; margin-bottom:20px; font-size:24px;">VIP Private Cellar</h2><div class="product-grid-wc" style="padding:0;">${html}</div></div>`;
};

const renderMePage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    const res = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
    const data = await res.json();
    const user = data.balance || {};
    const ref = user.own_referral_code || 'N/A';
    appContent.innerHTML = `
        <div style="padding: 20px 20px 100px;">
            <div style="background: white; padding: 35px 20px; border-radius: 32px; text-align: center; box-shadow: var(--card-shadow); margin-bottom: 25px;">
                <div style="width: 80px; height: 80px; background: #F1F5F9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 28px;"><i class="fas fa-user-tie"></i></div>
                <h3 style="margin: 0;">${user.full_name}</h3>
                <p style="color: #94A3B8; font-size: 14px; font-weight:700;">${user.phone_number}</p>
                <div style="margin-top:25px;">${getReferralCardHTML(ref)}</div>
            </div>
            <div style="background: white; border-radius: 32px; overflow: hidden; box-shadow: var(--card-shadow);">
                <a href="#change-password" style="display:flex; justify-content:space-between; padding:22px; border-bottom:1px solid #F1F5F9; text-decoration:none; color:var(--text-dark); font-weight:800;"><span>Update Password</span><i class="fas fa-chevron-right" style="font-size:12px;color:#CBD5E1;"></i></a>
                <a href="${user.has_pin ? '#reset-pin' : '#set-pin'}" style="display:flex; justify-content:space-between; padding:22px; border-bottom:1px solid #F1F5F9; text-decoration:none; color:var(--text-dark); font-weight:800;"><span>Security PIN</span><i class="fas fa-chevron-right" style="font-size:12px;color:#CBD5E1;"></i></a>
                <a href="#history" style="display:flex; justify-content:space-between; padding:22px; border-bottom:1px solid #F1F5F9; text-decoration:none; color:var(--text-dark); font-weight:800;"><span>Transaction Records</span><i class="fas fa-chevron-right" style="font-size:12px;color:#CBD5E1;"></i></a>
                <a href="javascript:void(0)" onclick="window.logoutUser()" style="display:block; padding:22px; color:#EF4444; font-weight:900; text-decoration:none;">Sign Out</a>
            </div>
        </div>`;
};

const renderDepositPage = async () => {
    const acc = "6669586597";
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px; margin-bottom:25px;">Add Funds</h2><div style="background:#0F172A; color:white; padding:30px; border-radius:32px; margin-bottom:25px;"><small style="opacity:0.7; font-weight:800;">BANK TRANSFER TARGET</small><div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;"><h3 style="margin:0; font-size:26px; color:var(--accent-success);">${acc}</h3><button id="copyAccBtn" onclick="window.copyAccountNumber('${acc}')" style="background:rgba(16,185,129,0.1); border:1px solid var(--accent-success); color:var(--accent-success); padding:8px 15px; border-radius:12px; font-weight:800; font-size:10px;">COPY</button></div><div style="margin-top:20px; font-weight:800;">JJB BRANDED WINES LTD</div><div style="opacity:0.7;">Moniepoint MFB</div></div><div style="background:white; padding:30px; border-radius:32px; box-shadow:var(--card-shadow);"><form id="manualDepositForm"><div class="form-group"><label>Amount (₦)</label><input type="number" id="depositAmountInput" required></div><div class="form-group"><label>Screenshot</label><input type="file" id="receiptFileInput" accept="image/*" required></div><button type="submit" id="submitBtn" class="btn-deposit" style="width:100%; padding:18px;">SUBMIT CONFIRMATION</button></form></div></div>`;
    document.getElementById('manualDepositForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const f = new FormData(); f.append('amount', depositAmountInput.value); f.append('receipt', receiptFileInput.files[0]);
        submitBtn.disabled = true; submitBtn.innerText = "VERIFYING...";
        const res = await fetchWithAuth(`${API_BASE_URL}/payment/deposit/manual`, { method: 'POST', body: f });
        if (res && res.ok) { showSuccessModal('Audit underway!'); setTimeout(() => { window.location.hash = '#home'; router(); }, 2000); } else { submitBtn.disabled = false; alert('Failed'); }
    });
};

const renderActiveInvestmentsPage = async () => {
    const res = await fetchWithAuth(`${API_BASE_URL}/users/dashboard`);
    const data = await res.json();
    const invs = data.active_investments || [];
    let html = invs.map(inv => `<div style="background:white; border-radius:28px; padding:24px; margin-bottom:20px; box-shadow:var(--card-shadow);"><div style="display:flex; justify-content:space-between; margin-bottom:15px;"><h4 style="margin:0;">${inv.itemname || "Asset"}</h4><span style="background:#F1F5F9; color:#64748B; padding:6px 12px; border-radius:10px; font-size:10px; font-weight:800;">${inv.days_left || 0}D LEFT</span></div><div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;"><div style="background:#F8FAFC; padding:10px; border-radius:12px;"><small style="display:block; font-size:10px; opacity:0.6;">ENTRY</small><span style="font-weight:800;">₦${Number(inv.price).toLocaleString()}</span></div><div style="background:#F8FAFC; padding:10px; border-radius:12px;"><small style="display:block; font-size:10px; opacity:0.6;">DAILY</small><span style="font-weight:800; color:#10B981;">₦${Number(inv.daily_earning).toLocaleString()}</span></div></div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px; margin-bottom:25px;">My Portfolio</h2>${html || '<p style="text-align:center;">No active plans.</p>'}</div>`;
};

const renderHistoryPage_Alt = async () => {
    const res = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
    const data = await res.json();
    const list = (data.transactions || []).map(t => `<div style="background:white; border-radius:20px; padding:20px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; box-shadow:var(--card-shadow);"><div><div class="history-item-text" style="text-transform:uppercase;">${t.type.replace(/_/g, ' ')}</div><small class="history-sub-text">${new Date(t.created_at).toLocaleDateString()}</small></div><div style="color:${t.amount > 0 ? '#10B981' : '#0F172A'}; font-weight:800;">₦${Number(Math.abs(t.amount)).toLocaleString()}</div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px; margin-bottom:25px;">Vault Logs</h2>${list || '<p style="text-align:center;">No history found.</p>'}</div>`;
};

const renderRewardsPage_Alt = async () => {
    const res = await fetchWithAuth(`${API_BASE_URL}/users/reward-history`);
    const data = await res.json();
    const list = (data.rewards || []).map(r => `<div style="background:white; border-radius:20px; padding:20px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; box-shadow:var(--card-shadow);"><div><div class="history-item-text">${r.source}</div><small class="history-sub-text">${new Date(r.date).toLocaleDateString()}</small></div><div style="color:#10B981; font-weight:800;">+₦${Number(r.amount).toLocaleString()}</div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px;">Rewards</h2>${list || '<p style="text-align:center;">No rewards yet.</p>'}</div>`;
};

const renderSupportPage_Alt = () => { 
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px;">Concierge Support</h2><div style="background:white; padding:35px; border-radius:32px; text-align:center; box-shadow:var(--card-shadow);"><div style="width:70px;height:70px;background:#DCFCE7;border-radius:24px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;"><i class="fab fa-whatsapp" style="font-size:35px;color:#25D366;"></i></div><h3>WhatsApp Support</h3><p style="color:#64748B;font-size:14px;margin-bottom:25px;">Fastest response for yield queries.</p><a href="https://chat.whatsapp.com/Dw76vw5BJ68FONRPd6GPUi" target="_blank" class="btn-deposit" style="background:#25D366!important;padding:18px;text-decoration:none;">OPEN CHAT</a></div></div>`; 
};

const renderCertificatePage_Alt = () => { 
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px;">Legal Documents</h2><div style="background:white; padding:15px; border-radius:28px; box-shadow:var(--card-shadow);"><img src="image.png" style="width:100%; border-radius:20px;" onerror="this.parentElement.innerHTML='<p style=\'padding:40px;color:#94A3B8;text-align:center;\'>Verification processing...</p>'"></div></div>`; 
};

const renderSetPinPage_Alt = async () => {
    appContent.innerHTML = `<div style="padding:20px;"><h2 style="font-weight:800;">Security PIN</h2><div style="background:white; padding:40px; border-radius:28px; text-align:center; box-shadow:var(--card-shadow);"><form id="pinForm"><p style="color:#64748B;font-size:14px;margin-bottom:30px;">Set 4-digit PIN.</p><input type="password" id="pinInput" maxlength="4" style="text-align:center; font-size:32px; letter-spacing:15px;" required><button type="submit" class="btn-deposit" style="width:100%; margin-top:30px; padding:18px;">ACTIVATE PIN</button></form></div></div>`;
    document.getElementById('pinForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth(`${API_BASE_URL}/users/set-pin`, { method: 'POST', body: JSON.stringify({ pin: pinInput.value }) });
        if (res.ok) { showSuccessModal("PIN Active!"); setTimeout(() => { window.location.hash = '#me'; router(); }, 2000); } else alert("Failed.");
    });
};

const renderResetPinPage_Alt = async () => {
    appContent.innerHTML = `<div style="padding:20px;"><h2 style="font-weight:800;">Transaction PIN</h2><div style="background:white; padding:40px; border-radius:28px; text-align:center; box-shadow:var(--card-shadow);"><form id="resetPinForm"><p style="color:#64748B;font-size:14px;margin-bottom:30px;">Update authorization code.</p><input type="password" id="newPinInput" maxlength="4" style="text-align:center; font-size:32px; letter-spacing:15px;" required><button type="submit" class="btn-deposit" style="width:100%; margin-top:30px; padding:18px;">UPDATE PIN</button></form></div></div>`;
    document.getElementById('resetPinForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth(`${API_BASE_URL}/users/reset-pin`, { method: 'POST', body: JSON.stringify({ newPin: newPinInput.value }) });
        if (res.ok) { showSuccessModal("PIN established."); setTimeout(() => { window.location.hash = '#me'; router(); }, 2000); } else alert("Failed.");
    });
};

// ==========================================
// 6. ROUTER & SYSTEM HANDSHAKE
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
    document.querySelectorAll('.nav-link').forEach(l => { 
        l.classList.remove('active'); 
        if (l.getAttribute('href') === hash) l.classList.add('active'); 
    });

    switch (hash) {
        case '#home': renderHomeScreen(); break;
        case '#products': renderProductsPage(); break;
        case '#vip': renderVipPage(); break;
        case '#me': renderMePage(); break;
        case '#deposit': renderDepositPage(); break;
        case '#withdraw': renderWithdrawPage(); break;
        case '#history': renderHistoryPage_Alt(); break;
        case '#team': renderTeamPage(); break;
        case '#certificate': renderCertificatePage_Alt(); break;
        case '#rewards': renderRewardsPage_Alt(); break; 
        case '#support': renderSupportPage_Alt(); break;
        case '#my-plans': renderActiveInvestmentsPage(); break;
        case '#change-password': renderChangePasswordPage(); break;
        case '#set-pin': renderSetPinPage_Alt(); break;
        case '#reset-pin': renderResetPinPage_Alt(); break;
        default: renderHomeScreen(); 
    }
    window.scrollTo(0, 0);
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
appContent.addEventListener('click', handleInvestClick);

// ==========================================
// 7. FULL FOMO ENGINE (100% ORIGINAL NAMES)
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

    const popup = document.createElement('div');
    popup.id = 'fomo-popup';
    popup.innerHTML = `<div class="fomo-icon-box" id="fomo-icon">👋</div><div class="fomo-content"><span class="fomo-name" id="fomo-name">...</span><span class="fomo-desc" id="fomo-action">...</span><span class="fomo-meta"><span id="fomo-location">Lagos</span> • <span id="fomo-time">Just now</span></span></div>`;
    document.body.appendChild(popup);

    function trigger() {
        const hash = window.location.hash; if(hash !== '#home' && hash !== '') return;
        const name = fomoData.names[Math.floor(Math.random() * fomoData.names.length)];
        const loc = fomoData.locations[Math.floor(Math.random() * fomoData.locations.length)];
        const act = fomoData.actions[Math.floor(Math.random() * fomoData.actions.length)];
        const time = fomoData.times[Math.floor(Math.random() * fomoData.times.length)];
        
        document.getElementById('fomo-name').innerText = name;
        document.getElementById('fomo-action').innerText = act.text;
        document.getElementById('fomo-location').innerText = loc;
        document.getElementById('fomo-time').innerText = time;
        document.getElementById('fomo-icon').innerText = act.icon;
        popup.style.borderLeftColor = act.color;
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 4000);
    }
    setTimeout(trigger, 2000); setInterval(trigger, 12000);
})();
