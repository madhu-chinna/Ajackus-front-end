// Mock employee data
let employees = [
  { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', department: 'HR', role: 'Manager' },
  { id: 2, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', department: 'IT', role: 'Developer' },
  { id: 3, firstName: 'Charlie', lastName: 'Lee', email: 'charlie@example.com', department: 'Finance', role: 'Analyst' },
];

let filteredEmployees = [...employees];
let currentPage = 1;
let pageSize = 10;
let sortKey = '';

// DOM Elements
const employeeList = document.querySelector('.employee-list');
const pagination = document.getElementById('pagination');
const sortSelect = document.getElementById('sortSelect');
const showSelect = document.getElementById('showSelect');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
const filterSidebar = document.getElementById('filterSidebar');
const filterFirstName = document.getElementById('filterFirstName');
const filterDepartment = document.getElementById('filterDepartment');
const filterRole = document.getElementById('filterRole');
const applyFilterBtn = document.getElementById('applyFilterBtn');
const resetFilterBtn = document.getElementById('resetFilterBtn');

// Render employee cards
function renderEmployees() {
  employeeList.innerHTML = '';
  let paginated = getPaginatedEmployees();
  if (paginated.length === 0) {
    const msg = document.createElement('div');
    msg.style.padding = '40px';
    msg.style.fontSize = '1.2rem';
    msg.style.color = '#888';
    msg.style.width = '100%';
    msg.style.textAlign = 'center';
    msg.textContent = 'No employees found.';
    employeeList.appendChild(msg);
    renderPagination();
    return;
  }
  paginated.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong><br>
      <b>Email:</b> ${emp.email}<br>
      <b>Department:</b> ${emp.department}<br>
      <b>Role:</b> ${emp.role}<br>
      <div class="card-actions">
        <button class="edit-btn" data-id="${emp.id}">Edit</button>
        <button class="delete-btn" data-id="${emp.id}">Delete</button>
      </div>
    `;
    employeeList.appendChild(card);
  });
  renderPagination();
}

// Pagination logic
function getPaginatedEmployees() {
  const start = (currentPage - 1) * pageSize;
  return filteredEmployees.slice(start, start + pageSize);
}

function renderPagination() {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === currentPage ? 'active' : '';
    btn.onclick = () => {
      currentPage = i;
      renderEmployees();
    };
    pagination.appendChild(btn);
  }
}

// Sorting
sortSelect.addEventListener('change', () => {
  sortKey = sortSelect.value;
  if (sortKey) {
    filteredEmployees.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });
  }
  renderEmployees();
});

// Show per page
showSelect.addEventListener('change', () => {
  pageSize = parseInt(showSelect.value, 10);
  currentPage = 1;
  renderEmployees();
});

// Search
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  filteredEmployees = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(query) ||
    emp.lastName.toLowerCase().includes(query) ||
    emp.email.toLowerCase().includes(query)
  );
  currentPage = 1;
  renderEmployees();
});

// Show all employees when search input is cleared
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim() === '') {
    filteredEmployees = [...employees];
    currentPage = 1;
    renderEmployees();
  }
});

// Filter
applyFilterBtn.addEventListener('click', () => {
  const fname = filterFirstName.value.toLowerCase();
  const dept = filterDepartment.value.toLowerCase();
  const role = filterRole.value.toLowerCase();
  filteredEmployees = employees.filter(emp =>
    (fname === '' || emp.firstName.toLowerCase().includes(fname)) &&
    (dept === '' || emp.department.toLowerCase().includes(dept)) &&
    (role === '' || emp.role.toLowerCase().includes(role))
  );
  currentPage = 1;
  renderEmployees();
});

resetFilterBtn.addEventListener('click', () => {
  filterFirstName.value = '';
  filterDepartment.value = '';
  filterRole.value = '';
  filteredEmployees = [...employees];
  currentPage = 1;
  renderEmployees();
});

// Add/Edit Employee Modal
function showEmployeeModal(editId = null) {
  let emp = editId ? employees.find(e => e.id === editId) : {};
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${editId ? 'Edit' : 'Add'} Employee</h2>
      <form id="employeeForm">
        <label>First name
          <input type="text" name="firstName" value="${emp.firstName || ''}" required>
        </label>
        <label>Last name
          <input type="text" name="lastName" value="${emp.lastName || ''}" required>
        </label>
        <label>Email
          <input type="email" name="email" value="${emp.email || ''}" required>
        </label>
        <label>Department
          <input type="text" name="department" value="${emp.department || ''}" required>
        </label>
        <label>Role
          <input type="text" name="role" value="${emp.role || ''}" required>
        </label>
        <div class="modal-actions">
          <button type="button" class="cancel-btn">Cancel</button>
          <button type="submit" class="add-btn">${editId ? 'Save' : 'Add'}</button>
        </div>
        <div class="form-error" style="color:#d00;margin-top:8px;"></div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  const form = modal.querySelector('#employeeForm');
  const errorDiv = form.querySelector('.form-error');
  form.onsubmit = function(e) {
    e.preventDefault();
    // Validation
    const data = Object.fromEntries(new FormData(form));
    if (!validateEmail(data.email)) {
      errorDiv.textContent = 'Invalid email format.';
      return;
    }
    if (!data.firstName || !data.lastName || !data.department || !data.role) {
      errorDiv.textContent = 'All fields are required.';
      return;
    }
    if (editId) {
      // Edit
      const idx = employees.findIndex(e => e.id === editId);
      employees[idx] = { ...employees[idx], ...data };
    } else {
      // Add
      const newId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      employees.push({ id: newId, ...data });
    }
    filteredEmployees = [...employees];
    renderEmployees();
    document.body.removeChild(modal);
  };
  modal.querySelector('.cancel-btn').onclick = () => document.body.removeChild(modal);
}

function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

// Add Employee
addEmployeeBtn.addEventListener('click', () => showEmployeeModal());

// Edit/Delete Employee
employeeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const id = parseInt(e.target.getAttribute('data-id'), 10);
    showEmployeeModal(id);
  } else if (e.target.classList.contains('delete-btn')) {
    const id = parseInt(e.target.getAttribute('data-id'), 10);
    if (confirm('Are you sure you want to delete this employee?')) {
      employees = employees.filter(emp => emp.id !== id);
      filteredEmployees = [...employees];
      renderEmployees();
    }
  }
});

// Initial render
renderEmployees(); 