import { API } from "./api.js";

export const validateUser = async (email, password) => {
    try {
        const response = await fetch(`${API}/user/validation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Error en la autenticación');
        }

        return result;
    } catch (error) {
        throw error;
    }
}




export const newUser = async (datos) => {
    try {
        const response = await fetch(`${API}/user/newUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error de autenticación');
        }
        return result;
    } catch (error) {
        throw error;
    }
}
