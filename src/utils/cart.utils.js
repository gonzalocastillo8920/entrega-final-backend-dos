// Función para generar un código único para el ticket
export function ramdomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 10;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    const timestamp = Date.now().toString(36);
    return code + '-' + timestamp;
};

// Función para calcular el total de la compra
export function totalAmount(products) {
    let total = 0;

    products.forEach(item => {
        total += item.product.price * item.quantity;
    });

    return total;
};