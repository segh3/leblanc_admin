// -------------------------
// ADMIN USUARIOS - CON LOCALSTORAGE
// -------------------------

// Obtener usuarios de localStorage o usar arreglo inicial
let users = JSON.parse(localStorage.getItem('users')) || [
    { run: '19011022K', name: 'Sebastián', apellidos: 'Gutiérrez', email: 'sebastian@duoc.cl', direccion: 'Calle Falsa 123', region: 'Región Metropolitana', comuna: 'Santiago', password: '1234', role: 'Administrador' },
    { run: '12345678K', name: 'Juan', apellidos: 'Pérez', email: 'juan@gmail.com', direccion: 'Av. Libertad 456', region: 'Valparaíso', comuna: 'Viña del Mar', password: '1234', role: 'Vendedor' },
];

// Regiones y comunas
const regiones = {
    'Región Metropolitana': ['Santiago', 'Puente Alto', 'Maipú'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué'],
};

// Referencias DOM
const userTableBody = document.querySelector('#users-table tbody');
const userForm = document.getElementById('admin-user-form');
const modalTitle = document.getElementById('modalTitle');
const runInput = document.getElementById('admin-run');
const nameInput = document.getElementById('admin-name');
const apellidosInput = document.getElementById('admin-apellidos');
const emailInput = document.getElementById('admin-email');
const regionSelect = document.getElementById('admin-region');
const comunaSelect = document.getElementById('admin-comuna');
const direccionInput = document.getElementById('admin-direccion');
const passwordInput = document.getElementById('admin-password');
const confirmPasswordInput = document.getElementById('admin-confirm-password');

// Crear select de roles
const roleSelect = document.createElement('select');
roleSelect.classList.add('form-select', 'mt-2');
roleSelect.id = 'admin-role';
['Administrador','Vendedor','Cliente'].forEach(r => {
    const option = document.createElement('option');
    option.value = r;
    option.textContent = r;
    roleSelect.appendChild(option);
});
document.getElementById('userModal').querySelector('.modal-body').appendChild(roleSelect);

// Cargar regiones en select
for (const region in regiones) {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
}

// Actualizar comunas al cambiar región
regionSelect.addEventListener('change', () => {
    comunaSelect.innerHTML = '';
    const selected = regionSelect.value;
    if (selected) {
        regiones[selected].forEach(c => {
            const option = document.createElement('option');
            option.value = c;
            option.textContent = c;
            comunaSelect.appendChild(option);
        });
        comunaSelect.disabled = false;
    } else {
        comunaSelect.disabled = true;
    }
});

// Renderizar usuarios
function renderUsers() {
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.run}</td>
            <td>${user.name}</td>
            <td>${user.apellidos}</td>
            <td>${user.email}</td>
            <td>${user.region}</td>
            <td>${user.comuna}</td>
            <td>${user.direccion}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-btn">Editar</button>
                <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
            </td>
        `;
        // Editar
        tr.querySelector('.edit-btn').addEventListener('click', () => editUser(index));
        // Eliminar
        tr.querySelector('.delete-btn').addEventListener('click', () => {
            if(confirm('¿Deseas eliminar este usuario?')) {
                users.splice(index,1);
                saveUsers();
                renderUsers();
            }
        });
        userTableBody.appendChild(tr);
    });
}

// Guardar usuarios en localStorage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Editar usuario
let editIndex = null;
function editUser(index) {
    const user = users[index];
    editIndex = index;
    modalTitle.textContent = 'Editar Usuario';
    runInput.value = user.run;
    nameInput.value = user.name;
    apellidosInput.value = user.apellidos;
    emailInput.value = user.email;
    regionSelect.value = user.region;
    regionSelect.dispatchEvent(new Event('change'));
    comunaSelect.value = user.comuna;
    direccionInput.value = user.direccion;
    roleSelect.value = user.role;
    passwordInput.value = user.password || '';
    confirmPasswordInput.value = user.password || '';
    new bootstrap.Modal(document.getElementById('userModal')).show();
}

// Agregar o actualizar usuario
userForm.addEventListener('submit', e => {
    e.preventDefault();
    if(passwordInput.value !== confirmPasswordInput.value){
        alert('Las contraseñas no coinciden');
        return;
    }

    const newUser = {
        run: runInput.value.trim(),
        name: nameInput.value.trim(),
        apellidos: apellidosInput.value.trim(),
        email: emailInput.value.trim(),
        region: regionSelect.value,
        comuna: comunaSelect.value,
        direccion: direccionInput.value.trim(),
        role: roleSelect.value,
        password: passwordInput.value
    };

    if(editIndex !== null) {
        users[editIndex] = newUser;
        editIndex = null;
    } else {
        users.push(newUser);
    }

    saveUsers();
    userForm.reset();
    comunaSelect.disabled = true;
    modalTitle.textContent = 'Agregar Usuario';
    bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
    renderUsers();
});

// Inicializar
renderUsers();
