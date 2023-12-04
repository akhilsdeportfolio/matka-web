import Ably from 'ably/build/ably-webworker.min';


const client = new Ably.Realtime({ key: "ITntaQ.S5HTeA:1lcFYdQXnAGm3a_D622iTahGKIA2GWLmuRUjQU7jz9k", useBinaryProtocol: true });

console.log("Client", client);

client.connection.on("connected", function () {
  //console.log("Connceted Success")
  client.channels.get('game').once('attached',(data)=>{
    
    
    client.channels.get('game').presence.subscribe("enter",(e)=>{
      //console.log("Enter",e)
    });
    client.channels.get('game').presence.subscribe("update",(e)=>{
      //console.log("Updae",e)
    });
    client.channels.get('game').presence.enterClient("UUID123132132132");

  })
});

client.connection.on('disconnected',function(){
  client.channels.get('game').presence.leaveClient("UUID123132132132")
})

client.connection.on('failed', function (e) {
  console.error("Connection Failed",e);
  
});


export default client;