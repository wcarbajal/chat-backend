const { response } = require( 'express' );
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const crearUsuario = async ( req, res = response ) => {

  try {

    const  {nombre, email, password} = req.body;

    //verificar que el email no exista en base de datos
    const existeEmail = await Usuario.findOne({ email })

    if( existeEmail ){
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe'
      })

    }
    
    const usuario = new Usuario( req.body );

    // encriptar contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt)    

    // Guardar en base de datos

    await usuario.save();



    res.json({
      usuario
    })

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'hable con el admin'
    } );
  }
};

const login = async ( req, res ) => {

  const { email, password } = req.body;

  res.json( {
    ok: true,
    mesg: 'login',
    email,
    password
  } );
};

const renewToken = async ( req, res ) => {

  res.json( {
    ok: true,
    usuario: 'renew'
  } );
};


module.exports = {

  crearUsuario,
  login,
  renewToken

};