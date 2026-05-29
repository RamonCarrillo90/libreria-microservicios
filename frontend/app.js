const btn = document.getElementById('btn');
const estado = document.getElementById('estado')
const resultado = document.getElementById('resultado')

btn.addEventListener('click', async() => {
    estado.textContent = "consultando a la api...";
    resultado.innerHTML = '';

    try{
        const response = await fetch('https://libreria-microservicios.vercel.app/api/libros/1');
        const data = await response.json()

        estado.textContent = "respuesta recibida";
        resultado.innerHTML = `<strong>${data.titulo}</strong><br><br>${data.stock}`;
    }catch (error) {
    estado.textContent = 'Error al conectar con la API.';
    console.error(error);
}
});