/*
  Rutas de usuarios / auth
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validrJWT } = require('../middlewares/validar-jwt');
;


router.post(
  '/new',
  [ 
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
); 
  
router.post(
  '/',
  [
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email es obligatorio').isEmail(),   
    validarCampos,
  ],
  loginUsuario
);

router.get('/renew', validrJWT , revalidarToken ); 

module.exports = router;