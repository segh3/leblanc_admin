// Arreglo inicial de productos
const products = [
    { 
        id: 1, name: 'Café LeBlanc Original', 
        price: 2500, 
        description: 'El blend especial de la casa, preparado con granos de café de tueste medio.', 
        stock: 20,
        stockCritico: 5,
        category: 'Café',
        image: 'imagenes/imagen1.png' 
    },
    { 
        id: 2, 
        name: 'Curry LeBlanc Original', 
        price: 6000, 
        description: 'El famoso curry casero con la receta secreta, servido con arroz japonés.', 
        stock: 15,
        stockCritico: 3,
        category: 'Comida',
        image: 'imagenes/imagen2.jpg' 
    },
    { 
        id: 3, 
        name: 'Cheesecake Persona', 
        price: 4500, 
        description: 'Cheesecake de estilo japonés con base de galleta y topping de frutos rojos.', 
        stock: 12,
        stockCritico: 2,
        category: 'Postre',
        image: 'imagenes/imagen3.jpg' 
    },
    { 
        id: 4, 
        name: 'Katsu Sando', 
        price: 5000, 
        description: 'Sándwich japonés con chuleta de cerdo empanizada, col rallada y salsa tonkatsu.', 
        stock: 18,
        stockCritico: 4,
        category: 'Comida',
        image: 'imagenes/imagen4.jpg' 
    },
    { 
        id: 5, 
        name: 'Desayuno Japonés', 
        price: 4000, 
        description: 'Set de desayuno tradicional con arroz, huevo, nori y sopa miso.', 
        stock: 10,
        stockCritico: 2,
        category: 'Desayuno',
        image: 'imagenes/imagen5.png' 
    },
    { 
        id: 6, 
        name: '"Joker\'s Wild" Cocktail', 
        price: 3500, 
        description: 'Cóctel sin alcohol con jugo de granada, ginger ale y un toque de lima.', 
        stock: 25,
        stockCritico: 5,
        category: 'Bebida',
        image: 'imagenes/imagen6.png' 
    }
];


// Referencias DOM
const productTableBody = document.querySelector('#products-table tbody');
const productForm = document.getElementById('admin-product-form');
const modalProductTitle = document.getElementById('modalProductTitle');

// Renderizar productos
function renderProducts() {
    productTableBody.innerHTML = '';
    products.forEach((p, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.description}</td>
            <td>${p.price}</td>
            <td>${p.stock}</td>
            <td>${p.stockCritico}</td>
            <td>${p.category}</td>
            <td><img src="${p.image}" width="60"/></td>
            <td>
                <button class="btn btn-sm btn-warning edit-btn">Editar</button>
                <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
            </td>
        `;
        tr.querySelector('.edit-btn').addEventListener('click', () => editProduct(index));
        tr.querySelector('.delete-btn').addEventListener('click', () => {
            if(confirm('¿Deseas eliminar este producto?')) {
                products.splice(index,1);
                renderProducts();
            }
        });
        productTableBody.appendChild(tr);
    });
}

// Editar producto
let editProductIndex = null;
function editProduct(index) {
    const p = products[index];
    editProductIndex = index;
    modalProductTitle.textContent = 'Editar Producto';
    document.getElementById('product-name').value = p.name;
    document.getElementById('product-description').value = p.description;
    document.getElementById('product-price').value = p.price;
    document.getElementById('product-stock').value = p.stock;
    document.getElementById('product-stockCritico').value = p.stockCritico;
    document.getElementById('product-category').value = p.category;
    document.getElementById('product-image').value = p.image;
    new bootstrap.Modal(document.getElementById('productModal')).show();
}

// Agregar o actualizar producto
productForm.addEventListener('submit', e => {
    e.preventDefault();
    const newProduct = {
        id: editProductIndex !== null ? products[editProductIndex].id : (products.length ? products[products.length-1].id + 1 : 1),
        name: document.getElementById('product-name').value.trim(),
        description: document.getElementById('product-description').value.trim(),
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        stockCritico: parseInt(document.getElementById('product-stockCritico').value),
        category: document.getElementById('product-category').value,
        image: document.getElementById('product-image').value.trim()
    };
    if(editProductIndex !== null){
        products[editProductIndex] = newProduct;
        editProductIndex = null;
    } else {
        products.push(newProduct);
    }
    productForm.reset();
    modalProductTitle.textContent = 'Agregar Producto';
    bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    renderProducts();
});

// Inicializar
renderProducts();
