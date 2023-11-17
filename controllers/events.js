const { response } = require('express');


const getEventos = async( req, res = response ) => {
  res.json({
    ok: true,
    msg: 'getEventos'
  });
}

const crearEvento = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'crearEvento'
  })
}

const actualizarEvento = async(req, res = response) =>{
  res.json({
    ok:true,
    msg: 'actualizarEvento'
  })
}
const deleteEvento = async (req, res = response)=>{
  res.json({
    ok:true,
    msg: 'deleteEvento'
  })
}

/* {
  ok: true,
  msg: 'Eventos'
} */



module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  deleteEvento

}