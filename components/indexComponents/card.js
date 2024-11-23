
export const card = (id, name, description, price, image, available, stock) => {
    const stockText = available ? 'Sí' : 'No';
    const colorStock = stock != 0 ? 'text-green-600' : 'text-red-600';
    const botonInhabilitado = stock != 0 ? '' : 'disabled bg-gray-400 cursor-not-allowed';

    return `
    <div id="product-${id}" class="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <img src="${image}" alt="${name}" class="h-48 w-full object-cover">
        <div class="p-4">
            <h3 class="product-name text-xl font-semibold text-gray-800">${name}</h3>
            <p class="text-gray-600 mt-2">${description}</p>
            <p class="product-price text-gray-900 font-bold mt-4">$${price}</p>
            <p class="${colorStock} mt-1">Stock: ${stockText}</p>
            <div class="flex items-center mt-4">
                <button data-id="${id}" class="decrement-btn bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-colors">-</button>
                <input type="text" id="quantity-${id}" value="1" class="w-12 text-center mx-3 border border-gray-300 rounded-full text-lg" readonly>
                <button data-id="${id}" class="increment-btn bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors">+</button>
            </div>
            <button data-id="${id}" class="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors add-to-cart-btn ${botonInhabilitado}" ${botonInhabilitado}>
                Agregar al Carrito
            </button>
        </div>
    </div>
    `;
};
