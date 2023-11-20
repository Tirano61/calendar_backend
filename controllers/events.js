const { response } = require('express');
const Evento = require('../models/Evento');




const getEventos = async( req, res = response ) => {

  const eventos = await Evento.find()
                              .populate('user', 'name')    

  res.json({
    ok: true,
    eventos
  });
}

const crearEvento = async (req, res = response) => {

  console.log(req.body);
  const evento = new Evento( req.body );

  try {

    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    });
  }
}

const actualizarEvento = async(req, res = response) =>{

  const eventoId = req.params.id;
  const uid = req.uid;

  try {

    const evento = await Evento.findById( eventoId );

    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: 'No existe evento para ese id'
      })
    }

    if(evento.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegios para editar este evento'
      });
    }
    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento,{ new: true} );

    res.json({
      ok: true,
      evento: eventoActualizado
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: "Hable con el admministrador"
    });
  }
}

const deleteEvento = async (req, res = response)=>{

  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    
    const evento = await Evento.findById( eventoId );

    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: 'No existe evento para ese id'
      })
    }

    if(evento.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegios para borrar este evento'
      });
    }

    await Evento.findByIdAndDelete( eventoId );

    if (evento) {
      res.json({
        ok:true,
        msg: 'Borrado con exíto'
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'No se pudo borrar'
    })
  }

  
}

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  deleteEvento

}