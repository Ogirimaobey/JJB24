const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');
const API_BASE_URL = 'http://localhost:3000/api';

const renderLoginScreen = () => { /* ... full login screen code ... */ };
const renderRegisterScreen = () => { /* ... full register screen code ... */ };
const handleLogin = async (event) => { /* ... full login handler code ... */ };
const handleRegister = async (event) => { /* ... full register handler code ... */ };

const renderHomeScreen = async () => {
    bottomNav.innerHTML = `
        <a href="#home" class="nav-link active"><i class="fas fa-home"></i><span>Home</span></a>
        <a href="#task" class="nav-link"><i class="fas fa-tasks"></i><span>Task</span></a>
        <a href="#promotion" class="nav-link"><i class="fas fa-gift"></i><span>Promotion</span></a>
        <a href="#me" class="nav-link"><i class="fas fa-user"></i><span>Me</span></a>
    `;
    bottomNav.style.display = 'flex';
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Dashboard...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) { throw new Error('Failed to load data.'); }
        const data = await response.json();

        let productHTML = '';
        data.plans.forEach(plan => {
            productHTML += `
                <div class="product-card">
                    <div class="product-info">
                        <h4>${plan.name}</h4>
                        <p>Price: ₦${plan.price.toLocaleString()}</p>
                        <p>Daily Income: ₦${plan.daily_income.toLocaleString()}</p>
                    </div>
                    <button class="btn-invest" data-plan-id="${plan.id}">Invest</button>
                </div>
            `;
        });

        // --- UPDATED HTML STRUCTURE ---
        const homeHTML = `
            <div class="home-header">
                <div class="balance-card">
                    <small>Total Assets (NGN)</small>
                    <h2>₦ 0.00</h2>
                    <div class="header-buttons">
                        <button class="btn-deposit">Deposit</button>
                        <button class="btn-withdraw">Withdraw</button>
                    </div>
                </div>
            </div>
            <div class="home-content">
                <div class="summary-grid">
                    <div class="summary-card">
                        <h4>Total Revenue</h4>
                        <p>₦ 0.00</p>
                    </div>
                    <div class="summary-card">
                        <h4>My Team</h4>
                        <p>0</p>
                    </div>
                </div>
                <div class="invite-card">
                    <h4>Invite friends</h4>
                    <p>Share your code and earn rewards!</p>
                    <div class="invite-action">
                        <span>${data.user.own_referral_code}</span>
                        <button>Share</button>
                    </div>
                </div>
                <h3>Investment Products</h3>
                <div class="product-list">
                    ${productHTML}
                </div>
            </div>
        `;
        appContent.innerHTML = homeHTML;
    } catch (error) {
        console.error('Failed to render home page:', error);
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load home screen.</p>';
    }
};

const router = () => { /* ... full router code ... */ };
router();
