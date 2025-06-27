const { usuarioConectado, usuarioDesconectado } = require( '../controllers/sockets' );
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


      //TODO: Validar JWT
      //Si el token no es válido, desconectar el socket


      //TODO: saber que usuario está activo


      //TODO: Emitir todos los usuario


      //TODO: socker join


      //TODO:: escugar cuiando un cliente manda un mensaje mensaje-personal

      //TODO: Disconnect - Marca en la BD que el usuario se desconecto

      socket.on( 'disconnect', async ( socket ) => {

        const [ valido, uid ] = comprobarJWT( socket.handshake.query[ 'x-token' ] );
        console.log( valido, uid );
        if ( !valido ) {
          console.log( 'socket no identificado' );
          return socket.disconnect();
        }

        if ( !mongoose.Types.ObjectId.isValid( uid ) ) {
          console.log( 'UID no válido:', uid );
          return socket.disconnect();
        }

        await usuarioConectado( uid );




      } );


      //TODO: Emitir todos los usuarios conectados



    } );
  }


}


module.exports = Sockets;