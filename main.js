// ==========================================
// 1. CONFIGURATION & STYLING INJECTION (WORLD-CLASS FINTECH UI)
// ==========================================

const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    :root {
        --accent-primary: #8B5CF6; 
        --accent-success: #10B981; 
        --accent-danger: #EF4444;  
        --bg-main: #F8FAFC;        
        --text-dark: #0F172A;      /* Bold Slate for readable headings */
        --text-muted: #475569;     /* Clear Slate for sub-labels */
        --card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04);
        --nav-height: 75px;
    }

    /* DESKTOP RESPONSIVENESS: PERFECTLY CENTERED FRAME */
    body { 
        font-family: 'Plus Jakarta Sans', sans-serif !important; 
        background: #E2E8F0; 
        margin: 0; 
        display: flex;
        justify-content: center;
        min-height: 100vh;
    }

    #app-content {
        background: var(--bg-main);
        width: 100%;
        max-width: 500px; 
        min-height: 100vh;
        position: relative;
        box-shadow: 0 0 100px rgba(0,0,0,0.1);
        padding-bottom: 110px;
        overflow-x: hidden;
    }

    /* MODAL FIX: CENTERED WITHIN THE 500PX FRAME */
    #whatsappModal, #successModal {
        display: none; 
        position: fixed; 
        top: 0; 
        left: 50%; 
        transform: translateX(-50%);
        width: 100%; 
        max-width: 500px; 
        height: 100%;
        justify-content: center; 
        align-items: center;
        backdrop-filter: blur(8px); 
        background: rgba(15, 23, 42, 0.6);
        z-index: 999999;
    }

    .modal-content {
        background: white; 
        padding: 40px 30px; 
        border-radius: 32px;
        text-align: center; 
        max-width: 340px; 
        width: 85%;
        box-shadow: 0 30px 60px -12px rgba(0,0,0,0.25);
        animation: springIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes springIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    /* VISIBILITY FIXES FOR FONTS */
    .user-greeting h4 { margin: 0; font-size: 22px; font-weight: 800; color: var(--text-dark) !important; }
    .user-greeting p { margin: 0; font-size: 13px; color: var(--text-muted) !important; font-weight: 600; }
    
    .top-header { display: flex; justify-content: space-between; align-items: center; padding: 25px 20px 10px; }

    /* PREMIUM BUTTONS */
    .btn-deposit, .btn-withdraw, .btn-invest-premium, .btn-auth {
        border: none !important; border-radius: 18px !important;
        font-weight: 700 !important; letter-spacing: -0.2px;
        transition: all 0.3s ease;
        display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .btn-deposit { background: var(--accent-success) !important; color: white !important; }
    .btn-withdraw { background: rgba(255,255,255,0.15) !important; color: white !important; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1) !important; }

    /* CARD COMPONENTS */
    .balance-card {
        background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
        margin: 0 20px 25px; padding: 35px 25px; border-radius: 32px;
        color: white; position: relative; overflow: hidden;
        box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.3);
    }
    .balance-card h2 { font-size: 36px; font-weight: 800; margin: 10px 0 25px; letter-spacing: -1px; color: white; }
    .balance-card small { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; font-weight: 700; }

    /* QUICK ACTIONS */
    .quick-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 0 20px 25px; }
    .action-button {
        background: white; border-radius: 24px; padding: 20px 10px;
        display: flex; flex-direction: column; align-items: center; gap: 10px;
        text-decoration: none; box-shadow: var(--card-shadow);
    }
    .action-button i { font-size: 22px; color: var(--accent-primary); }
    .action-button span { font-size: 12px; font-weight: 700; color: var(--text-dark); }

    /* BOTTOM NAVIGATION FIX */
    .bottom-nav {
        position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
        width: 100%; max-width: 500px; height: var(--nav-height);
        background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);
        display: flex; justify-content: space-around; align-items: center;
        border-top: 1px solid #E2E8F0; z-index: 10000; padding-bottom: env(safe-area-inset-bottom);
    }
    .nav-link { text-decoration: none; color: #94A3B8; display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; transition: 0.3s; }
    .nav-link.active { color: var(--accent-primary); }
    .nav-link i { font-size: 20px; }
    .nav-link span { font-size: 10px; font-weight: 700; }

    /* LISTS */
    .activity-card { margin: 0 20px; background: white; border-radius: 32px; padding: 24px; box-shadow: var(--card-shadow); }
    .activity-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #F1F5F9; }
    
    /* AUTH FORMS */
    .auth-container { padding: 60px 25px; text-align: center; }
    .auth-logo { font-size: 42px; font-weight: 900; color: var(--accent-primary); margin-bottom: 10px; letter-spacing: -2px; }
    .form-group { text-align: left; margin-bottom: 20px; }
    .form-group label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 8px; color: var(--text-muted); }
    .form-group input, select { width: 100%; padding: 18px; border-radius: 20px; border: 1.5px solid #E2E8F0; background: #F8FAFC; box-sizing: border-box; font-weight: 600; }
`;
document.head.appendChild(styleSheet);

// ==========================================
// 2. MODAL & COMMUNITY INJECTION
// ==========================================

const announcementDiv = document.createElement("div");
announcementDiv.id = "whatsappModal";
announcementDiv.innerHTML = `
    <div class="modal-content">
        <div style="width: 70px; height: 70px; background: #DCFCE7; border-radius: 24px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <i class="fab fa-whatsapp" style="font-size: 35px; color: #25D366;"></i>
        </div>
        <h3 style="margin: 0 0 10px; color: #0F172A; font-weight: 800;">Official Community</h3>
        <p style="color: #64748B; font-size: 14px; line-height: 1.5; margin-bottom: 25px;">Join 5,000+ members receiving real-time updates and priority support.</p>
        <a href="https://chat.whatsapp.com/Dw76vw5BJ68FONRPd6GPUi" target="_blank" onclick="closeWhatsappModal()" class="btn-whatsapp" style="background: #25D366; color: white !important; font-weight: 700; padding: 18px; border-radius: 18px; text-decoration: none; display: block;">JOIN NOW</a>
        <button onclick="closeWhatsappModal()" style="background:none; border:none; color:#94A3B8; margin-top:20px; cursor:pointer; font-size:12px; font-weight:600;">Close</button>
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

// ==========================================
// 3. CORE LOGIC (HANDSHAKES & API)
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

const showSuccessModal = (message) => {
    const modalMessage = document.getElementById('modalMessage');
    if (modalMessage) modalMessage.innerHTML = `<div style="width:60px;height:60px;background:#DCFCE7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;"><i class="fas fa-check" style="color:#10B981;font-size:24px;"></i></div><span style="font-size:18px;font-weight:800;color:#0F172A;">Success</span><p style="color:#64748B;font-size:14px;margin-top:10px;">${message}</p>`;
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
// 5. RENDER FUNCTIONS (UI REFINED)
// ==========================================

const renderHomeScreen = async () => {
    if (!localStorage.getItem('jjb_community_joined')) setTimeout(() => { document.getElementById('whatsappModal').style.display = 'flex'; }, 2000);
    appContent.innerHTML = '<div style="display:flex; height:50vh; align-items:center; justify-content:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    const res = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
    const data = await res.json();
    const user = data.balance || {};
    const userEmail = user.email || localStorage.getItem('user_email');

    let activityHTML = "<p style='text-align:center; font-size:12px; color:#94A3B8; padding:20px;'>Clean Logs</p>";
    try {
        const hRes = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
        const hData = await hRes.json();
        if (hData.transactions.length > 0) {
            activityHTML = hData.transactions.slice(0, 4).map(t => `
                <div class="activity-item">
                    <div><div style="font-weight:700; font-size:14px; color:var(--text-dark);">${t.type.replace(/_/g, ' ')}</div><small style="color:#94A3B8; font-weight:600;">${new Date(t.created_at).toLocaleDateString()}</small></div>
                    <div style="font-weight:800; color:${t.amount > 0 ? '#10B981' : '#0F172A'};">₦${Number(Math.abs(t.amount)).toLocaleString()}</div>
                </div>`).join('');
        }
    } catch(e) {}

    appContent.innerHTML = `
        <div class="top-header">
            <div class="user-greeting"><h4>Hi, ${user.full_name}</h4><p>Exclusive Member</p></div>
            <div style="width:44px; height:44px; background:white; border-radius:14px; display:flex; align-items:center; justify-content:center; box-shadow:var(--card-shadow);"><i class="fas fa-bell" style="color:#64748B;"></i></div>
        </div>
        <div class="balance-card">
            <small>Total Net Assets</small>
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
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"><h3 style="margin:0; font-size:16px; font-weight:800; color:var(--text-dark);">Recent Stream</h3><a href="#history" style="font-size:12px; font-weight:700; color:var(--accent-primary); text-decoration:none;">VIEW ALL</a></div>
            <div class="activity-list">${activityHTML}</div>
        </div>`;
};

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
        <div class="auth-container">
            <div class="auth-logo">JJB24</div>
            <h2 style="font-weight: 800; color:var(--text-dark);">Login</h2>
            <p style="color:var(--text-muted); margin-bottom:40px; font-weight:600;">Securely manage your winery assets</p>
            <form id="loginForm">
                <div class="form-group"><label>Account ID</label><input type="text" id="loginIdentifier" placeholder="Email or Phone" required /></div>
                <div class="form-group"><label>Password</label><input type="password" id="password" placeholder="••••••••" required /></div>
                <a href="javascript:void(0)" onclick="handleForgotPassword()" style="color:var(--accent-primary); font-size:13px; font-weight:700; text-decoration:none; display:block; text-align:right;">Reset key?</a>
                <button type="submit" class="btn-auth" style="width:100%; padding:20px; background: var(--accent-primary); color:white; font-size:16px; margin-top:30px;">SECURE LOGIN</button>
            </form>
            <p style="margin-top: 40px; font-size: 14px; color: var(--text-muted); font-weight:600;">New member? <a href="#register" style="color: var(--accent-primary); text-decoration: none; font-weight: 800;">Open Account</a></p>
        </div>`;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
};

const renderRegisterScreen = () => {
    bottomNav.style.display = 'none';
    const ref = (window.location.hash.includes('?ref=')) ? window.location.hash.split('?ref=')[1].split('&')[0] : '';
    appContent.innerHTML = `
        <div class="auth-container">
            <div class="auth-logo">JJB24</div>
            <h2 style="font-weight: 800; color:var(--text-dark);">Open Account</h2>
            <p style="color:var(--text-muted); margin-bottom:40px; font-weight:600;">Join the premium wine network</p>
            <form id="registerForm">
                <div class="form-group"><label>Full Name</label><input type="text" id="fullName" required /></div>
                <div class="form-group"><label>Email Address</label><input type="email" id="email" required /></div>
                <div class="form-group"><label>Phone Number</label><input type="tel" id="phone" required /></div>
                <div class="form-group"><label>Password</label><input type="password" id="password" required /></div>
                <div class="form-group"><label>Confirm Password</label><input type="password" id="cpassword" required /></div>
                <div class="form-group"><label>Ref Code</label><input type="text" id="referral" value="${ref}" ${ref ? 'readonly' : ''} /></div>
                <button type="submit" class="btn-auth" style="width:100%; padding:20px; background: var(--accent-primary); color:white; font-size:16px;">CREATE ACCOUNT</button>
            </form>
            <p style="margin-top: 40px; font-size: 14px; color: var(--text-muted); font-weight:600;">Already a member? <a href="#login" style="color: var(--accent-primary); text-decoration: none; font-weight: 800;">Login</a></p>
        </div>`;
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

const renderOTPVerificationScreen = (email) => {
    appContent.innerHTML = `<div class="auth-container"><div class="auth-logo">JJB24</div><h2>Verify ID</h2><p>Sent to ${email}</p><form id="otpForm"><div class="form-group"><input type="text" id="otpCode" maxlength="6" style="text-align:center; font-size:24px; letter-spacing:8px; font-weight:800;" required /></div><button type="submit" class="btn-auth" style="width:100%; padding:18px; background:var(--text-dark); color:white;">VERIFY</button></form></div>`;
    document.getElementById('otpForm').addEventListener('submit', (e) => handleOTPVerification(e, email));
};

const renderProductsPage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    const res = await fetchWithAuth(`${API_BASE_URL}/users/allItems`);
    const data = await res.json();
    let html = (data.items || []).map(item => `<div class="product-card-wc"><div class="product-image-wc"><span class="card-badge">HOT</span><img src="${item.itemimage}" onerror="this.src='https://placehold.co/400x300/1e293b/ffffff?text=Wine'"></div><div class="product-info-wc" style="padding:24px;"><h4 class="product-title">${item.itemname}</h4><div class="product-stats"><div class="stat-item"><span class="stat-label">Entry</span><span class="stat-value price">₦${Number(item.price).toLocaleString()}</span></div><div class="stat-item"><span class="stat-label">Yield</span><span class="stat-value" style="color:var(--accent-primary);">₦${Number(item.dailyincome).toLocaleString()}</span></div></div><button class="btn-invest-premium" data-plan-id="${item.id}" data-type="regular" style="width:100%; padding:18px; background:var(--text-dark); color:white;">ACQUIRE ASSET</button></div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; margin-bottom:20px; font-size:24px;">Asset Collections</h2><div class="product-grid-wc" style="padding:0;">${html || '<p>Loading...</p>'}</div></div>`;
};

const renderVipPage = () => {
    let html = vipProducts.map(p => `<div class="product-card-wc" style="border:2px solid #EAB308;"><div class="product-image-wc"><span class="card-badge" style="background:#EAB308; color:#000;">PREMIUM VIP</span><img src="${p.itemimage}"></div><div class="product-info-wc" style="padding:24px;"><h4 class="product-title" style="color:#854D0E;">${p.name}</h4><div class="product-stats" style="background:#FEFCE8;"><div class="stat-item" style="background:transparent;"><span class="stat-label">Commitment</span><span class="stat-value" style="color:#854D0E;">₦${p.price.toLocaleString()}</span></div><div class="stat-item" style="background:transparent;"><span class="stat-label">Forecast</span><span class="stat-value" style="color:#854D0E;">₦${p.total_return.toLocaleString()}</span></div></div><button class="btn-invest-premium" data-plan-id="${p.id}" data-type="vip" style="width:100%; padding:18px; background:#EAB308; color:black;">CLAIM VIP SLOT</button></div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; margin-bottom:20px; font-size:24px;">VIP Private Cellar</h2><div class="product-grid-wc" style="padding:0;">${html}</div></div>`;
};

const renderMePage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    const res = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
    const data = await res.json();
    const user = data.balance || {};
    const ref = user.own_referral_code || 'N/A';
    const pinActionText = user.has_pin ? "Update PIN" : "Setup PIN";
    const pinActionHash = user.has_pin ? "#reset-pin" : "#set-pin";
    appContent.innerHTML = `
        <div style="padding: 20px 20px 100px;">
            <div style="background: white; padding: 35px 20px; border-radius: 32px; text-align: center; box-shadow: var(--card-shadow); margin-bottom: 25px;">
                <div style="width: 80px; height: 80px; background: #F1F5F9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 28px;"><i class="fas fa-user-tie"></i></div>
                <h3 style="margin: 0; font-weight: 800;">${user.full_name}</h3>
                <p style="color: #94A3B8; font-size: 14px;">${user.phone_number}</p>
                <div style="margin-top:25px;">${getReferralCardHTML(ref)}</div>
            </div>
            <div style="background: white; border-radius: 32px; overflow: hidden; box-shadow: var(--card-shadow);">
                <a href="#change-password" style="display:flex; justify-content:space-between; padding:22px; border-bottom:1px solid #F1F5F9; text-decoration:none; color:var(--text-dark); font-weight:700;"><span>Update Password</span><i class="fas fa-chevron-right"></i></a>
                <a href="${pinActionHash}" style="display:flex; justify-content:space-between; padding:22px; border-bottom:1px solid #F1F5F9; text-decoration:none; color:var(--text-dark); font-weight:700;"><span>${pinActionText}</span><i class="fas fa-chevron-right"></i></a>
                <a href="#history" style="display:flex; justify-content:space-between; padding:22px; border-bottom:1px solid #F1F5F9; text-decoration:none; color:var(--text-dark); font-weight:700;"><span>Asset Logs</span><i class="fas fa-chevron-right"></i></a>
                <a href="javascript:void(0)" onclick="window.logoutUser()" style="display:block; padding:22px; color:#EF4444; font-weight:800; text-decoration:none;">Sign Out Portfolio</a>
            </div>
        </div>`;
};

const renderDepositPage = async () => {
    const acc = "6669586597";
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px; margin-bottom:25px;">Top-up Asset</h2><div style="background:#0F172A; color:white; padding:30px; border-radius:32px; margin-bottom:25px;"><small style="opacity:0.6; font-weight:700;">BANK TRANSFER TARGET</small><div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;"><h3 style="margin:0; font-size:26px; font-weight:800; color:var(--accent-success);">${acc}</h3><button id="copyAccBtn" onclick="window.copyAccountNumber('${acc}')" style="background:rgba(16,185,129,0.1); border:1px solid var(--accent-success); color:var(--accent-success); padding:8px 15px; border-radius:12px; font-weight:800; font-size:10px;">COPY</button></div><div style="margin-top:20px; font-weight:800;">JJB BRANDED WINES LTD</div><div style="opacity:0.7;">Moniepoint MFB</div></div><div style="background:white; padding:30px; border-radius:32px; box-shadow:var(--card-shadow);"><form id="manualDepositForm"><div class="form-group"><label>Amount (₦)</label><input type="number" id="depositAmountInput" required></div><div class="form-group"><label>Screenshot</label><input type="file" id="receiptFileInput" accept="image/*" required></div><button type="submit" id="submitBtn" class="btn-deposit" style="width:100%; padding:18px;">SUBMIT CONFIRMATION</button></form></div></div>`;
    document.getElementById('manualDepositForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const f = new FormData(); f.append('amount', depositAmountInput.value); f.append('receipt', receiptFileInput.files[0]);
        submitBtn.disabled = true; submitBtn.innerText = "VERIFYING...";
        const res = await fetchWithAuth(`${API_BASE_URL}/payment/deposit/manual`, { method: 'POST', body: f });
        if (res && res.ok) { showSuccessModal('Audit process initiated. Confirmation within 24hrs.'); setTimeout(() => { window.location.hash = '#home'; router(); }, 2500); } else { submitBtn.disabled = false; alert('Failed'); }
    });
};

const renderActiveInvestmentsPage = async () => {
    const res = await fetchWithAuth(`${API_BASE_URL}/users/dashboard`);
    const data = await res.json();
    const invs = data.active_investments || [];
    let html = invs.map(inv => `<div style="background:white; border-radius:28px; padding:24px; margin-bottom:20px; box-shadow:var(--card-shadow);"><div style="display:flex; justify-content:space-between; margin-bottom:15px;"><h4 style="margin:0; font-weight:800; color:var(--text-dark);">${inv.itemname || "Asset"}</h4><span style="background:#F1F5F9; color:#64748B; padding:6px 12px; border-radius:10px; font-size:10px; font-weight:800;">${inv.days_left || 0}D LEFT</span></div><div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;"><div style="background:#F8FAFC; padding:10px; border-radius:12px;"><small style="display:block; font-size:10px; opacity:0.6;">ENTRY</small><span style="font-weight:800;">₦${Number(inv.price).toLocaleString()}</span></div><div style="background:#F8FAFC; padding:10px; border-radius:12px;"><small style="display:block; font-size:10px; opacity:0.6;">DAILY</small><span style="font-weight:800; color:#10B981;">₦${Number(inv.daily_earning).toLocaleString()}</span></div></div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px; margin-bottom:25px; color:var(--text-dark);">Active Assets</h2>${html || '<p style="text-align:center;">No active plans.</p>'}</div>`;
};

const renderTeamPage = async () => {
    appContent.innerHTML = '<div style="display:flex; height:50vh; justify-content:center; align-items:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    const response = await fetchWithAuth(`${API_BASE_URL}/users/referrals`);
    const data = await response.json();
    const teamHTML = (data.team_list || []).map(m => `<div style="background:white; padding:18px; border-radius:20px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; box-shadow:var(--card-shadow);"><div><div style="font-weight:700; color:var(--text-dark);">${m.name}</div><small style="color:#94A3B8;">Joined ${new Date(m.joined_date).toLocaleDateString()}</small></div><div style="color:#10B981; font-size:10px; font-weight:800; background:#DCFCE7; padding:4px 8px; border-radius:8px;">ACTIVE</div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px; margin-bottom:25px; color:var(--text-dark);">Network</h2><div style="background:var(--text-dark); color:white; padding:25px; border-radius:28px; margin-bottom:25px; text-align:center;"><small style="opacity:0.7; font-weight:700;">COMMISSIONS</small><h2 style="color:white;">₦ ${Number(data.total_commission || 0).toLocaleString()}</h2></div>${teamHTML || '<p style="text-align:center;">Invite friends to earn.</p>'}</div>`;
};

const renderRewardsPage = async () => {
    const res = await fetchWithAuth(`${API_BASE_URL}/users/reward-history`);
    const data = await res.json();
    const list = (data.rewards || []).map(r => `<div style="background:white; border-radius:20px; padding:20px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; box-shadow:var(--card-shadow);"><div><div style="font-weight:700; color:var(--text-dark);">${r.source}</div><small style="color:#94A3B8;">${new Date(r.date).toLocaleDateString()}</small></div><div style="color:#10B981; font-weight:800; font-size:16px;">+₦${Number(r.amount).toLocaleString()}</div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px; color:var(--text-dark);">Rewards History</h2>${list || '<p style="text-align:center;">No rewards yet.</p>'}</div>`;
};

const renderHistoryPage = async () => {
    const res = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
    const data = await res.json();
    const list = (data.transactions || []).map(t => `<div style="background:white; border-radius:20px; padding:20px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; box-shadow:var(--card-shadow);"><div><div style="font-weight:700; text-transform:uppercase; color:var(--text-dark);">${t.type.replace(/_/g, ' ')}</div><small style="color:#94A3B8;">${new Date(t.created_at).toLocaleDateString()}</small></div><div style="color:${t.amount > 0 ? '#10B981' : '#0F172A'}; font-weight:800;">₦${Number(Math.abs(t.amount)).toLocaleString()}</div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px; margin-bottom:25px; color:var(--text-dark);">Transaction Logs</h2>${list || '<p style="text-align:center;">No history found.</p>'}</div>`;
};

const renderSupportPage = () => { 
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px; color:var(--text-dark);">Support</h2><div style="background:white; padding:35px; border-radius:32px; text-align:center; box-shadow:var(--card-shadow);"><div style="width:70px;height:70px;background:#DCFCE7;border-radius:24px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;"><i class="fab fa-whatsapp" style="font-size:35px;color:#25D366;"></i></div><h3 style="font-weight:800; color:var(--text-dark);">WhatsApp Support</h3><p style="color:#64748B;font-size:14px;margin-bottom:25px;">Fastest response for yield queries and assistance.</p><a href="https://chat.whatsapp.com/Dw76vw5BJ68FONRPd6GPUi" target="_blank" class="btn-deposit" style="background:#25D366!important;padding:18px;text-decoration:none;">OPEN CHAT</a></div></div>`; 
};

const renderCertificatePage = () => { 
    appContent.innerHTML = `<div style="padding:20px 20px 100px;"><h2 style="font-weight:800; font-size:24px; color:var(--text-dark);">Legal Documents</h2><div style="background:white; padding:15px; border-radius:28px; box-shadow:var(--card-shadow);"><img src="image.png" style="width:100%; border-radius:20px;" onerror="this.parentElement.innerHTML='<p style=\'padding:40px;color:#94A3B8;text-align:center;\'>Verification processing...</p>'"></div></div>`; 
};

const renderChangePasswordPage = async () => {
    appContent.innerHTML = `<div style="padding: 20px;"><h2 style="font-weight:800; margin-bottom:25px; color:var(--text-dark);">Security Settings</h2><div style="background:white; padding:30px; border-radius:28px; box-shadow:var(--card-shadow);"><form id="changePasswordForm"><div class="form-group"><label>Current Password</label><input type="password" id="oldPassword" required></div><div class="form-group"><label>New Password</label><input type="password" id="newPassword" required></div><button type="submit" class="btn-deposit" style="width:100%; padding:18px; background:var(--text-dark)!important;">UPDATE PASSWORD</button></form></div></div>`;
    document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth(`${API_BASE_URL}/users/change-password`, { method: 'POST', body: JSON.stringify({ oldPassword: oldPassword.value, newPassword: newPassword.value }) });
        const result = await res.json();
        if (res.ok) { showSuccessModal("Credentials updated successfully!"); setTimeout(() => { window.location.hash = '#me'; router(); }, 2000); } else alert(result.message);
    });
};

const renderSetPinPage = async () => {
    appContent.innerHTML = `<div style="padding:20px;"><h2 style="font-weight:800; color:var(--text-dark);">Security PIN</h2><div style="background:white; padding:40px; border-radius:28px; text-align:center; box-shadow:var(--card-shadow);"><form id="pinForm"><p style="color:#64748B;font-size:14px;margin-bottom:30px;">Set a 4-digit code for withdrawal authorization.</p><input type="password" id="pinInput" maxlength="4" style="text-align:center; font-size:32px; letter-spacing:15px; border:none; background:#F1F5F9; padding:20px; border-radius:18px;" required><button type="submit" class="btn-deposit" style="width:100%; margin-top:30px; padding:18px;">ACTIVATE PIN</button></form></div></div>`;
    document.getElementById('pinForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth(`${API_BASE_URL}/users/set-pin`, { method: 'POST', body: JSON.stringify({ pin: pinInput.value }) });
        if (res.ok) { showSuccessModal("Security PIN active!"); setTimeout(() => { window.location.hash = '#me'; router(); }, 2000); } else alert("PIN activation failed.");
    });
};

const renderResetPinPage = async () => {
    appContent.innerHTML = `<div style="padding:20px;"><h2 style="font-weight:800; color:var(--text-dark);">Transaction PIN</h2><div style="background:white; padding:40px; border-radius:28px; text-align:center; box-shadow:var(--card-shadow);"><form id="resetPinForm"><p style="color:#64748B;font-size:14px;margin-bottom:30px;">Define your withdrawal authorization code.</p><input type="password" id="newPinInput" maxlength="4" style="text-align:center; font-size:32px; letter-spacing:15px; border:none; background:#F1F5F9; padding:20px; border-radius:18px;" required><button type="submit" class="btn-deposit" style="width:100%; margin-top:30px; padding:18px;">UPDATE PIN</button></form></div></div>`;
    document.getElementById('resetPinForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await fetchWithAuth(`${API_BASE_URL}/users/reset-pin`, { method: 'POST', body: JSON.stringify({ newPin: newPinInput.value }) });
        if (res.ok) { showSuccessModal("New PIN established!"); setTimeout(() => { window.location.hash = '#me'; router(); }, 2000); } else alert("Update failed.");
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
        case '#history': renderHistoryPage(); break;
        case '#team': renderTeamPage(); break;
        case '#certificate': renderCertificatePage(); break;
        case '#rewards': renderRewardsPage(); break; 
        case '#support': renderSupportPage(); break;
        case '#my-plans': renderActiveInvestmentsPage(); break;
        case '#change-password': renderChangePasswordPage(); break;
        case '#set-pin': renderSetPinPage(); break;
        case '#reset-pin': renderResetPinPage(); break;
        default: renderHomeScreen(); 
    }
    window.scrollTo(0, 0);
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
appContent.addEventListener('click', handleInvestClick);

// ==========================================
// 7. FULL FOMO ENGINE
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
    style.innerHTML = `
        #fomo-popup { position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%) translateY(200%); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.8); border-left: 5px solid #10B981; padding: 12px 18px; border-radius: 20px; box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.1); z-index: 9999; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; align-items: center; gap: 12px; width: 90%; max-width: 340px; pointer-events: none; }
        #fomo-popup.show { transform: translateX(-50%) translateY(0); }
        .fomo-icon-box { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; background: #F1F5F9; flex-shrink: 0; }
        .fomo-content { display: flex; flex-direction: column; }
        .fomo-name { font-size: 13px; font-weight: 800; color: #0F172A; }
        .fomo-desc { font-size: 12px; color: #64748B; }
        .fomo-meta { font-size: 10px; color: #94A3B8; margin-top: 1px; }
    `;
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
    setTimeout(trigger, 2000); setInterval(trigger, 15000);
})();
