const WebSocketServer = require("websocket").server;
const http = require("http");
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

//https://www.npmjs.com/package/websocket
const server = http.createServer(function (request, response) {
  console.log(new Date() + " Received request for " + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
});

//build a connection to client
wsServer.on("request", function (request) {
  if (!originIsAllowed(request.origin)) {
    // nur bestimmte Anfragen erlauben (wenn angegeben)
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }

  let connection = request.accept("echo-protocol", request.origin); // Was ist ein echo-Protocol?
  console.log(new Date() + " Connection accepted.");
  connection.sendUTF(JSON.stringify("Hi"));

  //sends Data
  myEmitter.on("sendData", (data) => {
    console.log("sending: " + data);
    connection.sendUTF(JSON.stringify(data));
  });
  connection.on("message", function (data) {
    let msg = JSON.parse(data.utf8Data);
    console.log("received: " + msg);
    myEmitter.emit("sendData", "Hallooooooo");
  });

  // If connection is closed
  connection.on("close", function (reasonCode, description) {
    console.log(
      new Date() + " Peer " + connection.remoteAddress + " disconnected."
    );
    clientConnected = false;
  });
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
