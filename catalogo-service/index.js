const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Arreglo en memoria (simulando base de datos)
const libros = [
    { id: 1, titulo: "El Quijote", autor: "Miguel de Cervantes", precio: 250, stock: 10 },
    { id: 2, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 300, stock: 5 },
    { id: 3, titulo: "Pedro Páramo", autor: "Juan Rulfo", precio: 150, stock: 8 },
    { id: 4, titulo: "Rayuela", autor: "Julio Cortázar", precio: 280, stock: 3 },
    { id: 5, titulo: "La ciudad y los perros", autor: "Mario Vargas Llosa", precio: 220, stock: 12 }
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
