
const { Router} = require('express');
const { getEventos, crearEvento, actualizarEvento, deleteEvento } = require('../controllers/events');
const { validrJWT } = require('../middlewares/validar-jwt');


const router = Router();


//Todas tienen que pasar por la validación del token
//OBTENER eVENTOS

router.get('/', validrJWT, getEventos);

//Crear un evento
router.post('/', validrJWT, crearEvento);

// Actualizar evento
router.put('/:id', validrJWT, actualizarEvento);

//Eliminar evento
router.delete('/:id', validrJWT, deleteEvento);


module.exports = router;