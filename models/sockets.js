const { usuarioConectado, usuarioDesconectado, getUsuarios } = require( '../controllers/sockets' );
const { comprobarJWT } = require( '../helpers/jwt' );


class Sockets {

  constructor( io ) {

    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on( 'connection', async ( socket ) => {

      const [ valido, uid ] = comprobarJWT( socket.handshake.query[ 'x-token' ] );
      console.log( valido, uid );
      if ( !valido ) {
        console.log( 'socket no identificado' );
        return socket.disconnect();
      }

      await usuarioConectado( uid );
      //crear una nueva conecion
      




      //TODO: Validar JWT
      //Si el token no es válido, desconectar el socket


      //TODO: saber que usuario está activo


      //TODO: Emitir todos los usuario
      this.io.emit('lista-usuarios', await getUsuarios() )


      //TODO: socker join


      //TODO:: escugar cuiando un cliente manda un mensaje mensaje-personal

      //TODO: Disconnect - Marca en la BD que el usuario se desconecto

      socket.on( 'disconnect', async () => {

        await usuarioDesconectado( uid );
         this.io.emit('lista-usuarios', await getUsuarios() )


      } );


      //TODO: Emitir todos los usuarios conectados



    } );
  }


}


module.exports = Sockets;