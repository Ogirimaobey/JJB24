// ==========================================
// 1. CONFIGURATION & STYLING INJECTION (WORLD-CLASS FINTECH UI)
// ==========================================

const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    :root {
        --glass-bg: rgba(255, 255, 255, 0.9);
        --glass-border: rgba(255, 255, 255, 0.4);
        --accent-primary: #8B5CF6; 
        --accent-success: #10B981; 
        --accent-danger: #EF4444;  
        --bg-main: #F8FAFC;        
        --text-dark: #0F172A;      /* Strong Slate for readability */
        --text-muted: #64748B;     /* Clear Slate for sub-labels */
        --card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
        --nav-height: 75px;
    }

    /* DESKTOP RESPONSIVENESS */
    body { 
        font-family: 'Plus Jakarta Sans', sans-serif !important; 
        background: #E2E8F0; 
        margin: 0; 
        display: flex;
        justify-content: center;
        color: var(--text-dark);
    }

    #app-content {
        background: var(--bg-main);
        width: 100%;
        max-width: 500px; 
        min-height: 100vh;
        position: relative;
        box-shadow: 0 0 100px rgba(0,0,0,0.1);
        padding-bottom: 110px;
    }

    /* GREETING & HEADER FIX */
    .top-header { display: flex; justify-content: space-between; align-items: center; padding: 25px 20px 10px; }
    .user-greeting h4 { margin: 0; font-size: 22px; font-weight: 800; color: var(--text-dark); } /* High contrast */
    .user-greeting p { margin: 0; font-size: 13px; color: var(--text-muted); font-weight: 600; }

    /* MODERN BALANCE CARD */
    .balance-card {
        background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
        margin: 0 20px 25px; padding: 35px 30px; border-radius: 32px;
        color: white; position: relative; overflow: hidden;
        box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.3);
    }
    .balance-card h2 { font-size: 38px; font-weight: 800; margin: 10px 0 25px; letter-spacing: -1px; }
    .balance-card small { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.7; font-weight: 700; }

    /* ACTION BUTTONS */
    .btn-deposit, .btn-withdraw, .btn-invest-premium, .btn-auth {
        border: none !important; border-radius: 18px !important;
        font-weight: 700 !important; letter-spacing: -0.2px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .btn-deposit { background: var(--accent-success) !important; color: white !important; }
    .btn-withdraw { background: rgba(255,255,255,0.1) !important; color: white !important; backdrop-filter: blur(10px); }

    /* QUICK ACTIONS GRID */
    .quick-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 0 20px 25px; }
    .action-button {
        background: white; border-radius: 24px; padding: 20px 10px;
        display: flex; flex-direction: column; align-items: center; gap: 10px;
        text-decoration: none; box-shadow: var(--card-shadow); border: 1px solid rgba(0,0,0,0.02);
    }
    .action-button i { font-size: 22px; color: var(--accent-primary); }
    .action-button span { font-size: 12px; font-weight: 700; color: var(--text-dark); }

    /* BOTTOM NAV FIXED */
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

    /* STREAM / LOGS */
    .activity-card { margin: 0 20px; background: white; border-radius: 32px; padding: 24px; box-shadow: var(--card-shadow); }
    .activity-item { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; border-bottom: 1px solid #F1F5F9; }
    .activity-item:last-child { border: none; }
    
    /* FORMS */
    .form-group { text-align: left; margin-bottom: 20px; }
    .form-group label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 8px; color: var(--text-muted); }
    .form-group input, .security-input, select { width: 100%; padding: 18px; border-radius: 20px; border: 1.5px solid #E2E8F0; background: #F8FAFC; box-sizing: border-box; font-weight: 600; font-size: 15px; }
    .form-group input:focus { border-color: var(--accent-primary); outline: none; background: white; }

    /* AUTH */
    .auth-container { padding: 60px 25px; text-align: center; }
    .auth-logo { font-size: 42px; font-weight: 900; color: var(--accent-primary); margin-bottom: 10px; letter-spacing: -2px; }

    #successModal, #whatsappModal { z-index: 999999; }
`;
document.head.appendChild(styleSheet);

// ==========================================
// 2. MODALS & DATA
// ==========================================

const announcementDiv = document.createElement("div");
announcementDiv.id = "whatsappModal";
announcementDiv.innerHTML = `
    <div class="modal-content">
        <div style="width: 70px; height: 70px; background: #DCFCE7; border-radius: 24px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <i class="fab fa-whatsapp" style="font-size: 35px; color: #25D366;"></i>
        </div>
        <h3 style="margin: 0 0 10px; color: #0F172A; font-weight: 800;">Official Community</h3>
        <p style="color: #64748B; font-size: 14px; line-height: 1.5; margin-bottom: 25px;">Join our community for real-time updates and priority support.</p>
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
// 3. LOGIC & HANDSHAKES
// ==========================================

const showSuccessModal = (message) => {
    const modalMessage = document.getElementById('modalMessage');
    if (modalMessage) modalMessage.innerHTML = `<div style="width:60px;height:60px;background:#DCFCE7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;"><i class="fas fa-check" style="color:#10B981;font-size:24px;"></i></div><span style="font-size:18px;font-weight:800;color:#0F172A;">Success</span><p style="color:#64748B;margin-top:10px;">${message}</p>`;
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

window.handleForgotPassword = async () => {
    const email = prompt("Enter registered email:");
    if (!email) return;
    try {
        const res = await fetch(`${API_BASE_URL}/users/forgot-password`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
        const result = await res.json(); alert(result.message);
    } catch (e) { alert("Error."); }
};

const handleInvestClick = async (event) => {
    if (event.target.classList.contains('btn-invest-premium')) {
        const itemId = event.target.dataset.planId;
        const type = event.target.dataset.type;
        if (!confirm(`Activate this plan?`)) return;
        const endpoint = type === 'vip' ? `${API_BASE_URL}/investments/createVipInvestment/${itemId}` : `${API_BASE_URL}/investments/createInvestment/${itemId}`;
        const res = await fetchWithAuth(endpoint, { method: 'POST' });
        const result = await res.json();
        if (res.ok && result.success) { showSuccessModal('Plan Activated!'); window.location.hash = '#home'; router(); } else { alert(result.message); }
    }
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

    let complianceCardHTML = '';
    if (userEmail === 'audit@flutterwave.com') {
        complianceCardHTML = `<div style="background:white; border-radius:28px; padding:25px; margin:0 20px 25px; border-left:6px solid #F59E0B; box-shadow:var(--card-shadow);"><h3 style="margin:0; font-size:14px; font-weight:800; color:#F59E0B;">COMPLIANCE AUDIT</h3><p style="font-size:12px; color:#475569; margin:10px 0 0;">CAC: Monaya Rd, Ogoja 550101, Cross River.</p></div>`;
    }

    let activityHTML = "<p style='text-align:center; font-size:12px; color:#94A3B8; padding:20px;'>Clean Logs</p>";
    try {
        const hRes = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
        const hData = await hRes.json();
        if (hData.transactions.length > 0) {
            activityHTML = hData.transactions.slice(0, 4).map(t => `
                <div class="activity-item">
                    <div><div style="font-weight:700; font-size:14px; color:var(--text-dark);">${t.type.replace(/_/g, ' ')}</div><small style="color:#94A3B8; font-weight:600;">${new Date(t.created_at).toLocaleDateString()}</small></div>
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
                <div style="display:flex; gap:10px; margin:25px 0; text-align:left;"><input type="checkbox" id="termsCheckbox" required /><label style="font-size:12px; font-weight:600; color:var(--text-muted);">I accept the terms & conditions.</label></div>
                <button type="submit" class="btn-auth" style="width:100%; padding:20px; background: var(--accent-primary); color:white; font-size:16px;">CREATE ACCOUNT</button>
            </form>
            <p style="margin-top: 40px; font-size: 14px; color: var(--text-muted); font-weight:600;">Already a member? <a href="#login" style="color: var(--accent-primary); text-decoration: none; font-weight: 800;">Login</a></p>
        </div>`;
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
};

// ==========================================
// 6. ROUTER & EVENT SYSTEM
// ==========================================

const router = () => {
    const token = localStorage.getItem('token');
    let hash = window.location.hash || '#home';
    if (hash.includes('?')) hash = hash.split('?')[0];
    
    if (['#login', '#register'].includes(hash)) { 
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
// 7. SOCIAL PROOF (FOMO)
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
        #fomo-popup { position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%) translateY(200%); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.8); border-left: 5px solid #10B981; padding: 12px 18px; border-radius: 20px; box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.1); font-family: inherit; z-index: 9999; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; align-items: center; gap: 12px; width: 90%; max-width: 340px; pointer-events: none; }
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
