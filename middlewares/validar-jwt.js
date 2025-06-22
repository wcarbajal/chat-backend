const jwt = require( 'jsonwebtoken' );
const { request } = require( 'express' );

const validarJWT = ( req = request, res, next ) => {

  try {

    const token = req.header( 'x-token' );

    if ( !token ) {
      return res.status( 401 ).json( {
        ok: false,
        msg: 'No hay token en la peticion'
      } );
    }

    const payload = jwt.verify( token, process.env.JWT_SECRET );
    req.uid = payload.uid;

    next();



  } catch ( error ) {
    console.log( error );
    res.status( 401 ).json( {
      ok: false,
      msg: 'Token invalido'
    } );
  }

};


module.exports = {
  validarJWT
};