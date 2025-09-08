// arreglo de productos
const products = [
    { id: 1, name: 'Café LeBlanc Original', price: 2500, description: 'El blend especial de la casa, preparado con granos de café de tueste medio.', image: 'imagenes/imagen1.png' },
    { id: 2, name: 'Curry LeBlanc Original', price: 6000, description: 'El famoso curry casero con la receta secreta, servido con arroz japonés.', image: 'imagenes/imagen2.jpg' },
    { id: 3, name: 'Cheesecake Persona', price: 4500, description: 'Cheesecake de estilo japonés con base de galleta y topping de frutos rojos.', image: 'imagenes/imagen3.jpg' },
    { id: 4, name: 'Katsu Sando', price: 5000, description: 'Sándwich japonés con chuleta de cerdo empanizada, col rallada y salsa tonkatsu.', image: 'imagenes/imagen4.jpg' },
    { id: 5, name: 'Desayuno Japonés', price: 4000, description: 'Set de desayuno tradicional con arroz, huevo, nori y sopa miso.', image: 'imagenes/imagen5.png' },
    { id: 6, name: '"Joker\'s Wild" Cocktail', price: 3500, description: 'Cóctel sin alcohol con jugo de granada, ginger ale y un toque de lima.', image: 'imagenes/imagen6.png' }
];

// función para renderizar los productos en la tabla
function renderProducts() {
    const tableBody = document.querySelector('#products-table tbody');
    tableBody.innerHTML = '';

    products.forEach(product => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>$${product.price.toLocaleString()}</td>
            <td><img src="${product.image}" alt="${product.name}" width="80"></td>
            <td>
                <button class="btn btn-info btn-sm" onclick="viewProduct(${product.id})">Ver Detalle</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

// función para ver detalle de producto
function viewProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const modalBody = document.querySelector('#productDetailModal .modal-body');
    modalBody.innerHTML = `
        <div class="text-center">
            <img src="${product.image}" alt="${product.name}" class="img-fluid mb-3" style="max-height: 300px;">
            <h5>${product.name}</h5>
            <p>${product.description}</p>
            <p><strong>Precio:</strong> $${product.price.toLocaleString()}</p>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
    modal.show();
}

// ejecutar render al cargar la página
document.addEventListener('DOMContentLoaded', renderProducts);
