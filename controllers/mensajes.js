const Mensaje = require('../models/mensaje'); // Asegúrate de que la ruta sea correcta

const obtenerChat = async ( req, res ) => {
 
  const miId = req.uid; // ID del usuario que solicita el chat
  const mensajeDe = req.params.de;

  const last30 = await Mensaje.find({
    $or: [
      { de: miId, para: mensajeDe },
      { de: mensajeDe, para: miId }
    ]
  })
  .sort({ createdAt: 'desc' })
  .limit(30);


  res.json( {
    ok: true,
    msg: 'Aquí irían los mensajes de los usuarios',
    miId,
    mensajeDe,
    mensajes: last30
  } );

};

module.exports = {
  obtenerChat
};