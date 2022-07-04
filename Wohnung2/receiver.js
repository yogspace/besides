#!/usr/bin/env node
const WebSocketClient = require("websocket").client;
const EventEmitter = require("events");
const express = require("express");
const path = require("path");

const myEmitter = new EventEmitter();
const app = express();

//IP vom Server - windows ipconfig
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
  myEmitter.on("sendData", (data) => {
    console.log("sending: " + msg);
    connection.sendUTF(JSON.stringify(data));
  });
  connection.on("message", function (message) {
    if (message.type === "utf8") {
      msg = JSON.parse(message.utf8Data);
      console.log("received: " + msg);
    }
  });
});

//https://expressjs.com/en/guide/routing.html
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/data", (req, res) => {
  data = "bla bla";
  res.send(JSON.stringify(data));
});

app.listen(3000);
console.log("listening on http://localhost:3000");

//und die Adresse + IP für den Websocket Server
client.connect("ws://" + ip + ":8080/", "echo-protocol");
console.log("client listening on " + ip);
