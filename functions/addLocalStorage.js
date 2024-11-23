
export const addToCart = (id, name, price, image, quantity, key) => {
    const cart = JSON.parse(localStorage.getItem(key)) || {}; // Obtener el carrito del localStorage o crear uno vacío

    // Si el producto ya existe en el carrito, sumamos la cantidad
    if (cart[id]) {
        cart[id].quantity += quantity;
    } else {
        cart[id] = { id, name, price, image, quantity };
    }
    localStorage.setItem(key, JSON.stringify(cart));
};
