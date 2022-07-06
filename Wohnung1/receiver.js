#!/usr/bin/env node
const WebSocketClient = require("websocket").client;
const EventEmitter = require("events");
const express = require("express");
const path = require("path");

const myEmitter = new EventEmitter();
const app = express();

//IP vom Server - windows ipconfig
//Max Zuhause 192.168.178.20
//Max Dieburg 172.16.16.228
const ip = "172.16.16.228";

let payload = {
  status: "",
  action: [],
};
let lastRoutePoint = {
  id: null,
  name: "",
  time: [],
};
let newRoutePoint = {
  id: null,
  name: "",
  time: [],
};

let routePoints = [];

function setStatus() {
  /**
   *
   * hat sich der RP verändert?
   * ja?
   * < 5? "moved" - von wo bis wo?
   * > 5? "frantic" von wo bis wo?
   * nein? "stayed" wo?
   * < 0? "inactive" wo?
   *
   */
  console.log(lastRoutePoint);
  console.log(newRoutePoint);

  const d = new Date().toString();
  const h = d.split(" ")[4].split(":")[0];
  const m = d.split(" ")[4].split(":")[1];
  const s = d.split(" ")[4].split(":")[2];
  const dateNow = [h, m, s];
  // hat sich der RP verändert?
  if (lastRoutePoint.id !== routePoints[routePoints.length - 1].id) {
    //ja?
    console.log("changed");
  } else {
    //nein
  }

  //inactive
  payload = {
    status: "inactive",
    action: [{ x: 0, y: 0 }],
  };

  //stayed
  payload = {
    status: "staying",
    action: [{ x: 0, y: 0 }],
  };

  //moved
  payload = {
    status: "moving",
    action: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  };

  //frantic
  payload = {
    status: "frantic",
    action: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  };
  return payload;
}

function calcRoute() {
  action = [];
  return action;
}

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
      let msg = JSON.parse(message.utf8Data);
      console.log("received: " + msg);
      lastRoutePoint = routePoints[routePoints.length - 1];
      routePoints.push(msg);
      newRoutePoint = msg;
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
  res.send(JSON.stringify(setStatus()));
});

app.listen(3000);
console.log("listening on http://localhost:3000");

//und die Adresse + IP für den Websocket Server
client.connect("ws://" + ip + ":8080/", "echo-protocol");
console.log("client listening on " + ip);
