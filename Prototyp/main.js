#!/usr/bin/env node
const EventEmitter = require("events");
const myEmitter = new EventEmitter();
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("send", (payload) => {
    io.emit("send", payload);
  });
  socket.on("sendArea", (name) => {
    io.emit("sendArea", name);
  });
  socket.on("sendAreaLive", (name) => {
    io.emit("sendAreaLive", name);
  });
});

//https://expressjs.com/en/guide/routing.html
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/eingabe", (req, res) => {
  res.sendFile(__dirname + "/eingabe/index.html");
});
app.get("/ausgabe", (req, res) => {
  res.sendFile(__dirname + "/ausgabe/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
