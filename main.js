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
const renderMePage = async () => { /* ... full me page code ... */ };

const renderTaskPage = async () => {
    appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Loading Tasks...</p>';
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!response.ok) throw new Error('Failed to load tasks.');
        const data = await response.json();
        
        const pageHTML = `
            <div class="page-container task-page">
                <div class="page-header"><h2>Daily Tasks</h2></div>
                <div class="task-progress-card">
                    <h4>Tasks for Today</h4>
                    <p id="task-counter">${data.tasksCompleted} / ${data.tasksRequired}</p>
                    <div class="progress-bar-container">
                        <div id="progress-bar-fill" style="width: ${(data.tasksCompleted / data.tasksRequired) * 100}%;"></div>
                    </div>
                </div>
                <div class="task-action-card">
                    <button id="completeTaskBtn" ${data.tasksCompleted >= data.tasksRequired ? 'disabled' : ''}>
                        ${data.tasksCompleted >= data.tasksRequired ? 'All Tasks Completed' : 'Complete a Task'}
                    </button>
                </div>
                <div class="earnings-summary-grid">
                    <div class="summary-card"><h4>Today's Earning</h4><p>₦ 0.00</p></div>
                    <div class="summary-card"><h4>Yesterday's Earning</h4><p>₦ 0.00</p></div>
                    <div class="summary-card"><h4>Total Earnings</h4><p>₦ 0.00</p></div>
                </div>
            </div>
        `;
        appContent.innerHTML = pageHTML;

        // Add event listener for the complete task button
        document.getElementById('completeTaskBtn').addEventListener('click', async () => {
            const btn = document.getElementById('completeTaskBtn');
            btn.textContent = 'Processing...';
            btn.disabled = true;
            try {
                const completeResponse = await fetch(`${API_BASE_URL}/tasks/complete`, {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const result = await completeResponse.json();
                if (!completeResponse.ok) {
                    alert('Error: ' + result.message);
                    renderTaskPage(); // Re-render to show correct state
                    return;
                }
                // Update the UI with the new progress
                document.getElementById('task-counter').textContent = `${result.tasksCompleted} / ${result.tasksRequired}`;
                const progressFill = document.getElementById('progress-bar-fill');
                progressFill.style.width = `${(result.tasksCompleted / result.tasksRequired) * 100}%`;
                if (result.tasksCompleted >= result.tasksRequired) {
                    btn.textContent = 'All Tasks Completed';
                } else {
                    btn.textContent = 'Complete a Task';
                    btn.disabled = false;
                }
            } catch (error) {
                alert('An error occurred while completing the task.');
                renderTaskPage();
            }
        });

    } catch (error) {
        appContent.innerHTML = '<p style="text-align: center; margin-top: 50px;">Could not load tasks.</p>';
    }
};

const router = () => {
    const token = localStorage.getItem('token');
    if (!token) { renderLoginScreen(); return; }
    bottomNav.style.display = 'flex';
    const hash = window.location.hash || '#home';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) { link.classList.add('active'); }
    });
    switch (hash) {
        case '#products': renderProductsPage(); break;
        case '#promotion': renderPromotionsPage(); break;
        case '#me': renderMePage(); break;
        case '#task': renderTaskPage(); break;
        case '#home': default: renderHomeScreen();
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
