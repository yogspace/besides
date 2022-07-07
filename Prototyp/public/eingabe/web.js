let socket = io();

let sketchWidth;
let sketchHeight;

let mousePos = {
  x: 0,
  y: 0,
};

let payload = {};

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

function drawCircle() {
  circle(mouseX, mouseY, 20);
}

function mouseMoved() {
  mousePos = {
    x: mouseX,
    y: mouseY,
  };
  payload = {
    canvas: {
      width: sketchWidth,
      height: sketchHeight,
    },
    mousePos: mousePos,
  };
  socket.emit("send", payload);
}

function draw() {
  clear();
  background(0, 0, 255);
  drawCircle();
}
