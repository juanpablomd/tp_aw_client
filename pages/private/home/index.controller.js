
import { card } from "../../../components/indexComponents/card.js"
import { AllProducts } from "../../../api/products.api.js";
import { addToCart } from "../../../functions/addLocalStorage.js"
import { allCategory } from "../../../api/category.api.js";
import { categoriesCart } from "../../../components/indexComponents/categories.js";
import { ProductsByCategory } from "../../../api/products.api.js";


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
            alert("Producto Agregado")
            addToCart(id, name, price, image, quantity,'cart');
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
