const { response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );
const Usuario = require( '../models/usuario' );
const { generarJWT } = require( '../helpers/jwt' );


const crearUsuario = async ( req, res = response ) => {

  try {

    const { nombre, email, password } = req.body;

    //verificar que el email no exista en base de datos
    const existeEmail = await Usuario.findOne( { email } );

    if ( existeEmail ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'El correo ya existe'
      } );

    }

    const usuario = new Usuario( req.body );

    // encriptar contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    // Guardar en base de datos
    await usuario.save();

    //generar JWT
    const token = await generarJWT( usuario.id );

    res.json( {
      ok: true,
      usuario,
      token
    } );

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

  try {
    // verificar email
    const usuario = await Usuario.findOne( { email } );

    //verificar si existe el correo

    if ( !usuario ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'El correo no existe'
      } );
    }
    //validar pasword
    const validPassword = bcrypt.compareSync( password, usuario.password );

    if ( !validPassword ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'Contraseña incorrecta'
      } );
    }

    // generar JWT
    const token = await generarJWT( usuario.id );

    res.json( {
      ok: true,
      usuario,
      token
    } );




  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'hable con el admin'
    } );

  }


};

const renewToken = async ( req, res ) => {

//obtener uid del usuario
  const uid = req.uid;

  //generar un nuevo JWT
  const token = await generarJWT( uid );

  const usuario = await Usuario.findById( uid );



  res.json( {
    ok: true,
    uid,
    usuario,
    token
  } );
};




module.exports = {

  crearUsuario,
  login,
  renewToken,
  

};