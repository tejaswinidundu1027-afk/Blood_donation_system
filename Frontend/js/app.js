const API = 'http://localhost:3000';

// ===== FLASH MESSAGE =====
function showFlash(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `flash-message ${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ===== LOGIN =====
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(result.user));
      showFlash('Login successful! Redirecting...');
      setTimeout(() => window.location.href = '/admin', 1000);
    } else {
      showFlash(result.error || 'Login failed', 'error');
    }
  } catch (err) {
    showFlash('Error connecting to server', 'error');
  }
});

// ===== REGISTER =====
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (data.password !== data.confirmPassword) {
    return showFlash('Passwords do not match', 'error');
  }
  try {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
      showFlash('Registration successful! Please login.');
      setTimeout(() => window.location.href = '/', 1000);
    } else {
      showFlash(result.error || 'Registration failed', 'error');
    }
  } catch (err) {
    showFlash('Error connecting to server', 'error');
  }
});

// ===== ADD DONOR =====
document.getElementById('addDonorForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  try {
    const res = await fetch(`${API}/donors/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
      showFlash('Donor added successfully!');
      setTimeout(() => window.location.href = '/admin-page', 1000);
    } else {
      showFlash(result.error || 'Error adding donor', 'error');
    }
  } catch (err) {
    showFlash('Error connecting to server', 'error');
  }
});

// ===== BLOOD REQUEST FORM =====
document.getElementById('requestForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  try {
    const res = await fetch(`${API}/requests/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
      showFlash('Blood request submitted successfully!');
      setTimeout(() => window.location.href = '/request', 1000);
    } else {
      showFlash(result.error || 'Error submitting request', 'error');
    }
  } catch (err) {
    showFlash('Error connecting to server', 'error');
  }
});

// ===== LOAD DONORS TABLE =====
async function loadDonors() {
  const tbody = document.getElementById('donorTableBody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API}/donors`);
    const donors = await res.json();
    if (donors.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" style="color:#999;">No donors found</td></tr>';
      return;
    }
    tbody.innerHTML = donors.map(d => `
      <tr>
        <td>${d.id}</td>
        <td>${d.name}</td>
        <td>${d.gender || '-'}</td>
        <td>${d.age || '-'}</td>
        <td><span class="blood-badge">${d.bloodGroup}</span></td>
        <td>${d.phone || '-'}</td>
        <td>${d.address || '-'}</td>
        <td class="actions">
          <button onclick="deleteDonor(${d.id})"
            class="btn btn-danger">🗑 Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="8" style="color:red;">Error loading donors</td></tr>';
  }
}

// ===== LOAD REQUESTS TABLE =====
async function loadRequests() {
  const tbody = document.getElementById('requestTableBody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API}/requests`);
    const requests = await res.json();
    if (requests.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" style="color:#999;">No requests found</td></tr>';
      return;
    }
    tbody.innerHTML = requests.map(r => `
      <tr>
        <td>${r.id}</td>
        <td>${r.requesterName}</td>
        <td>${r.phone || '-'}</td>
        <td><span class="blood-badge">${r.bloodGroup}</span></td>
        <td>${r.quantity}</td>
        <td>${r.date}</td>
        <td>${r.location || '-'}</td>
        <td>${r.reason || '-'}</td>
        <td class="actions">
          <button onclick="deleteRequest(${r.id})"
            class="btn btn-danger">🗑 Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="9" style="color:red;">Error loading requests</td></tr>';
  }
}

// ===== DELETE DONOR =====
async function deleteDonor(id) {
  if (!confirm('Are you sure you want to delete this donor?')) return;
  try {
    const res = await fetch(`${API}/donors/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showFlash('Donor deleted successfully!');
      loadDonors();
    } else {
      showFlash('Error deleting donor', 'error');
    }
  } catch (err) {
    showFlash('Error connecting to server', 'error');
  }
}

// ===== DELETE REQUEST =====
async function deleteRequest(id) {
  if (!confirm('Are you sure you want to delete this request?')) return;
  try {
    const res = await fetch(`${API}/requests/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showFlash('Request deleted successfully!');
      loadRequests();
    } else {
      showFlash('Error deleting request', 'error');
    }
  } catch (err) {
    showFlash('Error connecting to server', 'error');
  }
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem('user');
  showFlash('Logged out successfully!');
  setTimeout(() => window.location.href = '/login', 800);
}

// ===== LOAD STATS (admin page) =====
async function loadStats() {
  try {
    const donors = await fetch(`${API}/donors`).then(r => r.json());
    const requests = await fetch(`${API}/requests`).then(r => r.json());
    const donorEl = document.getElementById('totalDonors');
    const requestEl = document.getElementById('totalRequests');
    if (donorEl) donorEl.textContent = donors.length;
    if (requestEl) requestEl.textContent = requests.length;
  } catch (err) {
    console.error('Error loading stats');
  }
}

// ===== AUTO LOAD ON PAGE =====
window.addEventListener('DOMContentLoaded', () => {
  loadDonors();
  loadRequests();
  loadStats();
});