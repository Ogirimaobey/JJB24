// ==========================================
// 1. STYLE INJECTION (PREMIUM UI & POPUPS)
// ==========================================
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    body { font-family: 'Inter', sans-serif; background-color: #f8f9fa; margin: 0; padding: 0; }
    .btn-deposit { background: linear-gradient(135deg, #10b981, #059669) !important; color: white !important; font-weight: 800; border: none; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); text-transform: uppercase; cursor: pointer; border-radius: 12px; }
    .btn-withdraw { background: linear-gradient(135deg, #ef4444, #b91c1c) !important; color: white !important; font-weight: 800; border: none; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4); text-transform: uppercase; cursor: pointer; border-radius: 12px; }
    
    .product-grid-wc { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; padding: 10px 0; }
    .product-card-wc { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 30px rgba(0,0,0,0.08); border: 1px solid #f0f0f0; display: flex; flex-direction: column; transition: transform 0.3s; }
    .product-card-wc:hover { transform: translateY(-5px); }
    .product-image-wc { height: 180px; width: 100%; position: relative; background: #eee; }
    .product-image-wc img { width: 100%; height: 100%; object-fit: cover; }
    .btn-invest-premium { background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; font-weight: 700; border: none; padding: 14px; border-radius: 12px; width: 100%; cursor: pointer; }

    /* CENTRAL POPUP MESSAGE */
    #fomo-popup {
        position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%) translateY(250%);
        background: white; border-radius: 50px; padding: 10px 20px;
        border: 1px solid #eee; border-left: 5px solid #10b981;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15); z-index: 10000;
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex; align-items: center; gap: 12px; width: 85%; max-width: 320px;
    }
    #fomo-popup.show { transform: translateX(-50%) translateY(0); }
    .fomo-avatar { width: 35px; height: 35px; background: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #10b981; font-weight: bold; }

    /* DASHBOARD LOGS */
    .activity-item { display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid #f1f1f1; font-size: 13px; }
    .activity-type { text-transform: uppercase; font-weight: 700; color: #555; }
    
    #successModal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; justify-content: center; align-items: center; backdrop-filter: blur(8px); background: rgba(0,0,0,0.5); z-index: 10000; }
    #successModal .modal-content { background: #fff; padding: 30px; border-radius: 24px; text-align: center; max-width: 320px; width: 85%; }
`;
document.head.appendChild(styleSheet);

// ==========================================
// 2. GLOBALS & AUTH HELPERS
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
    document.getElementById('modalMessage').innerHTML = `<p>${message}</p>`;
    document.getElementById('successModal').style.display = 'flex';
};
const closeModal = () => { document.getElementById('successModal').style.display = 'none'; };
const getRef = () => { const p = window.location.hash.split('?ref='); return p.length > 1 ? p[1].split('&')[0] : ''; };

// ==========================================
// 3. ACTION HANDLERS
// ==========================================
const handleLogin = async (e) => {
    e.preventDefault();
    const id = document.getElementById('loginIdentifier').value.trim();
    const pass = document.getElementById('password').value;
    const isEmail = id.includes('@');
    try {
        const res = await fetch(`${API_BASE_URL}/users/login`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ password: pass, email: isEmail ? id : '', phone: isEmail ? '' : id }) });
        const d = await res.json();
        if (!res.ok) return alert(d.message);
        localStorage.setItem('token', d.token); window.location.hash = '#home'; router();
    } catch (err) { alert("Server Down"); }
};

const handleRegister = async (e) => {
    e.preventDefault();
    const payload = { fullName: document.getElementById('fullName').value, email: document.getElementById('email').value, phone: document.getElementById('phone').value, password: document.getElementById('password').value, referral: document.getElementById('referral').value || undefined };
    if (payload.password !== document.getElementById('cpassword').value) return alert("Passwords Mismatch");
    try {
        const res = await fetch(`${API_BASE_URL}/users/register`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
        if (!res.ok) return alert("Registration Failed");
        renderOTPVerificationScreen(payload.email);
    } catch (err) { alert("Error"); }
};

// ==========================================
// 4. MAIN RENDER FUNCTIONS
// ==========================================
const renderHomeScreen = async () => {
    appContent.innerHTML = '<p style="text-align: center; padding: 50px;">Updating Balance...</p>';
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        const data = await res.json();
        const histRes = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
        const hData = await histRes.json();
        const txns = hData.transactions || [];
        
        const log = txns.slice(0, 4).map(t => `<div class="activity-item"><span class="activity-type">${t.type.replace(/_/g, ' ')}</span><span style="color:${t.amount > 0 ? '#10b981' : '#ef4444'};">₦${Number(Math.abs(t.amount)).toLocaleString()}</span></div>`).join('');

        appContent.innerHTML = `
            <div style="padding: 20px;"><h4>Hello, ${data.balance.full_name.split(' ')[0]}</h4></div>
            <div class="balance-card" style="background:#6a0dad; color:white; padding:25px; border-radius:20px; margin:0 15px;">
                <small>Asset Balance</small><h1>₦ ${Number(data.balance.balance || 0).toLocaleString()}</h1>
                <div style="display:flex; gap:10px; margin-top:15px;"><a href="#deposit" class="btn-deposit" style="flex:1; text-align:center; padding:12px; text-decoration:none;">Deposit</a><a href="#withdraw" class="btn-withdraw" style="flex:1; text-align:center; padding:12px; text-decoration:none;">Withdraw</a></div>
            </div>
            <div style="padding:20px;">
                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px;">
                    <a href="#certificate" style="text-align:center; text-decoration:none; color:#333;"><div style="background:#f3e5f5; padding:12px; border-radius:12px;"><i class="fas fa-file-contract"></i></div><span style="font-size:10px;">Legal</span></a>
                    <a href="#team" style="text-align:center; text-decoration:none; color:#333;"><div style="background:#f3e5f5; padding:12px; border-radius:12px;"><i class="fas fa-users"></i></div><span style="font-size:10px;">Team</span></a>
                    <a href="#history" style="text-align:center; text-decoration:none; color:#333;"><div style="background:#f3e5f5; padding:12px; border-radius:12px;"><i class="fas fa-history"></i></div><span style="font-size:10px;">History</span></a>
                    <a href="#rewards" style="text-align:center; text-decoration:none; color:#333;"><div style="background:#f3e5f5; padding:12px; border-radius:12px;"><i class="fas fa-gift"></i></div><span style="font-size:10px;">Rewards</span></a>
                </div>
                <div style="margin-top:25px; background:white; padding:15px; border-radius:15px;">
                    <h3 style="font-size:14px;">Recent Activities</h3>
                    ${log || '<p style="font-size:12px;">No activity.</p>'}
                </div>
            </div>`;
    } catch (e) { logoutUser(); }
};

const renderTeamPage = async () => {
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/referrals`);
        const data = await res.json();
        const list = (data.referrals || []).map(m => `<div style="background:#fff; padding:15px; border-radius:12px; margin-bottom:10px; border:1px solid #eee; display:flex; justify-content:space-between;"><div><strong>${m.full_name}</strong><br><small>${new Date(m.created_at).toLocaleDateString()}</small></div><strong style="color:#10b981;">+₦${Number(m.commission_earned || 0).toLocaleString()}</strong></div>`).join('');
        appContent.innerHTML = `<div style="padding:20px;"><h2>My Team</h2><div style="background:#6a0dad; color:white; padding:20px; border-radius:15px; text-align:center; margin-bottom:20px;"><small>Team Earnings</small><h2>₦${Number(data.total_commission || 0).toLocaleString()}</h2></div>${list || '<p>No team yet.</p>'}</div>`;
    } catch (e) {}
};

const renderHistoryPage = async () => {
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
        const data = await res.json();
        const list = (data.transactions || []).map(t => `<div style="background:#fff; padding:15px; border-radius:12px; margin-bottom:10px; border:1px solid #eee; display:flex; justify-content:space-between;"><div><strong style="text-transform:uppercase; font-size:12px;">${t.type.replace(/_/g, ' ')}</strong><br><small>${new Date(t.created_at).toLocaleDateString()}</small></div><strong style="color:${t.amount > 0 ? '#10b981' : '#ef4444'};">${t.amount > 0 ? '+' : '-'}₦${Number(Math.abs(t.amount)).toLocaleString()}</strong></div>`).join('');
        appContent.innerHTML = `<div style="padding:20px;"><h2>History</h2>${list || '<p>No records.</p>'}</div>`;
    } catch (e) {}
};

const renderRewardsPage = async () => {
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/reward-history`);
        const data = await res.json();
        const items = (data.history || []).map(h => `<div style="background:#fff; padding:12px; border-radius:10px; margin-bottom:8px; border-left:5px solid #10b981; display:flex; justify-content:space-between;"><div><small>${new Date(h.created_at).toLocaleDateString()}</small><br><strong>DAILY ROI</strong></div><strong style="color:#10b981;">+₦${Number(h.amount).toLocaleString()}</strong></div>`).join('');
        appContent.innerHTML = `<div style="padding:20px;"><h2>Earnings</h2><div style="background:#10b981; color:white; padding:20px; border-radius:15px; text-align:center; margin-bottom:20px;"><small>Total Daily Profit</small><h2>₦${Number(data.total_daily_income || 0).toLocaleString()}</h2></div>${items || '<p>No rewards yet.</p>'}</div>`;
    } catch (e) {}
};

const renderProductsPage = async () => {
    const res = await fetchWithAuth(`${API_BASE_URL}/users/allItems`);
    const d = await res.json();
    const items = d.items.map(i => `<div class="product-card-wc"><div class="product-image-wc"><img src="${i.itemimage}"></div><div class="product-info-wc"><h4>${i.itemname}</h4><div class="product-stats"><div><small>Price</small><br><strong>₦${Number(i.price).toLocaleString()}</strong></div><div><small>Daily</small><br><strong>₦${Number(i.dailyincome).toLocaleString()}</strong></div></div><button class="btn-invest-premium" data-plan-id="${i.id}" data-type="regular" style="margin-top:10px;">Invest Now</button></div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px;"><h2>Investments</h2><div class="product-grid-wc">${items}</div></div>`;
};

const renderVipPage = () => {
    const items = vipProducts.map(p => `<div class="product-card-wc" style="border:1px solid #ffd700;"><div class="product-image-wc"><img src="${p.itemimage}"></div><div class="product-info-wc"><h4>${p.name}</h4><div class="product-stats"><div><small>Price</small><br><strong>₦${p.price.toLocaleString()}</strong></div><div><small>ROI</small><br><strong>₦${p.total_return.toLocaleString()}</strong></div></div><button class="btn-invest-premium" data-plan-id="${p.id}" data-type="vip" style="background:#eab308; margin-top:10px;">Join VIP</button></div></div>`).join('');
    appContent.innerHTML = `<div style="padding:20px;"><h2>VIP Plans</h2><div class="product-grid-wc">${items}</div></div>`;
};

const renderDepositPage = () => {
    appContent.innerHTML = `<div style="padding:20px;"><h2>Deposit</h2><form id="dForm" style="background:white; padding:20px; border-radius:15px;"><label>Amount (NGN)</label><input type="number" id="amt" style="width:100%; padding:12px; margin:10px 0; border:1px solid #ddd; border-radius:10px;" required /><button type="submit" class="btn-deposit" style="width:100%; padding:15px;">Secure Deposit</button></form></div>`;
    document.getElementById('dForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const r = await fetchWithAuth(`${API_BASE_URL}/payment/initialize`, { method:'POST', body:JSON.stringify({amount: document.getElementById('amt').value}) });
        const res = await r.json(); if(res.success) window.location.href = res.data.paymentLink;
    });
};

const renderWithdrawPage = async () => {
    const res = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
    const d = await res.json();
    appContent.innerHTML = `<div style="padding:20px;"><h2>Withdraw</h2><div style="background:white; padding:20px; border-radius:15px;"><p style="font-size:12px; color:red;">* Fee: 9% of withdrawal amount</p><form id="wForm"><label>Amount</label><input type="number" id="wAmt" style="width:100%; padding:10px; margin:5px 0;" required /><label>Bank</label><input type="text" id="wBank" style="width:100%; padding:10px; margin:5px 0;" required /><label>Account No</label><input type="text" id="wAcc" style="width:100%; padding:10px; margin:5px 0;" required /><button type="submit" class="btn-withdraw" style="width:100%; padding:15px; margin-top:10px;">Submit Request</button></form></div></div>`;
    document.getElementById('wForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = { amount: document.getElementById('wAmt').value, bank_name: document.getElementById('wBank').value, account_number: document.getElementById('wAcc').value };
        const r = await fetchWithAuth(`${API_BASE_URL}/payment/withdraw`, { method:'POST', body:JSON.stringify(payload) });
        if(r.ok) showSuccessModal("Request Submitted!");
    });
};

const renderCertificatePage = () => { appContent.innerHTML = `<div style="padding:20px; text-align:center;"><h2>Legal Certificate</h2><img src="image.png" style="width:100%; border-radius:10px; box-shadow:0 5px 15px rgba(0,0,0,0.1);" onerror="this.src='https://placehold.co/600x800?text=Certificate+Image'"></div>`; };

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `<div style="padding:50px 20px; text-align:center;"><h2>JJB24</h2><form id="lForm" style="text-align:left;"><label>Email/Phone</label><input type="text" id="loginIdentifier" style="width:100%; padding:12px; margin:8px 0;" required /><br><label>Password</label><input type="password" id="password" style="width:100%; padding:12px; margin:8px 0;" required /><button type="submit" style="width:100%; background:#6a0dad; color:#fff; padding:15px; border:none; border-radius:12px; margin-top:15px;">Login</button></form><p style="margin-top:15px;">New? <a href="#register">Register</a></p></div>`;
    document.getElementById('lForm').addEventListener('submit', handleLogin);
};

const renderRegisterScreen = () => {
    bottomNav.style.display = 'none';
    const ref = getRef();
    appContent.innerHTML = `<div style="padding:40px 20px;"><h2>Register</h2><form id="rForm"><input type="text" id="fullName" placeholder="Name" required style="width:100%; padding:10px; margin:5px 0;" /><input type="email" id="email" placeholder="Email" required style="width:100%; padding:10px; margin:5px 0;" /><input type="tel" id="phone" placeholder="Phone" required style="width:100%; padding:10px; margin:5px 0;" /><input type="password" id="password" placeholder="Password" required style="width:100%; padding:10px; margin:5px 0;" /><input type="password" id="cpassword" placeholder="Confirm" required style="width:100%; padding:10px; margin:5px 0;" /><input type="text" id="referral" placeholder="Invite Code" value="${ref}" style="width:100%; padding:10px; margin:5px 0;" /><button type="submit" style="width:100%; background:#6a0dad; color:#fff; padding:15px; border:none; border-radius:12px;">Sign Up</button></form></div>`;
    document.getElementById('rForm').addEventListener('submit', handleRegister);
};

// ==========================================
// 5. SYSTEM ROUTER & FOMO
// ==========================================
const router = () => {
    const t = localStorage.getItem('token');
    let h = window.location.hash || '#home';
    if (!t && !['#login', '#register'].includes(h)) h = '#login';
    bottomNav.style.display = (['#login', '#register'].includes(h)) ? 'none' : 'flex';
    switch(h) {
        case '#home': renderHomeScreen(); break;
        case '#certificate': renderCertificatePage(); break;
        case '#team': renderTeamPage(); break;
        case '#rewards': renderRewardsPage(); break;
        case '#products': renderProductsPage(); break;
        case '#vip': renderVipPage(); break;
        case '#history': renderHistoryPage(); break;
        case '#deposit': renderDepositPage(); break;
        case '#withdraw': renderWithdrawPage(); break;
        case '#login': renderLoginScreen(); break;
        case '#register': renderRegisterScreen(); break;
        default: renderHomeScreen();
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
appContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-invest-premium')) {
        const id = e.target.dataset.planId, type = e.target.dataset.type;
        let url = `${API_BASE_URL}/investments/createInvestment/${id}`;
        if(type === 'vip') url = `${API_BASE_URL}/investments/createVipInvestment/${id}`;
        fetchWithAuth(url, { method: 'POST' }).then(res => res.json()).then(d => { if(d.success) showSuccessModal("Investment Success!"); else alert(d.message); });
    }
});

// FOMO POPUP
(function fomo() {
    const names = ["Musa I.", "Chioma E.", "Tunde B.", "Ngozi O.", "Emeka A.", "Sani Y."];
    const acts = ["registered", "invested ₦50k", "joined VIP", "withdrew ₦25,000"];
    const popup = document.createElement('div');
    popup.id = 'fomo-popup';
    popup.innerHTML = `<div class="fomo-avatar">👤</div><div id="fomo-text" style="font-size:13px; color:#333;">...</div>`;
    document.body.appendChild(popup);
    setInterval(() => {
        if(window.location.hash !== '#home' && window.location.hash !== '') return;
        document.getElementById('fomo-text').innerHTML = `<strong>${names[Math.floor(Math.random()*6)]}</strong> ${acts[Math.floor(Math.random()*4)]}`;
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 4000);
    }, 12000);
})();
