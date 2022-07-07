let socket = io();
let mousePos = {
  x: 0,
  y: 0,
};
let inputCanvas = {};

socket.on("send", (payload) => {
  mousePos = payload.mousePos;
  inputCanvas = payload.canvas;
  //   console.log(payload);
  console.log(mousePos.x);
  console.log(sketchWidth);
  console.log(inputCanvas.width);
  mousePos.x = mousePos.x * (sketchWidth / inputCanvas.width);
  mousePos.y = mousePos.y * (sketchHeight / inputCanvas.height);
});

let sketchWidth;
let sketchHeight;

function setup() {
  sketchWidth = document.getElementById("sketch").offsetWidth;
  sketchHeight = document.getElementById("sketch").offsetHeight;
  let renderer = createCanvas(sketchWidth, sketchHeight);
  renderer.parent("sketch");
}

function windowResized() {
  sketchWidth = document.getElementById("sketch").offsetWidth;
  sketchHeight = document.getElementById("sketch").offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}

function draw() {
  background(0, 0, 255);
  circle(mousePos.x, mousePos.y, 20);
}
