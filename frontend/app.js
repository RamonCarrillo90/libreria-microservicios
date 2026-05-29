const CATALOGO = 'https://libreria-microservicios.vercel.app';
const ORDENES = 'https://libreria-microservicios-54wf.vercel.app';

// Cargar todos los libros al iniciar
window.addEventListener('load', async () => {
    const grid = document.getElementById('libros-grid');

    try {
        const response = await fetch(`${CATALOGO}/api/libros`);
        const libros = await response.json();

        libros.forEach(libro => {
            grid.innerHTML += `
                <div class="libro-card">
                    <h3>${libro.titulo}</h3>
                    <p>${libro.autor}</p>
                    <p class="precio">$${libro.precio}</p>
                    <p class="stock">Stock: ${libro.stock}</p>
                    <p style="font-size:11px; color:#aaa;">ID: ${libro.id}</p>
                </div>
            `;
        });
    } catch (error) {
        grid.innerHTML = '<p>Error al cargar los libros.</p>';
    }
});

// Crear orden al dar clic
document.getElementById('btn-orden').addEventListener('click', async () => {
    const libroId = parseInt(document.getElementById('libroId').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const cliente = document.getElementById('cliente').value.trim();
    const estado = document.getElementById('estado-orden');
    const resultado = document.getElementById('resultado-orden');

    if (!libroId || !cantidad || !cliente) {
        estado.textContent = 'Completa todos los campos.';
        return;
    }

    estado.textContent = 'Procesando orden...';
    resultado.style.display = 'none';

    try {
        const response = await fetch(`${ORDENES}/api/ordenes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ libroId, cantidad, cliente })
        });

        const data = await response.json();

        resultado.style.display = 'block';

        if (response.ok) {
            estado.textContent = '';
            resultado.className = 'exito';
            resultado.innerHTML = `
                ✓ Orden creada exitosamente<br>
                <strong>Libro:</strong> ${data.orden.tituloLibro}<br>
                <strong>Cantidad:</strong> ${data.orden.cantidad}<br>
                <strong>Cliente:</strong> ${data.orden.cliente}<br>
                <strong>Total:</strong> $${data.orden.totalAPagar}
            `;
        } else {
            estado.textContent = '';
            resultado.className = 'error';
            resultado.innerHTML = `✗ ${data.error || 'Error al crear la orden'}`;
        }
    } catch (error) {
        estado.textContent = 'Error al conectar con el servicio.';
    }
});