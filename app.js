// ======================= app.js =======================

// ======== FORMULARIO DE PEDIDO ========
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formPedido');
  if (!form) return;

  const outNombre = document.getElementById('outNombre');
  const outLista = document.getElementById('outLista');
  const outTotal = document.getElementById('outTotal');
  const btnConfirmar = document.getElementById('btnConfirmar');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreCliente').value.trim();
    const selModelo = document.getElementById('selModelo');
    const selTalla = document.getElementById('selTalla');
    const selColor = document.getElementById('selColor');
    const cantidad = Number(document.getElementById('inpCantidad').value || 0);

    if (!nombre || !selModelo?.value || !selTalla?.value || !selColor?.value || cantidad < 1) {
      alert('Completa todos los campos correctamente.');
      return;
    }

    const optModelo = selModelo.options[selModelo.selectedIndex];
    const precioModelo = getPrecio(optModelo);
    const total = precioModelo * cantidad;

    outNombre.textContent = nombre;
    outLista.innerHTML = `
      <li><strong>Producto:</strong> ${selModelo.value}</li>
      <li><strong>Tamaño:</strong> ${selTalla.value}</li>
      <li><strong>Tipo:</strong> ${selColor.value}</li>
      <li><strong>Cantidad:</strong> ${cantidad}</li>
      <li><strong>Precio unitario:</strong> ${toMXN(precioModelo)}</li>
    `;
    outTotal.textContent = toMXN(total);
    btnConfirmar.disabled = false;
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      outNombre.textContent = '—';
      outLista.innerHTML = '<li class="text-muted">Aún no has generado tu pedido.</li>';
      outTotal.textContent = '$0';
      btnConfirmar.disabled = true;
    }, 0);
  });

  function toMXN(num) {
    return Number(num || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
  }

  function getPrecio(el) {
    return Number(el?.dataset?.precio || 0);
  }
});

// ===== EFECTO DE LUZ EN EL FONDO =====
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const originalBg = getComputedStyle(body).getPropertyValue('background-color');

  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    if (e.target === document.body) {
      body.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--color-azul-neon), ${originalBg} 400px)`;
    } else {
      body.style.background = originalBg;
    }
  });

  document.addEventListener('mouseleave', () => {
    body.style.background = originalBg;
  });
});

// ===== CARRITO DE COMPRAS =====
document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: "Baguette", img: "https://via.placeholder.com/150" },
    { id: 2, name: "Pan integral", img: "https://via.placeholder.com/150" },
    { id: 3, name: "Concha", img: "https://via.placeholder.com/150" },
    { id: 4, name: "Croissant", img: "https://via.placeholder.com/150" },
    { id: 5, name: "Pan de centeno", img: "https://via.placeholder.com/150" }
  ];

  const productList = document.getElementById("product-list");
  const cartList = document.getElementById("cart-list");
  if (!productList || !cartList) return;

  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-3";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${product.img}" class="card-img-top" alt="${product.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${product.name}</h5>
          <button class="btn btn-primary" onclick="addProduct(${product.id})">Agregar</button>
          <button class="btn btn-danger" onclick="removeProduct(${product.id})">Eliminar</button>
        </div>
      </div>`;
    productList.appendChild(col);
  });

  window.addProduct = function (id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const li = document.createElement("li");
    li.className = "list-group-item added";
    li.textContent = product.name;
    cartList.appendChild(li);
    setTimeout(() => li.classList.remove("added"), 1000);
  };

  window.removeProduct = function () {
    const items = cartList.getElementsByTagName("li");
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      lastItem.classList.add("removed");
      setTimeout(() => lastItem.remove(), 500);
    }
  };
});
