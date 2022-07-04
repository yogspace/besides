#!/usr/bin/env node
const WebSocketClient = require("websocket").client;
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

//IP vom Server!!! windows ipconfig
//lab: 10.110.0.103
//max: 192.168.178.20
//diandra: 192.168.2.102
// nina: 192.168.178.55.
const ip = "192.168.178.20";

const client = new WebSocketClient();

client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

client.on("connect", function (connection) {
  console.log("WebSocket Client Connected");
  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on("close", function () {
    console.log("echo-protocol Connection Closed");
  });
  connection.on("message", function (message) {
    if (message.type === "utf8") {
      msg = JSON.parse(message.utf8Data);
      console.log("received: " + msg);
      myEmitter.emit("sendData", msg);

      //   myEmitter.emit("getData", JSON.parse(message.utf8Data));
    }
  });

  myEmitter.on("sendData", (data) => {
    console.log("sending: " + msg);

    connection.sendUTF(JSON.stringify(data));
  });
});

//und die Adresse + IP für den Websocket Server
client.connect("ws://" + ip + ":8080/", "echo-protocol");
console.log("client listening on " + ip);
