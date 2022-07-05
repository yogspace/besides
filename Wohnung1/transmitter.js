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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let positions = [
  {
    id: 0,
    name: "bed",
    time: "14:00:22",
  },
  {
    id: 1,
    name: "couch",
    time: "13:20:22",
  },
  {
    id: 2,
    name: "fridge",
    time: "16:12:32",
  },
  {
    id: 3,
    name: "shower",
    time: "19:37:45",
  },
];

const myInt = setInterval(() => {
  const d = new Date().toString();
  const h = d.split(" ")[4].split(":")[0];
  const m = d.split(" ")[4].split(":")[1];
  const s = d.split(" ")[4].split(":")[2];
  const dateNow = [h, m, s];

  let i = getRndInteger(0, 3);

  positions[i].time = dateNow;
  myEmitter.emit("sendData", positions[i]);
}, 3000);
