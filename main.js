// --- 1. CONFIGURATION & IMPORTS ---
// If you have a separate vip.js file, keep this import. If not, remove it.
// import vipProducts from './vip.js'; 

const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');
const API_BASE_URL = 'https://jjb24-backend.onrender.com/api';

// --- 2. GLOBAL HELPERS ---

// Show Glass Modal
const showSuccessModal = (message) => {
    const modal = document.getElementById('successModal');
    const msgEl = document.getElementById('modalMessage');
    if (msgEl) msgEl.textContent = message;
    if (modal) modal.style.display = 'flex';
};

// Copy to Clipboard (Robust)
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied!');
    }
};

// Auth Helpers
const logoutUser = () => {
    localStorage.removeItem('token');
    window.location.hash = '#login';
};

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
        console.error("Network Error", e);
        return null;
    }
};

// --- 3. AUTHENTICATION PAGES ---

const renderLoginScreen = () => {
    bottomNav.style.display = 'none';
    appContent.innerHTML = `
        <div class="min-h-[85vh] flex flex-col justify-center items-center">
            <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mx-4">
                <div class="text-center mb-8">
                    <div class="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg shadow-brand-500/30">J</div>
                    <h2 class="font-display text-2xl font-bold text-gray-900">Welcome Back</h2>
                    <p class="text-gray-500 text-sm mt-1">Access your investment portfolio</p>
                </div>
                <form id="loginForm" class="space-y-4">
                    <input type="text" id="loginIdentifier" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-brand-500 focus:border-brand-500 transition-all" required placeholder="Email or Phone">
                    <input type="password" id="password" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-brand-500 focus:border-brand-500 transition-all" required placeholder="Password">
                    <button type="submit" class="w-full text-white bg-gray-900 hover:bg-gray-800 font-bold rounded-xl py-3.5 shadow-lg transition-transform active:scale-95">Sign In</button>
                </form>
                <p class="mt-6 text-center text-sm text-gray-500">New here? <a href="#register" class="font-semibold text-brand-600 hover:text-brand-500">Create account</a></p>
            </div>
        </div>`;

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const identifier = document.getElementById('loginIdentifier').value.trim();
        const password = document.getElementById('password').value;
        const btn = e.target.querySelector('button');
        btn.innerHTML = '<i class="ph ph-spinner animate-spin text-lg"></i>';
        
        try {
            const isEmail = identifier.includes('@');
            const res = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, email: isEmail ? identifier : '', phone: isEmail ? '' : identifier })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            localStorage.setItem('token', data.token);
            window.location.hash = '#home';
        } catch (err) {
            alert(err.message || 'Login failed');
            btn.innerHTML = 'Sign In';
        }
    });
};

const renderRegisterScreen = () => {
    bottomNav.style.display = 'none';
    const refCode = window.location.hash.split('?ref=')[1]?.split('&')[0] || '';
    
    appContent.innerHTML = `
        <div class="min-h-[85vh] flex flex-col justify-center items-center py-8">
            <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mx-4">
                <div class="text-center mb-6">
                    <h2 class="font-display text-2xl font-bold text-gray-900">Create Account</h2>
                    <p class="text-gray-500 text-sm">Start building wealth today</p>
                </div>
                <form id="registerForm" class="space-y-3">
                    <div class="grid grid-cols-2 gap-3">
                        <input type="text" id="fullName" class="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm" placeholder="Full Name" required>
                        <input type="tel" id="phone" class="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm" placeholder="Phone" required>
                    </div>
                    <input type="email" id="email" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm" placeholder="Email" required>
                    <input type="password" id="password" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm" placeholder="Password" required>
                    <input type="text" id="referral" value="${refCode}" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm" placeholder="Referral Code (Optional)" ${refCode ? 'readonly' : ''}>
                    
                    <div class="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="terms" required class="w-4 h-4 rounded text-brand-600">
                        <label for="terms" class="text-xs text-gray-500">I agree to <a href="#terms" class="text-brand-600 font-bold">Terms</a> & <a href="#privacy" class="text-brand-600 font-bold">Privacy</a></label>
                    </div>
                    <button type="submit" class="w-full text-white bg-gray-900 hover:bg-gray-800 font-bold rounded-xl py-3.5 shadow-lg mt-2">Create Account</button>
                </form>
                <p class="mt-6 text-center text-sm text-gray-500">Have an account? <a href="#login" class="font-semibold text-brand-600">Login</a></p>
            </div>
        </div>`;

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerHTML = 'Creating...';
        
        const payload = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
            referral: document.getElementById('referral').value
        };

        try {
            const res = await fetch(`${API_BASE_URL}/users/register`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            alert('Account created! Please verify OTP.');
            renderOTPVerificationScreen(payload.email);
        } catch (err) {
            alert(err.message);
            btn.innerHTML = 'Create Account';
        }
    });
};

const renderOTPVerificationScreen = (email) => {
    appContent.innerHTML = `
        <div class="min-h-[80vh] flex flex-col justify-center items-center">
            <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mx-4 text-center">
                <h2 class="font-display text-2xl font-bold text-gray-900 mb-2">Verify Phone</h2>
                <p class="text-gray-500 text-sm mb-6">Enter code sent to ${email}</p>
                <form id="otpForm" class="space-y-4">
                    <input type="text" id="otpCode" class="w-full bg-gray-50 border border-gray-200 text-center text-2xl tracking-widest font-mono rounded-xl p-4" placeholder="000000" maxlength="6" required>
                    <button type="submit" class="w-full text-white bg-brand-600 font-bold rounded-xl py-3.5 shadow-lg">Verify</button>
                </form>
            </div>
        </div>`;
    document.getElementById('otpForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const otp = document.getElementById('otpCode').value;
        try {
            const res = await fetch(`${API_BASE_URL}/users/verify-otp`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email, otp }) });
            if(!res.ok) throw new Error('Verification failed');
            alert('Verified!');
            renderLoginScreen();
        } catch(err) { alert(err.message); }
    });
};

// --- 4. CORE: DASHBOARD / HOME ---
const renderHomeScreen = async () => {
    const token = localStorage.getItem('token');
    if (!token) { logoutUser(); return; }
    appContent.innerHTML = `<div class="flex justify-center pt-20"><i class="ph ph-spinner animate-spin text-4xl text-brand-500"></i></div>`;

    try {
        const [resBalance, resInv] = await Promise.all([
            fetchWithAuth(`${API_BASE_URL}/users/balance`),
            fetchWithAuth(`${API_BASE_URL}/investments`)
        ]);
        if (!resBalance || !resInv) return;

        const dataBalance = await resBalance.json();
        const dataInv = await resInv.json();
        const user = dataBalance.balance;
        const investments = Array.isArray(dataInv) ? dataInv : (dataInv.data || []);
        const activeInv = investments.filter(i => i.status === 'active' || !i.status);

        appContent.innerHTML = `
            <div class="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                <div>
                    <h1 class="font-display text-2xl font-bold text-gray-900">Hello, ${user.full_name.split(' ')[0]}</h1>
                    <p class="text-gray-500 text-sm">Total Balance: <span class="text-gray-900 font-bold">₦${Number(user.balance).toLocaleString()}</span></p>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-8">
                <a href="#deposit" class="btn-action btn-deposit rounded-2xl p-4 text-left group relative no-underline">
                    <div class="relative z-10 flex flex-col h-full justify-between">
                        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white mb-3"><i class="ph-bold ph-arrow-down-left text-xl"></i></div>
                        <div><span class="block text-white/80 text-xs font-medium uppercase">Add Funds</span><span class="block text-white text-lg font-display font-bold">Deposit</span></div>
                    </div>
                </a>
                <a href="#withdraw" class="btn-action btn-withdraw rounded-2xl p-4 text-left group relative no-underline">
                    <div class="relative z-10 flex flex-col h-full justify-between">
                        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white mb-3"><i class="ph-bold ph-arrow-up-right text-xl"></i></div>
                        <div><span class="block text-white/80 text-xs font-medium uppercase">Cash Out</span><span class="block text-white text-lg font-display font-bold">Withdraw</span></div>
                    </div>
                </a>
            </div>

            <div class="mb-8">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="font-display text-lg font-bold text-gray-900">Active Portfolio</h2>
                    <a href="#products" class="text-xs font-bold text-brand-600">Invest More</a>
                </div>
                <div class="space-y-3">
                    ${activeInv.length === 0 ? `<div class="p-6 text-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400 text-sm bg-white/50">No active investments.</div>` : activeInv.map(inv => `
                        <div class="glass-panel p-4 rounded-xl flex justify-between items-center border-l-4 border-brand-500">
                            <div><h4 class="font-bold text-sm text-gray-900">${inv.item_name || 'Plan'}</h4><p class="text-xs text-gray-500">₦${Number(inv.amount).toLocaleString()}</p></div>
                            <div class="text-right"><p class="text-xs text-gray-400 uppercase font-semibold">Daily</p><p class="font-bold text-brand-600">+₦${Number(inv.daily_income || 0).toLocaleString()}</p></div>
                        </div>`).join('')}
                </div>
            </div>
            
            <div class="grid grid-cols-4 gap-2 text-center text-xs text-gray-500">
                <a href="#team" class="bg-white p-3 rounded-xl shadow-sm hover:bg-gray-50"><i class="ph-fill ph-users text-2xl text-brand-500 mb-1 block"></i>Team</a>
                <a href="#history" class="bg-white p-3 rounded-xl shadow-sm hover:bg-gray-50"><i class="ph-fill ph-clock-counter-clockwise text-2xl text-brand-500 mb-1 block"></i>History</a>
                <a href="#certificate" class="bg-white p-3 rounded-xl shadow-sm hover:bg-gray-50"><i class="ph-fill ph-certificate text-2xl text-brand-500 mb-1 block"></i>Legal</a>
                <a href="#support" class="bg-white p-3 rounded-xl shadow-sm hover:bg-gray-50"><i class="ph-fill ph-headset text-2xl text-brand-500 mb-1 block"></i>Support</a>
            </div>
        `;
    } catch (e) { console.error(e); }
};

// --- 5. PAGE: PRODUCTS (GRID) ---
const renderProductsPage = async () => {
    appContent.innerHTML = `<div class="flex justify-center pt-20"><i class="ph ph-spinner animate-spin text-4xl text-brand-500"></i></div>`;
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/allItems`);
        if (!res) return;
        const data = await res.json();
        const items = data.items || [];

        appContent.innerHTML = `
            <div class="mb-6"><h2 class="font-display text-2xl font-bold text-gray-900">Investment Plans</h2><p class="text-gray-500 text-sm">Choose a plan.</p></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                ${items.map(item => `
                    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden group">
                        <div class="absolute top-0 right-0 bg-brand-100 text-brand-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">DAILY PAYOUT</div>
                        <img src="${item.itemimage}" class="w-full h-32 object-cover rounded-xl mb-4 bg-gray-100" onerror="this.src='https://placehold.co/300x200?text=JJB'">
                        <h3 class="font-bold text-gray-900 text-lg mb-1">${item.itemname}</h3>
                        <div class="flex justify-between items-end mt-auto pt-4">
                            <div><p class="text-xs text-gray-400 uppercase">Price</p><p class="text-lg font-bold text-gray-900">₦${Number(item.price).toLocaleString()}</p></div>
                            <div class="text-right"><p class="text-xs text-gray-400 uppercase">Daily</p><p class="text-lg font-bold text-brand-600">₦${Number(item.dailyincome).toLocaleString()}</p></div>
                        </div>
                        <button class="w-full mt-4 bg-gray-900 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-gray-800 transition btn-invest" data-id="${item.id}" data-type="regular">Invest Now</button>
                    </div>`).join('')}
            </div>`;
    } catch (e) { console.error(e); }
};

// --- 6. PAGE: DEPOSIT ---
const renderDepositPage = () => {
    appContent.innerHTML = `
        <div class="max-w-md mx-auto">
            <div class="mb-6"><a href="#home" class="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-2"><i class="ph ph-arrow-left"></i> Back</a><h2 class="font-display text-2xl font-bold text-gray-900">Deposit Funds</h2></div>
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <form id="depositForm" class="space-y-6">
                    <div><label class="block text-xs font-bold text-gray-500 uppercase mb-2">Amount (NGN)</label><div class="relative"><span class="absolute left-4 top-3.5 text-gray-400 font-bold">₦</span><input type="number" id="amount" class="w-full pl-8 bg-gray-50 border border-gray-200 rounded-xl p-3.5 font-bold text-lg outline-none focus:ring-brand-500" placeholder="50,000" required min="1000"></div></div>
                    <button type="submit" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95">Proceed to Payment</button>
                </form>
            </div>
        </div>`;
    document.getElementById('depositForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const btn = e.target.querySelector('button');
        btn.innerText = 'Processing...';
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(atob(token.split('.')[1]));
            const res = await fetchWithAuth(`${API_BASE_URL}/payment/initialize`, { method: 'POST', body: JSON.stringify({ userId: user.id, amount: parseFloat(amount), email: user.email, name: user.phone }) });
            const data = await res.json();
            if (data.success && data.data.paymentLink) window.location.href = data.data.paymentLink;
            else throw new Error('Could not generate link');
        } catch (err) { alert('Error: ' + err.message); btn.innerText = 'Proceed to Payment'; }
    });
};

// --- 7. PAGE: WITHDRAW ---
const renderWithdrawPage = async () => {
    appContent.innerHTML = `<div class="flex justify-center pt-20"><i class="ph ph-spinner animate-spin text-4xl text-brand-500"></i></div>`;
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        const data = await res.json();
        const balance = data.balance.balance;
        appContent.innerHTML = `
            <div class="max-w-md mx-auto">
                <div class="mb-6"><a href="#home" class="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-2"><i class="ph ph-arrow-left"></i> Back</a><h2 class="font-display text-2xl font-bold text-gray-900">Withdraw</h2><p class="text-gray-500 text-sm">Available: <span class="text-brand-600 font-bold">₦${Number(balance).toLocaleString()}</span></p></div>
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <form id="withdrawForm" class="space-y-4">
                        <input type="number" id="wAmount" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3" placeholder="Amount" required>
                        <div class="p-3 bg-yellow-50 rounded-lg hidden" id="feeBox"><div class="flex justify-between text-xs text-yellow-800"><span>Fee (9%)</span><span id="feeDisp">₦0</span></div><div class="flex justify-between text-sm font-bold text-gray-900 mt-1"><span>Receive</span><span id="finalDisp">₦0</span></div></div>
                        <input type="text" id="wBank" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3" placeholder="Bank Name" required>
                        <input type="text" id="wAccNum" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3" placeholder="Account Number" required>
                        <input type="text" id="wAccName" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3" placeholder="Account Name" required>
                        <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95">Submit Request</button>
                    </form>
                </div>
            </div>`;
        document.getElementById('wAmount').addEventListener('input', (e) => {
            const val = parseFloat(e.target.value) || 0;
            const fee = val * 0.09;
            document.getElementById('feeBox').classList.remove('hidden');
            document.getElementById('feeDisp').innerText = `₦${fee.toLocaleString()}`;
            document.getElementById('finalDisp').innerText = `₦${(val - fee).toLocaleString()}`;
        });
        document.getElementById('withdrawForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('wAmount').value);
            if(amount > balance) return alert('Insufficient Funds');
            try {
                const res = await fetchWithAuth(`${API_BASE_URL}/payment/withdraw`, { method: 'POST', body: JSON.stringify({ amount, bank_name: document.getElementById('wBank').value, account_number: document.getElementById('wAccNum').value, account_name: document.getElementById('wAccName').value }) });
                const result = await res.json();
                if(result.success) { showSuccessModal('Submitted!'); setTimeout(() => window.location.hash = '#home', 2000); } 
                else { alert(result.message); }
            } catch(err) { alert('Error processing withdrawal'); }
        });
    } catch (e) { console.error(e); }
};

// --- 8. PAGE: PROFILE (ME) ---
const renderMePage = async () => {
    appContent.innerHTML = `<div class="flex justify-center pt-20"><i class="ph ph-spinner animate-spin text-4xl text-brand-500"></i></div>`;
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/users/balance`);
        const data = await res.json();
        const user = data.balance;
        
        // Referral Code Logic
        let refCode = user.referral_code;
        if (!refCode || refCode === 'null') refCode = user.phone_number ? user.phone_number.replace(/[^a-zA-Z0-9]/g, '') : `USER${user.id}`;

        appContent.innerHTML = `
            <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6 text-center">
                <div class="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-3xl mx-auto mb-4"><i class="ph-fill ph-user"></i></div>
                <h2 class="font-bold text-xl text-gray-900">${user.full_name}</h2>
                <p class="text-gray-500 text-sm">${user.email}</p>
                <div class="mt-4 bg-gray-50 rounded-xl p-3 flex justify-between items-center border border-gray-200">
                    <span class="text-xs text-gray-500 font-bold uppercase tracking-wider">Referral Code</span>
                    <div class="flex items-center gap-2">
                        <span class="font-mono font-bold text-gray-900" id="refCodeDisp">${refCode}</span>
                        <button id="copyRef" class="text-brand-600 hover:text-brand-700 font-bold text-xs bg-brand-50 px-2 py-1 rounded">COPY</button>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                <a href="#history" class="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:bg-gray-50"><span class="flex items-center gap-3"><i class="ph-fill ph-clock-counter-clockwise text-xl text-gray-400"></i> History</span><i class="ph ph-caret-right text-gray-300"></i></a>
                <a href="#team" class="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:bg-gray-50"><span class="flex items-center gap-3"><i class="ph-fill ph-users text-xl text-gray-400"></i> My Team</span><i class="ph ph-caret-right text-gray-300"></i></a>
                <a href="#settings" class="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:bg-gray-50"><span class="flex items-center gap-3"><i class="ph-fill ph-gear text-xl text-gray-400"></i> Settings</span><i class="ph ph-caret-right text-gray-300"></i></a>
                <a href="#support" class="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:bg-gray-50"><span class="flex items-center gap-3"><i class="ph-fill ph-headset text-xl text-gray-400"></i> Support</span><i class="ph ph-caret-right text-gray-300"></i></a>
                <button onclick="logoutUser()" class="w-full mt-6 bg-red-50 text-red-600 font-bold py-4 rounded-xl border border-red-100 hover:bg-red-100 transition">Log Out</button>
            </div>`;
        
        document.getElementById('copyRef').addEventListener('click', () => copyToClipboard(refCode));
    } catch(e) { console.error(e); }
};

// --- 9. PAGE: HISTORY ---
const renderHistoryPage = async () => {
    appContent.innerHTML = `<div class="flex justify-center pt-20"><i class="ph ph-spinner animate-spin text-4xl text-brand-500"></i></div>`;
    try {
        const res = await fetchWithAuth(`${API_BASE_URL}/payment/history`);
        const data = await res.json();
        const txns = data.transactions || [];
        
        appContent.innerHTML = `
            <div class="mb-6"><a href="#me" class="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-2"><i class="ph ph-arrow-left"></i> Back</a><h2 class="font-display text-2xl font-bold text-gray-900">Transactions</h2></div>
            <div class="space-y-3 pb-20">
                ${txns.length === 0 ? '<p class="text-center text-gray-400 mt-10">No history found.</p>' : txns.map(t => {
                    const isDep = t.type === 'deposit';
                    return `
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full ${isDep ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} flex items-center justify-center"><i class="ph-bold ${isDep ? 'ph-arrow-down-left' : 'ph-arrow-up-right'}"></i></div>
                            <div><p class="font-bold text-gray-900 capitalize">${t.type}</p><p class="text-xs text-gray-400">${new Date(t.created_at).toLocaleDateString()}</p></div>
                        </div>
                        <div class="text-right"><p class="font-bold ${isDep ? 'text-green-600' : 'text-gray-900'}">₦${Number(t.amount).toLocaleString()}</p><p class="text-[10px] uppercase font-bold text-gray-400">${t.status}</p></div>
                    </div>`;
                }).join('')}
            </div>`;
    } catch(e) { console.error(e); }
};

// --- 10. SECONDARY PAGES (Team, Support, etc.) ---
const renderSimplePage = (title, content) => {
    appContent.innerHTML = `
        <div class="max-w-md mx-auto">
            <div class="mb-6"><a href="#home" class="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-2"><i class="ph ph-arrow-left"></i> Back</a><h2 class="font-display text-2xl font-bold text-gray-900">${title}</h2></div>
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-gray-600 leading-relaxed">${content}</div>
        </div>`;
};

// --- 11. ROUTER & GLOBAL LISTENERS ---
const router = () => {
    const hash = window.location.hash || '#login';
    // Hide nav on auth pages
    if(['#login', '#register', '#terms', '#privacy'].includes(hash.split('?')[0])) {
        bottomNav.style.display = 'none';
    } else {
        bottomNav.style.display = 'flex';
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('text-brand-600', 'text-gray-900'); l.classList.add('text-gray-400');
            if(l.getAttribute('href') === hash) { l.classList.remove('text-gray-400'); l.classList.add('text-brand-600'); }
        });
    }

    switch(hash.split('?')[0]) {
        case '#login': renderLoginScreen(); break;
        case '#register': renderRegisterScreen(); break;
        case '#home': renderHomeScreen(); break;
        case '#products': renderProductsPage(); break;
        case '#deposit': renderDepositPage(); break;
        case '#withdraw': renderWithdrawPage(); break;
        case '#vip': renderProductsPage(); break; 
        case '#me': renderMePage(); break;
        case '#history': renderHistoryPage(); break;
        case '#team': renderSimplePage('My Team', '<p class="text-center py-8 text-gray-400">Team visualization coming soon.</p>'); break;
        case '#support': renderSimplePage('Support', '<p class="text-center">Contact us at <a href="mailto:support@jjb24.com" class="text-brand-600 font-bold">support@jjb24.com</a></p>'); break;
        case '#certificate': renderSimplePage('Legal', '<p class="text-center py-8 text-gray-400">Legal documents will be displayed here.</p>'); break;
        case '#settings': renderSimplePage('Settings', '<p class="text-center py-8 text-gray-400">Password change coming soon.</p>'); break;
        case '#terms': renderSimplePage('Terms', '<p>Standard terms apply...</p>'); break;
        case '#privacy': renderSimplePage('Privacy', '<p>Standard privacy policy...</p>'); break;
        default: renderLoginScreen();
    }
};

// Global Investment Click Handler
appContent.addEventListener('click', async (e) => {
    if(e.target.classList.contains('btn-invest')) {
        const id = e.target.dataset.id;
        if(!confirm('Confirm Investment?')) return;
        e.target.innerText = 'Processing...';
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/investments/createInvestment/${id}`, { method: 'POST' });
            const data = await res.json();
            if(data.success) { showSuccessModal('Investment Successful!'); setTimeout(() => window.location.hash = '#home', 2000); } 
            else { alert(data.message); e.target.innerText = 'Invest Now'; }
        } catch(err) { alert('Error'); e.target.innerText = 'Invest Now'; }
    }
});

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
