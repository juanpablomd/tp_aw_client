import { newUser } from "../../../api/user.api.js";

document.addEventListener('DOMContentLoaded', () =>{
    const registerButton = document.getElementById('register-form');
    const backButton = document.getElementById('back-button');


    registerButton.addEventListener('submit', async (event) => {
        event.preventDefault();
        let firstName = document.getElementById('nombre').value;
        let lastName = document.getElementById('apellido').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;


        const data = {
            firstName,
            lastName,
            email,
            password: password
        };

        const result = await newUser(data)
        
        if(result){
            document.getElementById('nombre').value = "";
            document.getElementById('apellido').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('success-message').classList.remove('hidden');
        }
        else{
            document.getElementById('error-message').classList.remove('hidden');
        }
    })
    backButton.addEventListener('click', () => {
        window.location.href = '../sesion/validacion.html';
    });
});

