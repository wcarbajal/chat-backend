

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

          //TODO: Validar JWT
          //Si el token no es válido, desconectar el socket


          //TODO: saber que usuario está activo


          //TODO: Emitir todos los usuario


          //TODO: socker join


          //TODO:: escugar cuiando un cliente manda un mensaje mensaje-personal

          //TODO: Disconnect - Marca en la BD que el usuario se desconecto
          

          //TODO: Emitir todos los usuarios conectados

            
        
        });
    }


}


module.exports = Sockets;