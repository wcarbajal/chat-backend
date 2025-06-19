/* 
el path: ????
*/


const   { Router }  = require('express')

const router = Router();

// crear nuevo usuario
router.post( '/new', ( req, res) => {
 
  res.json({
    ok: true,
    usuario: 'new'
  })
})

// loin de usuario
router.post( '/', ( req, res) => {

  
 
  res.json({
    ok: true,
    usuario: 'Login'
  })
})

// loin de usuario
router.get( '/renew', ( req, res) => {
 
  res.json({
    ok: true,
    usuario: 'renew'
  })
})


module.exports = router