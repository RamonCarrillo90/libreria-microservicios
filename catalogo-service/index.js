const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Arreglo en memoria (simulando base de datos)
const libros = [
    { id: 1, titulo: "Las ratas de las paredes", autor: "HP. Lovecraft", precio: 320, stock: 15 },
    { id: 2, titulo: "El horror de red hook", autor: "HP. Lovecraft", precio: 400, stock: 21 },
    { id: 3, titulo: "Pedro Páramo", autor: "Juan Rulfo", precio: 150, stock: 8 },
    { id: 4, titulo: "Cadaver exquisito", autor: "Agustina Bazterrica", precio: 240, stock: 2 },
    { id: 5, titulo: "14 semanas en globo", autor: "Julio Verne", precio: 220, stock: 12 }
];

// Endpoint GET /api/libros/:id
app.get('/api/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    if (libro) {
        res.status(200).json(libro);
    } else {
        res.status(404).json({ error: "Libro no encontrado" });
    }
});

// Endpoint para actualizar stock (útil para el servicio de órdenes)
app.patch('/api/libros/:id/stock', (req, res) => {
    const id = parseInt(req.params.id);
    const { cantidad } = req.body;
    const libro = libros.find(l => l.id === id);

    if (!libro) {
        return res.status(404).json({ error: "Libro no encontrado" });
    }

    if (libro.stock < cantidad) {
        return res.status(400).json({ error: "Stock insuficiente" });
    }

    libro.stock -= cantidad;
    res.status(200).json({ mensaje: "Stock actualizado", nuevoStock: libro.stock });
});

app.listen(PORT, () => {
    console.log(`Servicio de Catálogo ejecutándose en http://localhost:${PORT}`);
});

module.exports = app; // Para pruebas y Vercel
