/**
 * MASTER MASTER FILE: JJB24 FRONTEND
 * Fully Connected to Sahil's PR #58
 * Features: Unified History, 5% Commission, VIP Plans, 9% Withdrawal Fee
 */

// ==========================================
// 1. STYLE INJECTION (GLOBAL CSS)
// ==========================================
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    /* CORE UI BUTTONS */
    .btn-deposit {
        background: linear-gradient(135deg, #10b981, #059669) !important;
        color: white !important;
        font-weight: 800 !important;
        border: none !important;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4) !important;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: transform 0.2s ease;
        cursor: pointer;
        border-radius: 12px;
    }
    .btn-withdraw {
        background: linear-gradient(135deg, #ef4444, #b91c1c) !important;
        color: white !important;
        font-weight: 800 !important;
        border: none !important;
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4) !important;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: transform 0.2s ease;
        cursor: pointer;
        border-radius: 12px;
    }

    /* PREMIUM PRODUCT CARDS */
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
        display: flex;
        flex-direction: column;
    }
    .product-image-wc {
        height: 180px;
        width: 100%;
        background: #f3f4f6;
        position: relative;
    }
    .product-image-wc img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .card-badge {
        position: absolute; top: 10px; right: 10px;
        background: rgba(0,0,0,0.7); color: #fff;
        padding: 4px 10px; border-radius: 20px;
        font-size: 10px; font-weight: bold;
    }
    .product-info-wc { padding: 20px; display: flex; flex-direction: column; gap: 15px; }
    .product-title { font-size: 1.2rem; font-weight: 800; color: #1f2937; margin: 0; }
    
    .product-stats {
        display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        background: #f9fafb; padding: 10px; border-radius: 12px;
    }
    .stat-label { font-size: 10px; color: #6b7280; text-transform: uppercase; font-weight: 600; }
    .stat-value { font-size: 14px; font-weight: 700; color: #111; }

    .btn-invest-premium {
        background: linear-gradient(135deg, #8b5cf6, #6d28d9);
        color: white;
        font-weight: 700;
        border: none;
        padding: 14px;
        border-radius: 12px;
        width: 100%;
        cursor: pointer;
        font-size: 14px;
    }

    /* POPUP NOTIFICATION CSS */
    #fomo-popup {
        position: fixed; bottom: 85px; left: 50%; 
        transform: translateX(-50%) translateY(200%);
        background: white; border-radius: 20px;
        padding: 10px 20px; border-left: 5px solid #10b981;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 10000; transition: all 0.5s ease;
        display: flex; align-items: center; gap: 10px;
        width: 85%; max-width: 320px;
    }
    #fomo-popup.show { transform: translateX(-50%) translateY(0); }

    /* SUCCESS MODAL GLASS */
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
    }
`;
document.head.appendChild(styleSheet);

// ==========================================
// 2. DATA CONFIG & GLOBALS
// ==========================================
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
// 3. CORE LOGIC (AUTH & UTILS)
// ==========================================
const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = new Headers(options.headers || {});
    if (token) headers.append('Authorization', `Bearer ${token}`);
    if (!headers.has('Content-Type') && options.body) headers.append('Content-Type', 'application/json');
    
    try {
        const response = await fetch(url, { ...options, headers });
        if (response.status === 401 || response.status === 403) {
            logoutUser();
            return null;
        }
        return response;
    } catch (e) {
        console.error("Network Error:", e);
        return null;
    }
};

const logoutUser = () => {
    localStorage.removeItem('token');
    window.location.hash = '#login';
    router();
};

const showSuccessModal = (message) => {
    const modal = document.getElementById('successModal');
    const msgBox = document.getElementById('modalMessage');
    msgBox.innerHTML = `<i class="fas fa-check-circle" style="font-size: 40px; color: #10b981;"></i><br><p>${message}</p>`;
    modal.style.display = 'flex';
};

const closeModal = () => {
    document.getElementById('successModal').style.display = 'none';
};

const getReferralFromUrl = () => {
    const parts = window.location.hash.split('?ref=');
    return parts.length > 1 ? parts[1].split('&')[0] : '';
};

// ==========================================
// 4. ACTION HANDLERS
// ==========================================
const handleLogin = async (e) => {
    e.preventDefault();
    const loginIdentifier = document.getElementById('loginIdentifier').value.trim();
    const password = document.getElementById('password').value;
    const isEmail = loginIdentifier.includes('@');
    const payload = { 
        password: password, 
        email: isEmail ? loginIdentifier : '', 
        phone: isEmail ? '' : loginIdentifier 
    };

    try {
        const res = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) return alert(data.message);
        localStorage.setItem('token', data.token);
        window.location.hash = '#home';
        router();
    } catch (err) {
        alert("Unable to connect to server.");
    }
};

const handleRegister = async (e) => {
    e.preventDefault();
    const payload = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        password: document.getElementById('password').value,
        referral: document.getElementById('referral').value || undefined
    };
    if (payload.password !== document.getElementById('cpassword').value) {
        return alert("Passwords do not match.");
    }

    try {
        const res = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) return alert(data.message);
        alert("OTP sent! Please check your email.");
        renderOTPVerificationScreen(payload.email);
    } catch (err) {
        alert("Connection error during registration.");
    }
};

const handleOTPVerification = async (e, email) => {
    e.preventDefault();
    const otp = document.getElementById('otpCode').value;
    try {
        const res = await fetch(`${API_BASE_URL}/users/verify-otp`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, otp })
        });
        if (!res.ok) return alert("Incorrect OTP code.");
        showSuccessModal("Verification Successful! Please login.");
        renderLoginScreen();
    } catch (err) {
        alert("Verification failed.");
    }
};

// ==========================================
// 5. RENDER SCREENS (UI)
// ==========================================

const renderHomeScreen = async () => {
    appContent.innerHTML = '<p style="text-align: center; padding: 50px;">Refreshing your data...</p>';
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        const data = await res.json();
        const bal = data.balance.balance || 0;
        const name = data.balance.full_name || 'User';

        appContent.innerHTML = `
            <div class="top-header" style="padding: 20px; display: flex; justify-content: space-between; align-items: center;">
                <div><h4 style="margin:0;">Hi, ${name.split(' ')[0]}</h4><p style="margin:0; font-size:12px; color:#666;">Account active</p></div>
                <div style="width:40px; height:40px; background:#ddd; border-radius:50%; display:flex; align-items:center; justify-content:center;"><i class="fas fa-user"></i></div>
            </div>
            <div class="balance-card" style="background: linear-gradient(135deg, #6a0dad, #4b0082); color: white; padding: 25px; border-radius: 24px; margin: 0 15px; box-shadow: 0 10px 25px rgba(106, 13, 173, 0.3);">
                <small style="opacity: 0.8;">Total Balance (NGN)</small>
                <h1 style="margin: 5px 0; font-size: 32px;">₦ ${Number(bal).toLocaleString()}</h1>
                <div style="display: flex; gap: 15px; margin-top: 20px;">
                    <a href="#deposit" class="btn-deposit" style="flex:1; text-align:center; padding:12px; text-decoration:none;">Deposit</a>
                    <a href="#withdraw" class="btn-withdraw" style="flex:1; text-align:center; padding:12px; text-decoration:none;">Withdraw</a>
                </div>
            </div>
            <div class="home-content" style="padding: 20px;">
                <div class="quick-actions" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                    <a href="#team" class="action-button" style="text-align:center; text-decoration:none; color:#333;"><div style="background:#f3e5f5; padding:15px; border-radius:15px;"><i class="fas fa-users" style="color:#6a0dad;"></i></div><span style="font-size:12px;">Team</span></a>
                    <a href="#history" class="action-button" style="text-align:center; text-decoration:none; color:#333;"><div style="background:#e8f5e9; padding:15px; border-radius:15px;"><i class="fas fa-history" style="color:#2e7d32;"></i></div><span style="font-size:12px;">History</span></a>
                    <a href="#rewards" class="action-button" style="text-align:center; text-decoration:none; color:#333;"><div style="background:#fff3e0; padding:15px; border-radius:15px;"><i class="fas fa-gift" style="color:#ef6c00;"></i></div><span style="font-size:12px;">Rewards</span></a>
                </div>
            </div>`;
    } catch (e) { logoutUser(); }
};

const renderTeamPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; padding: 50px;">Fetching Team...</p>';
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/referrals`);
        const data = await res.json();
        const team = data.referrals || [];
        const bonus = data.total_commission || 0;

        const list = team.map(m => `
            <div style="background: #fff; padding: 15px; border-radius: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; border: 1px solid #eee;">
                <div><strong>${m.full_name}</strong><br><small style="color:#888;">Joined ${new Date(m.created_at).toLocaleDateString()}</small></div>
                <strong style="color: #10b981;">+₦${Number(m.commission_earned || 0).toLocaleString()}</strong>
            </div>`).join('');

        appContent.innerHTML = `
            <div class="page-container" style="padding: 20px;">
                <h2>My Team</h2>
                <div style="background: #6a0dad; color: white; padding: 20px; border-radius: 20px; text-align: center; margin-bottom: 20px;">
                    <small>Commission Earned</small>
                    <h2>₦ ${Number(bonus).toLocaleString()}</h2>
                    <p style="font-size: 12px; opacity: 0.8;">Bonus: 5% on every investment</p>
                </div>
                ${list || '<p style="text-align:center; color:#999;">No members yet.</p>'}
            </div>`;
    } catch (e) { appContent.innerHTML = '<p>Team Data Error.</p>'; }
};

const renderHistoryPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; padding: 50px;">Loading Activities...</p>';
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
        const data = await res.json();
        const txns = data.transactions || [];

        const list = txns.map(t => {
            const isPlus = ["deposit", "referral_bonus", "investment_roi"].includes(t.type);
            return `
                <div style="background: #fff; padding: 15px; border-radius: 15px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #eee;">
                    <div>
                        <strong style="text-transform: uppercase; font-size: 13px;">${t.type.replace(/_/g, ' ')}</strong><br>
                        <small style="color: #999;">${new Date(t.created_at).toLocaleDateString()}</small>
                    </div>
                    <strong style="color: ${isPlus ? '#10b981' : '#ef4444'}; font-size: 16px;">
                        ${isPlus ? '+' : '-'}₦${Number(Math.abs(t.amount)).toLocaleString()}
                    </strong>
                </div>`;
        }).join('');

        appContent.innerHTML = `<div class="page-container" style="padding: 20px;"><h2>Activity History</h2>${list || '<p style="text-align:center;">Empty history.</p>'}</div>`;
    } catch (e) { appContent.innerHTML = '<p>History Error.</p>'; }
};

const renderRewardsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; padding: 50px;">Checking Earnings...</p>';
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/reward-history`);
        const data = await res.json();
        const total = data.total_daily_income || 0;
        const log = data.history || [];

        const list = log.map(h => `
            <div style="background: #fff; padding: 12px; border-radius: 12px; margin-bottom: 8px; border-left: 5px solid #10b981; display: flex; justify-content: space-between;">
                <div><small>${new Date(h.created_at).toLocaleDateString()}</small><br><strong>DAILY ROI DROP</strong></div>
                <strong style="color: #10b981;">+₦${Number(h.amount).toLocaleString()}</strong>
            </div>`).join('');

        appContent.innerHTML = `
            <div class="page-container" style="padding: 20px;">
                <h2>My Rewards</h2>
                <div style="background: #10b981; color: white; padding: 25px; border-radius: 20px; text-align: center; margin-bottom: 20px;">
                    <small>Total Accumulated Profit</small>
                    <h2>₦ ${Number(total).toLocaleString()}</h2>
                </div>
                ${list || '<p style="text-align:center;">No profits logged yet.</p>'}
            </div>`;
    } catch (e) { appContent.innerHTML = '<p>Rewards Error.</p>'; }
};

const renderDepositPage = async () => {
    appContent.innerHTML = `
        <div class="page-container" style="padding: 20px;">
            <h2>Deposit</h2>
            <div class="withdraw-card" style="background: #fff; padding: 20px; border-radius: 20px;">
                <form id="depositForm">
                    <div class="form-group"><label>Amount (NGN)</label><input type="number" id="amount" placeholder="5000" required /></div>
                    <button type="submit" class="btn-deposit" style="width:100%; padding:15px; margin-top:20px;">Secure Pay</button>
                </form>
            </div>
        </div>`;
    document.getElementById('depositForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const amt = document.getElementById('amount').value;
        const res = await fetchWithAuth(`${API_BASE_URL}/payment/initialize`, { method: 'POST', body: JSON.stringify({ amount: amt }) });
        const result = await res.json();
        if (result.success) window.location.href = result.data.paymentLink;
    });
};

const renderWithdrawPage = async () => {
    appContent.innerHTML = `
        <div class="page-container" style="padding: 20px;">
            <h2>Withdraw</h2>
            <div class="withdraw-card" style="background: #fff; padding: 20px; border-radius: 20px;">
                <p style="font-size: 12px; color: #ef4444;">* Note: A 9% processing fee applies.</p>
                <form id="withdrawForm">
                    <div class="form-group"><label>Amount</label><input type="number" id="amount" required /></div>
                    <div class="form-group"><label>Bank</label><input type="text" id="bank" required /></div>
                    <div class="form-group"><label>Account No</label><input type="text" id="acc" required /></div>
                    <button type="submit" class="btn-withdraw" style="width:100%; padding:15px; margin-top:20px;">Submit Request</button>
                </form>
            </div>
        </div>`;
    document.getElementById('withdrawForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = { 
            amount: document.getElementById('amount').value, 
            bank_name: document.getElementById('bank').value, 
            account_number: document.getElementById('acc').value 
        };
        const res = await fetchWithAuth(`${API_BASE_URL}/payment/withdraw`, { method: 'POST', body: JSON.stringify(payload) });
        if (res.ok) showSuccessModal("Withdrawal request sent!");
    });
};

const renderVipPage = () => {
    const items = vipProducts.map(p => `
        <div class="product-card-wc" style="border: 1px solid #ffd700;">
            <div class="product-image-wc"><img src="${p.itemimage}"></div>
            <div class="product-info-wc">
                <h4 class="product-title">${p.name}</h4>
                <div class="product-stats"><div class="stat-item"><span class="stat-label">Price</span><span class="stat-value">₦${p.price.toLocaleString()}</span></div><div class="stat-item"><span class="stat-label">ROI</span><span class="stat-value">₦${p.total_return.toLocaleString()}</span></div></div>
                <button class="btn-invest-premium" data-plan-id="${p.id}" data-type="vip">JOIN VIP NOW</button>
            </div>
        </div>`).join('');
    appContent.innerHTML = `<div class="page-container" style="padding:20px;"><h2>VIP Packages</h2><div class="product-grid-wc">${items}</div></div>`;
};

const renderProductsPage = async () => {
    appContent.innerHTML = '<p style="text-align:center; padding:50px;">Loading Investments...</p>';
    const res = await fetchWithAuth(`${API_BASE_URL}/users/allItems`);
    const data = await res.json();
    const items = data.items.map(i => `
        <div class="product-card-wc">
            <div class="product-image-wc"><img src="${i.itemimage}"></div>
            <div class="product-info-wc">
                <h4 class="product-title">${i.itemname}</h4>
                <div class="product-stats"><div class="stat-item"><span class="stat-label">Price</span><span class="stat-value">₦${Number(i.price).toLocaleString()}</span></div><div class="stat-item"><span class="stat-label">Daily</span><span class="stat-value">₦${Number(i.dailyincome).toLocaleString()}</span></div></div>
                <button class="btn-invest-premium" data-plan-id="${i.id}" data-type="regular">INVEST NOW</button>
            </div>
        </div>`).join('');
    appContent.innerHTML = `<div class="page-container" style="padding:20px;"><h2>Regular Investments</h2><div class="product-grid-wc">${items}</div></div>`;
};

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `<div class="auth-container" style="padding: 40px 20px; text-align: center;">
        <div style="font-size: 30px; font-weight: 900; color: #6a0dad; margin-bottom: 20px;">JJB24</div>
        <form id="loginForm" style="background:#fff; padding: 20px; border-radius: 20px;">
            <div class="form-group" style="text-align: left;"><label>Email/Phone</label><input type="text" id="loginIdentifier" required style="width:100%; padding:12px; margin: 8px 0; border: 1px solid #eee; border-radius: 10px;" /></div>
            <div class="form-group" style="text-align: left;"><label>Password</label><input type="password" id="password" required style="width:100%; padding:12px; margin: 8px 0; border: 1px solid #eee; border-radius: 10px;" /></div>
            <button type="submit" class="btn-auth" style="width:100%; padding:15px; background:#6a0dad; color:#fff; border:none; border-radius: 12px; margin-top: 20px; font-weight: bold;">Login</button>
        </form>
        <p style="margin-top: 20px;">New member? <a href="#register" style="color:#6a0dad; font-weight:bold;">Sign Up</a></p>
    </div>`;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
};

const renderRegisterScreen = () => {
    bottomNav.style.display = 'none';
    const refCode = getReferralFromUrl();
    appContent.innerHTML = `<div class="auth-container" style="padding: 40px 20px; text-align: center;">
        <h2>Create Account</h2>
        <form id="registerForm" style="background:#fff; padding: 20px; border-radius: 20px; text-align: left;">
            <label>Full Name</label><input type="text" id="fullName" required style="width:100%; padding:10px; margin: 5px 0;" />
            <label>Email</label><input type="email" id="email" required style="width:100%; padding:10px; margin: 5px 0;" />
            <label>Phone</label><input type="tel" id="phone" required style="width:100%; padding:10px; margin: 5px 0;" />
            <label>Password</label><input type="password" id="password" required style="width:100%; padding:10px; margin: 5px 0;" />
            <label>Confirm Password</label><input type="password" id="cpassword" required style="width:100%; padding:10px; margin: 5px 0;" />
            <label>Invite Code</label><input type="text" id="referral" value="${refCode}" style="width:100%; padding:10px; margin: 5px 0; background: #f9f9f9;" />
            <button type="submit" class="btn-auth" style="width:100%; padding:15px; background:#6a0dad; color:#fff; border:none; border-radius: 12px; margin-top: 20px; font-weight: bold;">Join JJB24</button>
        </form>
    </div>`;
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

const renderOTPVerificationScreen = (email) => {
    appContent.innerHTML = `<div class="auth-container" style="padding: 50px 20px; text-align: center;"><h2>Verify</h2><p>OTP sent to ${email}</p><form id="otpForm"><input type="text" id="otpCode" placeholder="Enter Code" required style="width:100%; padding:15px; border-radius:10px;" /><button type="submit" style="width:100%; padding:15px; margin-top: 10px; background: #10b981; color:#fff; border:none; border-radius:10px;">Verify</button></form></div>`;
    document.getElementById('otpForm').addEventListener('submit', (e) => handleOTPVerification(e, email));
};

// ==========================================
// 6. ROUTER & SOCIAL PROOF
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
        default: renderHomeScreen();
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
appContent.addEventListener('click', handleInvestClick);

// PREMIUM SOCIAL PROOF
(function startSocialProof() {
    const names = ["Musa I.", "Chioma E.", "Tunde B.", "Ngozi O.", "Emeka A.", "Sade Y.", "Bello K.", "Nifemi O."];
    const actions = ["just registered", "invested ₦100k", "joined VIP", "withdrew ₦25,000", "earned referral bonus"];
    const popup = document.createElement('div');
    popup.id = 'fomo-popup';
    popup.innerHTML = `<div style="width:35px; height:35px; border-radius:50%; background:#10b981; color:white; display:flex; align-items:center; justify-content:center; font-weight:bold;">👤</div><div id="fomo-text" style="font-size:13px; color:#333;">...</div>`;
    document.body.appendChild(popup);
    
    setInterval(() => {
        if(window.location.hash !== '#home' && window.location.hash !== '') return;
        const name = names[Math.floor(Math.random() * names.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        document.getElementById('fomo-text').innerHTML = `<strong>${name}</strong> ${action}`;
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 4500);
    }, 14000);
})();
