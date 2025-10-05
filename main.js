const appContent = document.getElementById('app-content');
const bottomNav = document.querySelector('.bottom-nav');
const API_BASE_URL = 'http://localhost:3000/api';

const renderLoginScreen = () => { /* ... full login screen code ... */ };
const renderRegisterScreen = () => { /* ... full register screen code ... */ };
const handleLogin = async (event) => { /* ... full login handler code ... */ };
const handleRegister = async (event) => { /* ... full register handler code ... */ };
const renderHomeScreen = async () => { /* ... full home screen renderer code ... */ };
const renderProductsPage = async () => { /* ... full products page code ... */ };
const renderPromotionsPage = async () => { /* ... full promotions page code ... */ };

const router = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        renderLoginScreen();
        return;
    }
    
    // Show the navigation bar now that we are logged in
    bottomNav.style.display = 'flex';
    
    const hash = window.location.hash || '#home';

    // Update the 'active' class on the correct icon
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });

    // Render the correct page based on the hash
    switch (hash) {
        case '#products':
            renderProductsPage();
            break;
        case '#promotion':
            renderPromotionsPage();
            break;
        case '#me':
            appContent.innerHTML = `<div class="page-container"><h1>Me Page</h1></div>`;
            break;
        case '#home':
        default:
            renderHomeScreen();
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
