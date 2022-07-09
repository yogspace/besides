let socket = io();

let sketchWidth = document.getElementById("sketch").offsetWidth;
let sketchHeight = document.getElementById("sketch").offsetHeight;
let backgroundImg;

let mousePos = {
  x: 0,
  y: 0,
};

let areas = [
  {
    name: "door",
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.005,
      y: sketchHeight - sketchHeight * 0.115,
      width: sketchWidth * 0.1,
      height: sketchHeight * 0.08,
    },
    color: [255, 255, 0],
  },
  {
    name: "couch",
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.152,
      y: sketchHeight / 2 - sketchHeight * 0.097,
      width: sketchWidth * 0.065,
      height: sketchHeight * 0.205,
    },
    color: [255, 0, 0],
  },
  {
    name: "livearea",
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.071,
      y: sketchHeight / 2 - sketchHeight * 0.097,
      width: sketchWidth * 0.1,
      height: sketchHeight * 0.205,
    },
    color: [255, 100, 100],
  },
  {
    name: "desk",
    pos: {
      x: sketchWidth - sketchWidth * 0.0778,
      y: sketchHeight / 2 + sketchHeight * 0.163,
      //   y: sketchHeight / 2 + sketchHeight * 0.176,
      width: sketchWidth * 0.115,
      height: sketchHeight * 0.128,
    },
    color: [0, 255, 0],
  },
  {
    name: "bed",
    pos: {
      x: sketchWidth - sketchWidth * 0.166,
      y: sketchHeight * 0.378,
      width: sketchWidth * 0.135,
      height: sketchHeight * 0.232,
    },
    color: [255, 0, 255],
  },
  {
    name: "table",
    pos: {
      x: sketchWidth * 0.235,
      y: sketchHeight / 2 - sketchHeight * 0.018,
      width: sketchWidth * 0.136,
      height: sketchWidth * 0.136,
    },
    color: [0, 0, 255],
  },
  {
    name: "kitchen",
    pos: {
      x: sketchWidth * 0.166,
      y: sketchHeight - sketchHeight * 0.19,
      //   y: sketchHeight - sketchHeight * 0.125,
      width: sketchWidth * 0.29,
      height: sketchWidth * 0.176,
      //   height: sketchWidth * 0.072,
    },
    color: [255, 125, 0],
  },
];

let payload = {};

function preload() {
  backgroundImg = loadImage("./img/Inputwohnung.png");
}

function setup() {
  sketchWidth = document.getElementById("sketch").offsetWidth;
  sketchHeight = document.getElementById("sketch").offsetHeight;
  let renderer = createCanvas(sketchWidth, sketchHeight);
  renderer.parent("sketch");
  rectMode(CENTER);
}

function windowResized() {
  sketchWidth = document.getElementById("sketch").offsetWidth;
  sketchHeight = document.getElementById("sketch").offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}

function draw() {
  clear();
  drawBackround();
  drawAreas();
  // drawCircle();
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
    area: {
      in: false,
      x: areas[2].pos.x,
      y: areas[2].pos.y,
      width: areas[2].pos.width,
      height: areas[2].pos.height,
    },
  };
  socket.emit("send", payload);

  if (
    mouseX > areas[2].pos.x - areas[2].pos.width / 2 &&
    mouseX < areas[2].pos.x + areas[2].pos.width / 2 &&
    mouseY > areas[2].pos.y - areas[2].pos.height / 2 &&
    mouseY < areas[2].pos.y + areas[2].pos.height / 2
  ) {
    payload.area.in = true;
  } else {
    payload.area.in = false;
  }
  socket.emit("sendAreaLive", payload);
}

function mouseClicked() {
  move();
}

function move() {
  for (let i = 0; i < areas.length; i++) {
    if (
      mouseX > areas[i].pos.x - areas[i].pos.width / 2 &&
      mouseX < areas[i].pos.x + areas[i].pos.width / 2 &&
      mouseY > areas[i].pos.y - areas[i].pos.height / 2 &&
      mouseY < areas[i].pos.y + areas[i].pos.height / 2
    ) {
      socket.emit("sendArea", areas[i].name);
    }
  }
}

function drawCircle() {
  noStroke();
  fill(255, 0, 0);
  circle(mouseX, mouseY, 20);
}

function drawAreas() {
  for (let i = 0; i < areas.length; i++) {
    let c = color(
      Number(areas[i].color[0]),
      Number(areas[i].color[1]),
      Number(areas[i].color[2])
    );
    fill(c);
    rect(
      areas[i].pos.x,
      areas[i].pos.y,
      areas[i].pos.width,
      areas[i].pos.height
    );
  }
}

function drawBackround() {
  noStroke();
  background(255, 255, 255);
  image(backgroundImg, 0, 0, sketchWidth, sketchHeight);
}
