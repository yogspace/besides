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
});

//https://expressjs.com/en/guide/routing.html
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/eingabe", (req, res) => {
  res.sendFile(path.join(__dirname + "/eingabe/index.html"));
});
app.get("/ausgabe", (req, res) => {
  res.sendFile(path.join(__dirname + "/ausgabe/index.html"));
});

let data;

app.post("/data", async (req, res) => {
  data = req.body;
});
app.get("/data", async (req, res) => {
  // console.log(data);
  res.send(data);
});
// app.get("/set-data", async (req, res) => {
//   res.send(data);
// });
app.listen(3000);
console.log("listening on http://localhost:3000");
console.log("http://localhost:3000/eingabe for input apartment");
console.log("http://localhost:3000/ausgabe for output apartment");
