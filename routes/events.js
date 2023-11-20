
const { Router} = require('express');
const { getEventos, crearEvento, actualizarEvento, deleteEvento } = require('../controllers/events');
const { validrJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const isDate = require('../helpers/isDate');

const router = Router();


//  Todas tienen que pasar por la validación del token
//  Todas las rutas que esten debajo de este middleware 
//  necesitaran el token para pasar
router.use(validrJWT);



//OBTENER eVENTOS
router.get(
  '/',
  
  getEventos
);

//Crear un evento
router.post(
  '/',
  [
    check('title', 'El título es obligatorio', ).not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria', ).custom( isDate ),
    check('end'  , 'Fecha de finalización es obligatoria', ).custom( isDate ),
    
    validarCampos
  ],  
  crearEvento
);

// Actualizar evento
router.put(
  '/:id',
  [
    check('title', 'El título es obligatorio', ).not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria', ).custom( isDate ),
    check('end'  , 'Fecha de finalización es obligatoria', ).custom( isDate ),
    validarCampos
  ],
  actualizarEvento
);

//Eliminar evento
router.delete('/:id',  deleteEvento);


module.exports = router;