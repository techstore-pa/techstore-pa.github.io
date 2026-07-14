// Productos (para las pruebas)
const productos = [
  { id: 1, nombre: "HP Victus", precio: 799.99, imagen: "/imagenes/PS0009563_1_554x554.webp" },
  { id: 2, nombre: "HP Victus Infinity", precio: 999.99, imagen: "/imagenes/PS0017066_3_554x554.webp" },
  { id: 3, nombre: "Lenovo ThinkBook", precio: 1199.99, imagen: "/imagenes/PS0016649_3_554x554.webp" },
  { id: 4, nombre: "Laptop ASUS", precio: 699.99, imagen: "/imagenes/PS0017655_7_554x554.webp" },
  { id: 5, nombre: "Combo Teclado y Mouse", precio: 25.99, imagen: "/imagenes/MIGPS0015258_1_500x500.jpg" },
  { id: 6, nombre: "Mouse Inalambrico", precio: 6.99, imagen: "/imagenes/MIGPS0015231_1_554x554.webp" },
  { id: 7, nombre: "Impresora Epson", precio: 400.99, imagen: "/imagenes/PS0008896_0_554x554.webp" },
  { id: 8, nombre: "All-In-One Dell Inspiron", precio: 1200.99, imagen: "/imagenes/PS0014063_0_554x554.webp" },
  { id: 9, nombre: "Monitor Gaming 27 Pulgadas", precio: 105.99, imagen: "/imagenes/PS0012689_2_554x554.webp" },
  { id: 10, nombre: "Teclado Gaming - Star Wars", precio: 5.99, imagen: "/imagenes/PS0014165_0_500x500.webp" },
  { id: 11, nombre: "Impresora HP", precio: 155.99, imagen: "/imagenes/PS0006226_9_500x500.webp" },
  { id: 12, nombre: "Teclado Gaming - Star Wars Verde", precio: 75.99, imagen: "/imagenes/PS0014158_0_500x500.webp" },
  { id: 13, nombre: "Monitor Gaming Curvo 27 Pulgadas", precio: 159.99, imagen: "/imagenes/PS0015108_0_554x554.webp" }
];

// Obtener carrito del localStorage
function obtenerCarrito() {
  const carrito = localStorage.getItem('carrito');
  return carrito ? JSON.parse(carrito) : [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  const carrito = obtenerCarrito();
  const productoEnCarrito = carrito.find(p => p.id === idProducto);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  mostrarNotificacion(`✓ ${producto.nombre} agregado al carrito`);
  actualizarContadorCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(idProducto) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(p => p.id !== idProducto);
  guardarCarrito(carrito);
  mostrarCarrito();
  actualizarContadorCarrito();
}

// Actualizar cantidad de un producto
function actualizarCantidad(idProducto, cantidad) {
  const carrito = obtenerCarrito();
  const producto = carrito.find(p => p.id === idProducto);
  if (producto) {
    producto.cantidad = Math.max(1, cantidad);
    guardarCarrito(carrito);
    mostrarCarrito();
    actualizarContadorCarrito();
  }
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: #01fc01;
    color: #000;
    padding: 12px 20px;
    border-radius: 4px;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notif.textContent = mensaje;
  document.body.appendChild(notif);
  
  setTimeout(() => notif.remove(), 2000);
}

// Actualizar contador de carrito en el header
function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const total = carrito.reduce((sum, p) => sum + p.cantidad, 0);
  
  let contador = document.querySelector('.cart-counter');
  if (!contador && total > 0) {
    const enlaceCarrito = document.querySelector('a[href*="carrito"]');
    if (enlaceCarrito) {
      contador = document.createElement('span');
      contador.className = 'cart-counter';
      contador.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ff4444;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
      `;
      enlaceCarrito.style.position = 'relative';
      enlaceCarrito.appendChild(contador);
    }
  }
  
  if (contador) {
    contador.textContent = total;
    contador.style.display = total > 0 ? 'flex' : 'none';
  }
}

// Mostrar carrito en la página carrito.html
function mostrarCarrito() {
  const contenedor = document.querySelector('.empty-cart');
  if (!contenedor) return;

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="empty-icon">🛒</div>
      <p class="empty-title">Tu carrito está vacío</p>
      <p class="empty-text">Todavía no has agregado productos. Explora el catálogo y encuentra lo que necesitas.</p>
      <a href="../todoslosproductos/catalogo.html" class="empty-btn">Ver productos</a>
    `;
    return;
  }

  let total = 0;
  let html = '<div class="cart-items">';

  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    html += `
      <div class="cart-item">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="item-details">
          <h3>${producto.nombre}</h3>
          <p class="item-price">$${producto.precio.toFixed(2)}</p>
        </div>
        <div class="item-quantity">
          <button onclick="actualizarCantidad(${producto.id}, ${producto.cantidad - 1})">−</button>
          <input type="number" value="${producto.cantidad}" onchange="actualizarCantidad(${producto.id}, this.value)" min="1">
          <button onclick="actualizarCantidad(${producto.id}, ${producto.cantidad + 1})">+</button>
        </div>
        <div class="item-subtotal">$${subtotal.toFixed(2)}</div>
        <button class="btn-eliminar" onclick="eliminarDelCarrito(${producto.id})">🗑️</button>
      </div>
    `;
  });

  html += `
    </div>
    <div class="cart-summary">
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Envío:</span>
        <span>Gratis</span>
      </div>
      <div class="summary-row total">
        <span>Total:</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <button class="btn-checkout" onclick="procesarCompra()">Proceder a Pagar</button>
      <a href="../todoslosproductos/catalogo.html" class="btn-continuar">Seguir Comprando</a>
    </div>
  `;

  contenedor.innerHTML = html;
}

// Procesar compra (placeholder)
function procesarCompra() {
  alert('¡Gracias por tu compra! Pronto te contactaremos por WhatsApp para confirmar tu pedido.');
  localStorage.removeItem('carrito');
  mostrarCarrito();
  actualizarContadorCarrito();
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
  // Agregar funcionalidad a los botones del catálogo
  const botonesAgregar = document.querySelectorAll('.product-card button');
  botonesAgregar.forEach((btn, index) => {
    btn.addEventListener('click', () => agregarAlCarrito(index + 1));
  });

  // Mostrar carrito si estamos en la página del carrito
  if (document.querySelector('.empty-cart')) {
    mostrarCarrito();
  }

  // Actualizar contador
  actualizarContadorCarrito();

  // Agregar estilos dinámicos si no existen
  if (!document.querySelector('style[data-carrito]')) {
    const style = document.createElement('style');
    style.setAttribute('data-carrito', 'true');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
});