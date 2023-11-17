const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')


const crearUsuario = async (req, res = response) => {

  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email: email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe'
      });
    }
   
    
    usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.uid,
      name: usuario.name,
      token: token

    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'No se pudo crear usuario'
    });
  }
}

const loginUsuario = async(req, res = response) => {
  const { email, password } = req.body;
 
  try {

    const usuario = await Usuario.findOne({ email: email });
    if ( !usuario ) {
      return res.status(400).json({
        ok: false,
        msg: 'Los datos no son correctos'
      });
    }

    //Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      }); 
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);
    console.log(token);
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token: token
    })
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }  
} 

const revalidarToken = async(req, res = response) => {

  const uid = req.uid;
  const name = req.name;

  // Generar un nuevo JWT y retornarlo en esta petición
  const token = await generarJWT( uid, name );
  console.log(token);
  res.json({
    ok: true,
    token: token
  })

  
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
}