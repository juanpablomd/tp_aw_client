export const showNotification = (id, message) => {
    const productDiv = document.getElementById(`product-${id}`);
    let notification = productDiv.querySelector('.notification');

    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification bg-green-300 text-black border border-green-600 px-4 py-2 rounded mt-2 flex items-center animate__animated animate__fadeIn';
        productDiv.appendChild(notification);
    }

    notification.innerHTML = `
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 18.5a2.5 2.5 0 11-5 0 2.5 2.5 0 115 0z"></path></svg>
        ${message}
    `;

    setTimeout(() => {
        notification.classList.add('animate__fadeOut');
        setTimeout(() => {
            productDiv.removeChild(notification);
        }, 500);
    }, 500);
};