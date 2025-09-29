const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');
const API_BASE_URL = 'http://localhost:3000/api';

const renderLoginScreen = () => { /* ... full login screen code ... */ };
const renderRegisterScreen = () => { /* ... full register screen code ... */ };
const handleLogin = async (event) => { /* ... full login handler code ... */ };
const handleRegister = async (event) => { /* ... full register handler code ... */ };

const renderHomeScreen = async () => { /* ... full home screen renderer code ... */ };

const renderProductsPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Products...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) { throw new Error('Failed to load data.'); }
        const data = await response.json();

        let productHTML = '';
        data.plans.forEach(plan => {
            productHTML += `
                <div class="product-card-large">
                    <img src="${plan.image}" alt="${plan.name}">
                    <div class="product-details">
                        <h4>${plan.name}</h4>
                        <p><strong>Price:</strong> ₦${plan.price.toLocaleString()}</p>
                        <p><strong>Daily Income:</strong> ₦${plan.daily_income.toLocaleString()}</p>
                        <p><strong>Duration:</strong> ${plan.duration} days</p>
                    </div>
                    <button class="btn-invest" data-plan-id="${plan.id}">Invest</button>
                </div>
            `;
        });

        const pageHTML = `
            <div class="page-container">
                <div class="page-header">
                    <h2>Investment Products</h2>
                </div>
                <div class="product-grid">
                    ${productHTML}
                </div>
            </div>
        `;
        appContent.innerHTML = pageHTML;
    } catch (error) {
        console.error('Failed to render products page:', error);
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load products.</p>';
    }
};

const router = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        renderLoginScreen();
        return;
    }

    bottomNav.style.display = 'flex';
    const hash = window.location.hash || '#home';

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });

    switch (hash) {
        case '#products':
            renderProductsPage();
            break;
        case '#promotion':
            appContent.innerHTML = `<h1>Promotion Page</h1>`;
            break;
        case '#me':
            appContent.innerHTML = `<h1>Me Page</h1>`;
            break;
        case '#home':
        default:
            renderHomeScreen();
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
