const API_URL = 'http://localhost:5000/api';
let allStudents = [];

// Helper: Show Alert Message
function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('alert-box');
    if (!alertBox) return;
    alertBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    // Auto remove after 3 seconds
    setTimeout(() => {
        alertBox.innerHTML = '';
    }, 3000);
}

// 1. Fetch Students (Reads data)
async function fetchStudents() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const data = await response.json();
        
        if (data.success) {
            allStudents = data.data;
            renderTable(allStudents);
            
            // If on view page, update record count tab
            const countBadge = document.getElementById('record-count');
            if(countBadge) {
                countBadge.innerText = data.count;
            }
        } else {
            console.error('Failed to fetch students:', data.message);
        }
    } catch (error) {
        console.error('Error connecting to backend:', error);
        showAlert('Could not connect to the database server.', 'danger');
    }
}

// Render Table on view.html
function renderTable(dataArray) {
    const tableBody = document.getElementById('table-body');
    const tableEl = document.getElementById('students-table');
    const loadingEl = document.getElementById('loading-table');
    const emptyState = document.getElementById('empty-state');
    
    if (!tableBody) return; // Not on view.html
    
    loadingEl.classList.add('d-none');
    
    if (dataArray.length === 0) {
        tableEl.classList.add('d-none');
        emptyState.classList.remove('d-none');
        return;
    }
    
    emptyState.classList.add('d-none');
    tableEl.classList.remove('d-none');
    tableBody.innerHTML = '';
    
    dataArray.forEach(student => {
        tableBody.innerHTML += `
            <tr>
                <td class="fw-bold text-primary">${student.enrollmentNumber}</td>
                <td>${student.name}</td>
                <td><span class="badge bg-info text-dark">${student.branch}</span></td>
                <td>${student.year}</td>
                <td>${student.email}</td>
                <td>${student.phoneNumber}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary shadow-sm me-1" onclick="openUpdateModal('${student._id}')"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-sm btn-outline-danger shadow-sm" onclick="openDeleteModal('${student._id}')"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Fetch dashboard stats (if on index.html)
if(window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch(`${API_URL}/students`);
            const data = await response.json();
            const countEl = document.getElementById('total-students');
            if(countEl) {
                countEl.innerText = data.success ? data.count : "Err";
            }
        } catch(error) {
            const countEl = document.getElementById('total-students');
            if(countEl) countEl.innerText = "Offline";
        }
    });
}

// 2. Add New Student (Create data)
async function submitForm(event) {
    event.preventDefault(); // Prevent standard page reload
    
    const form = event.target;
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const submitBtn = document.getElementById('submit-btn');
    const spinner = document.getElementById('submit-spinner');
    submitBtn.disabled = true;
    spinner.classList.remove('d-none');

    const newStudent = {
        name: document.getElementById('name').value.trim(),
        enrollmentNumber: document.getElementById('enrollmentNumber').value.trim(),
        branch: document.getElementById('branch').value,
        year: document.getElementById('year').value,
        email: document.getElementById('email').value.trim(),
        phoneNumber: document.getElementById('phoneNumber').value.trim()
    };

    try {
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent)
        });
        const data = await response.json();

        if (data.success) {
            showAlert('Student added successfully!', 'success');
            form.reset();
            form.classList.remove('was-validated');
        } else {
            showAlert(data.message || 'Error adding student', 'danger');
        }
    } catch (error) {
        showAlert('Network Error. Is backend running?', 'danger');
    } finally {
        submitBtn.disabled = false;
        spinner.classList.add('d-none');
    }
}

// 3. Search Students Feature
function searchStudent() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allStudents.filter(student => 
        student.name.toLowerCase().includes(input) || 
        student.enrollmentNumber.toLowerCase().includes(input)
    );
    renderTable(filtered);
}

// 4. Update Student Feature
let updateModalInstance = null;
function openUpdateModal(id) {
    const student = allStudents.find(s => s._id === id);
    if(!student) return;

    document.getElementById('upd-id').value = student._id;
    document.getElementById('upd-name').value = student.name;
    document.getElementById('upd-enrollment').value = student.enrollmentNumber;
    document.getElementById('upd-branch').value = student.branch;
    document.getElementById('upd-year').value = student.year;
    document.getElementById('upd-email').value = student.email;
    document.getElementById('upd-phone').value = student.phoneNumber;

    // Show modal
    updateModalInstance = new bootstrap.Modal(document.getElementById('updateModal'));
    updateModalInstance.show();
}

async function submitUpdate(event) {
    event.preventDefault();
    const id = document.getElementById('upd-id').value;
    
    const updatedData = {
        name: document.getElementById('upd-name').value.trim(),
        branch: document.getElementById('upd-branch').value,
        year: document.getElementById('upd-year').value,
        email: document.getElementById('upd-email').value.trim(),
        phoneNumber: document.getElementById('upd-phone').value.trim()
    };

    const updateBtn = document.getElementById('update-btn');
    const spinner = document.getElementById('update-spinner');
    updateBtn.disabled = true;
    spinner.classList.remove('d-none');

    try {
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        const data = await response.json();

        if (data.success) {
            updateModalInstance.hide();
            showAlert('Student details updated!', 'success');
            fetchStudents(); // Refresh table
        } else {
            showAlert('Failed to update: ' + data.message, 'danger');
        }
    } catch (error) {
        showAlert('Network error', 'danger');
    } finally {
        updateBtn.disabled = false;
        spinner.classList.add('d-none');
    }
}

// 5. Delete Student Feature
let deleteModalInstance = null;
function openDeleteModal(id) {
    document.getElementById('del-id').value = id;
    deleteModalInstance = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModalInstance.show();
}

async function confirmDelete() {
    const id = document.getElementById('del-id').value;
    deleteModalInstance.hide();

    try {
        const response = await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
        const data = await response.json();

        if (data.success) {
            showAlert('Record deleted successfully.', 'success');
            fetchStudents(); // refresh
        } else {
            showAlert('Failed to delete.', 'danger');
        }
    } catch (error) {
        showAlert('Network error.', 'danger');
    }
}
