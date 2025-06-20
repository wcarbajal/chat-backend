/* 
el path: ????
*/


const   { Router }  = require('express');
const { crearUsuario, login, renewToken } = require( '../controllers/auth' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );


const router = Router();

// crear nuevo usuario
router.post( '/new', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  validarCampos
], crearUsuario )

// loin de usuario
router.post( '/', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validarCampos
], login)

// loin de usuario
router.get( '/renew', renewToken )


module.exports = router