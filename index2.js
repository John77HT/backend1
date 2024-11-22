const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta GET para mensaje de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor!');
});

// Ruta POST para recibir datos JSON
app.post('/datos', (req, res) => {
    const datos = req.body;
    res.send(`Datos recibidos: ${JSON.stringify(datos)}`);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
