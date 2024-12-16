import { API } from "./api.js";


// Obtener todos los comentarios
export const getComments = async () => {
    const response = await fetch(`${API}/comentarios/allcomentarios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Error al obtener los comentarios');
    }
    const data = await response.json();
    return data;
};


// Enviar un nuevo comentario
export const postComment = async (commentData) => {
    const response = await fetch(`${API}/comentarios/addcomentario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
    });

    if (!response.ok) {
        throw new Error('Error al enviar el comentario');
    }

    const data = await response.json()
    return data;
};
