let socket = io();

let sketchWidth = document.getElementById("sketch").offsetWidth;
let sketchHeight = document.getElementById("sketch").offsetHeight;
let backgroundImg;

let mousePos = {
  x: 0,
  y: 0,
};
let inputCanvas = {};

let player = {
  pos: {
    x: 100,
    y: 100,
  },
};

let wayPoints = [
  //FLUR
  {
    name: "door",
    id: 0,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.04,
      y: sketchHeight - sketchHeight * 0.18,
    },
  },
  //   {
  //     pos: {
  //       x: sketchWidth / 2 - sketchWidth * 0.12,
  //       y: sketchHeight / 2 + sketchHeight * 0.13,
  //     },
  //   },
  {
    id: 1,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.12,
      y: sketchHeight / 2 - sketchHeight * 0.038,
    },
  },
  {
    id: 2,
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.05,
      y: sketchHeight / 2 - sketchHeight * 0.038,
    },
  },
  {
    id: 3,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.03,
      y: sketchHeight / 2 + sketchWidth * 0.015,
    },
  },
  {
    id: 4,
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.05,
      y: sketchHeight / 2 + sketchHeight * 0.08,
    },
  },
  //SCHLAFZIMMER
  {
    name: "bed",
    id: 5,
    pos: {
      x: sketchWidth * 0.28,
      y: sketchHeight * 0.35,
    },
  },
  //WOHNZIMMER
  {
    id: 6,
    pos: {
      x: sketchWidth - sketchWidth * 0.35,
      y: sketchHeight * 0.3,
    },
  },
  {
    id: 7,
    pos: {
      x: sketchWidth - sketchWidth * 0.2,
      y: sketchHeight * 0.25,
    },
  },
  {
    name: "desk",
    id: 8,
    pos: {
      x: sketchWidth - sketchWidth * 0.09,
      y: sketchHeight * 0.33,
    },
  },
  //KÜCHE
  {
    name: "table",
    id: 9,
    pos: {
      x: sketchWidth - sketchWidth * 0.35,
      y: sketchHeight - sketchHeight * 0.35,
    },
  },
  {
    name: "kitchen",
    id: 10,
    pos: {
      x: sketchWidth - sketchWidth * 0.32,
      y: sketchHeight - sketchHeight * 0.22,
    },
  },
];

function preload() {
  backgroundImg = loadImage("./img/Outputwohnung.png");
}

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
  clear();
  drawBackround();
  drawWayPoints();
  drawCircle();
  drawPlayer();
}

socket.on("send", (payload) => {
  mousePos = payload.mousePos;
  inputCanvas = payload.canvas;
  mousePos.x = mousePos.x * (sketchWidth / inputCanvas.width);
  mousePos.y = mousePos.y * (sketchHeight / inputCanvas.height);
});

socket.on("sendArea", (name) => {
  console.log(name);
  for (let i = 0; i < wayPoints.length; i++) {
    if (name === wayPoints[i].name) {
      player.pos = wayPoints[i].pos;
    }
  }
});
socket.on("sendAreaLive", (payload) => {
  player.pos = payload.mousePos;
});

function drawPlayer(route) {
  fill(0, 0, 255);
  stroke(0, 150, 0);
  strokeWeight(10);
  line(player.pos.x, player.pos.y - 30, player.pos.x, player.pos.y + 30);
  noStroke();
  circle(player.pos.x, player.pos.y, 30);
}

function drawWayPoints() {
  for (let i = 0; i < wayPoints.length; i++) {
    fill(255, 0, 0);
    circle(wayPoints[i].pos.x, wayPoints[i].pos.y, 20);
  }
}

function drawCircle() {
  noStroke();
  fill(255, 0, 0);
  circle(mousePos.x, mousePos.y, 20);
}

function drawBackround() {
  noStroke();
  background(255, 255, 255);
  image(backgroundImg, 0, 0, sketchWidth, sketchHeight);
}
