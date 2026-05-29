const btn = document.getElementById('btn');
const estado = document.getElementById('estado')
const resultado = document.getElementById('resultado')

// Se ejecuta automaticamente al cargar la pagina
window.addEventListener('load', async () => {
    const response = await fetch('https://libreria-microservicios.vercel.app/api/libros');
    const libros = await response.json();

    libros.forEach(libro => {
        resultado.innerHTML += `<p><strong>${libro.titulo}</strong> - $${libro.precio}</p>`;
    });
});