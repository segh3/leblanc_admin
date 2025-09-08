// Login - script.js

// Referencias DOM
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    // Obtener usuarios desde localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);

    if(user){
        // Guardar sesión en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Redirigir según rol
        if(user.role === 'Administrador'){
            window.location.href = 'index_admin.html';
        } else if(user.role === 'Vendedor'){
            window.location.href = 'vendedor_productos.html';
        } else {
            // Cliente u otros
            window.location.href = 'index.html';
        }
    } else {
        alert('Correo o contraseña incorrectos');
    }
});
