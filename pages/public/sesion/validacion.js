import { validateUser } from "../../../api/user.api.js";

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const result = await validateUser(email, password);
    
        // Guarda los datos en sessionStorage
        sessionStorage.setItem('name', (result.decode.firstName) + (result.decode.lastName));
        sessionStorage.setItem('email', result.decode.email);
        sessionStorage.setItem('loginUrl', window.location.href);
        sessionStorage.setItem('token', result.token);

        // Redirige al usuario a la página privada
        window.location.href = '/pages/private/home/index.html';
    } catch (error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = error.message || 'Error en el servidor. Intente nuevamente más tarde.';
    }
});


const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', () => {
    window.location.href = '../register/register.html';
});