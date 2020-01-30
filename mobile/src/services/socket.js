import socketio from 'socket.io-client';

const socket = socketio('http://192.168.15.15:3333', {
   autoConnect: false,
});

function connect(latitude, longitude, tehcs){
   socket.io.opts.query = {
      latitude, 
      longitude, 
      tehcs,
   };
   
   socket.connect();
}

function disconnect(){
   if(socket.connected){
      socket.disconnected();
   }
}

export {
   connect,
   disconnect,
};

