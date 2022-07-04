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
  autoAcceptConnections: false,
});

//build a connection to client
wsServer.on("request", function (request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }

  let connection = request.accept("echo-protocol", request.origin);
  console.log(new Date() + " Connection accepted.");

  //sends Data
  myEmitter.on("sendData", (data) => {
    console.log("sending: " + data);
    connection.sendUTF(JSON.stringify(data));
  });
  connection.on("message", function (data) {
    let msg = JSON.parse(data.utf8Data);
    console.log("received: " + msg);
  });

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
