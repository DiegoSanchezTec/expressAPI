const express = require("express");
const app = express();
const port = 8080;

// Middleware para parsear JSON
app.use(express.json());

// GET - Obtener saludo
app.get("/hello", (req, res) => {
  res.json({ message: "Hello, World!", method: "GET" });
});

// POST - Crear nuevo saludo
app.post("/hello", (req, res) => {
  const { name } = req.body;
  if (name) {
    res.status(201).json({ message: `Hello, ${name}!`, method: "POST" });
  } else {
    res.status(400).json({ error: "Se requiere el campo 'name' en el body" });
  }
});

// PUT - Actualizar saludo por ID
app.put("/hello/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  if (name) {
    res.json({ 
      message: `Saludo con id: ${id} actualizado a: Hello, ${name}!`, 
      method: "PUT" 
    });
  } else {
    res.status(400).json({ error: "Se requiere el campo 'name' en el body" });
  }
});

// DELETE - Eliminar saludo por ID
app.delete("/hello/:id", (req, res) => {
  const { id } = req.params;
  res.json({ 
    message: `Saludo con id: ${id} eliminado`, 
    method: "DELETE" 
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});