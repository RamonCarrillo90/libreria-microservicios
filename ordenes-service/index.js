const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3002;

app.use(express.json());

const CATALOGO_URL = process.env.CATALOGO_URL || 'https://libreria-microservicios-9s0zf9zt2-proyectos-ramon.vercel.app';

const ordenes = [];

app.post('/api/ordenes', async (req, res) => {
    const { libroId, cantidad, cliente } = req.body;

    if (!libroId || !cantidad || !cliente) {
        return res.status(400).json({ error: "Datos incompletos: libroId, cantidad y cliente son requeridos" });
    }

    try {
        const response = await axios.get(`${CATALOGO_URL}/api/libros/${libroId}`);
        const libro = response.data;

        if (libro.stock < cantidad) {
            return res.status(400).json({ 
                error: "Stock insuficiente", 
                mensaje: `Solo hay ${libro.stock} unidades disponibles de "${libro.titulo}"` 
            });
        }

        const totalAPagar = libro.precio * cantidad;

        const nuevaOrden = {
            id: ordenes.length + 1,
            libroId,
            tituloLibro: libro.titulo,
            cantidad,
            cliente,
            totalAPagar,
            fecha: new Date()
        };

        ordenes.push(nuevaOrden);

        res.status(201).json({
            mensaje: "Orden creada con éxito",
            orden: nuevaOrden
        });

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: "El libro solicitado no existe en el catálogo" });
        }
        console.error("Error:", error.message);
        res.status(500).json({ error: "Error interno al comunicarse con el servicio de catálogo" });
    }
});

app.get('/api/ordenes', (req, res) => {
    res.status(200).json(ordenes);
});

app.listen(PORT, () => {
    console.log(`Servicio de Órdenes ejecutándose en http://localhost:${PORT}`);
});

module.exports = app;