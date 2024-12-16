
import { card } from "../../../components/indexComponents/card.js"
import { AllProducts } from "../../../api/products.api.js";
import { addToCart } from "../../../functions/addLocalStorage.js"
import { allCategory } from "../../../api/category.api.js";
import { categoriesCart } from "../../../components/indexComponents/categories.js";
import { ProductsByCategory } from "../../../api/products.api.js";
import { showNotification } from "../../../functions/notifProd.js";

// Importar funciones necesarias de la API
import { getComments, postComment } from "../../../api/comments.api.js"; 

const btnAllProducts = document.getElementById('all-products-btn');
const btnProductsByCategory = document.getElementById('category-select');


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const categories = await allCategory();
        console.log('Categorías:', categories);  // Mostramos las categorías en la consola

        // Iterar sobre las categorías y añadirlas al combobox
        categories.forEach(cat => {
            const catCarrito = categoriesCart(cat._id, cat.name)
            btnProductsByCategory.insertAdjacentHTML('beforeend', catCarrito);
        });
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
    }
});


// Event listener para mostrar todos los productos
btnAllProducts.addEventListener('click', async () => {
    try {
        const productos = await AllProducts();
        await renderProduct(productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
});


const renderProduct = async (productos) => {
    const prodContainer = document.getElementById('grid');
    const productosHTML = productos.map(producto => {
        const listProd = card(producto.id, producto.name, producto.description, producto.price, producto.image, producto.available, producto.stock, producto.category);
        return listProd;
    }).join('');
    prodContainer.innerHTML = productosHTML;
    attachAddToCartListeners();
    attachIncrementDecrementListeners();
};


// Event listener para mostrar productos por categoría
btnProductsByCategory.addEventListener('change', async () => {
    const index = btnProductsByCategory.value
    console.log('Categoría seleccionada:', index); // Verifica el valor en la consola
    const productos = await ProductsByCategory(index);

    if(productos.status == false){
        await renderProduct([]); 
    }
    else{
        await renderProduct(productos);   
    }
});




const attachAddToCartListeners = () => {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = button.dataset.id;
            const productDiv = document.getElementById(`product-${id}`);
            const quantity = parseInt(document.getElementById(`quantity-${id}`).value, 10);
            const name = productDiv.querySelector('.product-name').textContent;
            const price = productDiv.querySelector('.product-price').textContent.replace('$', '');
            const image = productDiv.querySelector('img').src;
            addToCart(id, name, price, image, quantity,'cart');
            showNotification(id, "Producto agregado");
        });
    });
};


// Función para adjuntar event listeners a los botones de incremento y decremento
const attachIncrementDecrementListeners = () => {
    document.querySelectorAll('.increment-btn').forEach(btnIncrement => {
        btnIncrement.addEventListener('click', () => {
            const id = btnIncrement.dataset.id;
            const input = document.getElementById(`quantity-${id}`);
            const productDiv = document.getElementById(`product-${id}`);
            const name = productDiv.querySelector('.product-name').textContent;
            const price = productDiv.querySelector('.product-price').textContent.replace('$', '');
            const image = productDiv.querySelector('img').src;
            let value = parseInt(input.value, 10);
            value = isNaN(value) ? 0 : value;
            value++;
            input.value = value;
            
        });
    });

    document.querySelectorAll('.decrement-btn').forEach(btnDecrement => {
        btnDecrement.addEventListener('click', () => {
            const id = btnDecrement.dataset.id;
            const input = document.getElementById(`quantity-${id}`);
            const productDiv = document.getElementById(`product-${id}`);
            const name = productDiv.querySelector('.product-name').textContent;
            const price = productDiv.querySelector('.product-price').textContent.replace('$', '');
            const image = productDiv.querySelector('img').src;
            let value = parseInt(input.value, 10);
            value = isNaN(value) ? 0 : value;
            value = value > 1 ? value - 1 : 1;
            input.value = value;
        });
    });
};




//AGREGADO
// Buscar productos al escribir en el buscador
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query.length > 0) {
        // Filtra los productos según el texto escrito en el buscador
        try {
            const productos = await AllProducts();
            const filteredProducts = productos.filter(producto => 
                producto.name.toLowerCase().includes(query) || 
                producto.description.toLowerCase().includes(query)
            );
            renderProduct(filteredProducts);  // Actualiza los productos filtrados
        } catch (error) {
            console.error('Error al filtrar los productos:', error);
        }
    } else {
        // Si no hay texto, muestra todos los productos
        try {
            const productos = await AllProducts();
            renderProduct(productos);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }
});


window.addEventListener('load', () => {
    const notification = document.getElementById('notification');

    // Mostrar el banner
    notification.classList.remove('hidden');

    // Ocultar el banner después de 2 segundos
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 2000); // 2000ms = 2 segundos
});





// Referencias a elementos HTML
const commentInput = document.getElementById('comment-input');
const submitCommentBtn = document.getElementById('submit-comment');
const commentsList = document.getElementById('comments-list');


// Cargar comentarios al iniciar la página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const comments = await getComments(); // Fetch para obtener comentarios
        renderComments(comments);
    } catch (error) {
        console.error('Error al cargar comentarios:', error.message);
        alert('Hubo un error al cargar los comentarios. Por favor, intenta de nuevo más tarde.');
    }
});

// Renderizar los comentarios en el DOM
const renderComments = (comments) => {
    commentsList.innerHTML = comments.map(comment => `
        <div class="p-4 border rounded bg-gray-200 text-gray-800">
            <p class="font-semibold">${comment.userId.firstName} ${comment.userId.lastName}:</p>
            <p>${comment.text}</p>
        </div>
    `).join('');
};

// Event listener para agregar un nuevo comentario
submitCommentBtn.addEventListener('click', async () => {
    const commentText = commentInput.value.trim();

    if (!commentText) {
        alert('Por favor, escribe un comentario.');
        return;
    }
    
    console.log('userId:', userId); // Verifica que userId esté correctamente definido

    try {
        // Enviar comentario con datos adicionales necesarios
        const newComment = await postComment({ 
            text: commentText, 
            userId: { id: userId },  // Asegúrate de que el userId esté correctamente asignado
            date: new Date().toISOString() // Marca de tiempo opcional
        });
        console.log('Datos enviados al servidor:', { text: commentText, userId:{ id: userId }, date: new Date().toISOString() });

        commentInput.value = ''; // Limpiar el campo de texto
        const comments = await getComments(); // Volver a cargar los comentarios
        renderComments(comments);
    } catch (error) {
        console.error('Error al agregar el comentario:', error.message);
        alert('No se pudo agregar el comentario. Por favor, intenta de nuevo.');
    }
});



