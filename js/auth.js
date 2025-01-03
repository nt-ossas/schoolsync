// filepath: /c:/Users/utente/Desktop/GitHub/schoolsync/frontend/js/auth.js
async function saveUserData(data) {
    const token = localStorage.getItem('token');
    if (!token) return;
    await fetch('/api/auth/save-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify({ data })
    });
}

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.text();
    alert(data);
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
    } else {
        alert('Login failed');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const res = await fetch('/api/auth/me', {
            headers: { 'x-auth-token': token }
        });
        const user = await res.json();
        document.getElementById('user-data').innerText = `Hello, ${user.username}`;
        // Load user data
        if (user.data) {
            // Apply user data to your application
            console.log('User data loaded:', user.data);
            applyUserData(user.data);
        }
    } else {
        document.getElementById('user-data').innerText = 'Please log in';
    }
});

function applyUserData(data) {
    // Apply the user data to your application
    // For example, if you have grades and averages:
    if (data.grades) {
        // Load grades into your application
        console.log('Grades loaded:', data.grades);
    }
    if (data.averages) {
        // Load averages into your application
        console.log('Averages loaded:', data.averages);
    }
}

// Example: Save grades and averages when they are updated
function updateGradesAndAverages(grades, averages) {
    const data = { grades, averages };
    saveUserData(data);
}