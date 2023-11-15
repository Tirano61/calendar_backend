

const express = require('express');


// Crear el servidor de express
const app = express();



// Escuchar peticiones
app.listen(4054, () => {
  console.log(`Servidor corriendo en puerto ${4054}`);
});