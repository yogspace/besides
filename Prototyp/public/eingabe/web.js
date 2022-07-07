let sketchWidth;
let sketchHeight;
let currentPosition;

let mousePos = {
  x: 0,
  y: 0,
  time: "",
};

let mousePositions = [];
let timer = 0;

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

function setMousePos() {
  fill(255, 255, 255);
  circle(mouseX, mouseY, 20);
  mousePos = {
    x: mouseX,
    y: mouseY,
  };
  timer++;
  if (timer > 50) {
    let data;
    mousePositions.push(mousePos);
    data = JSON.stringify({ mousePositions });
    sendMousePos(data);
    if (mousePositions.length > 20) {
      mousePositions.shift();
    }
    timer = 0;
  }
}

//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//https://expressjs.com/en/guide/routing.html
async function sendMousePos(json) {
  fetch("/data", {
    method: "POST",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.json();
  });
  console.log("sended: " + json);
}

function draw() {
  clear();
  background(0, 0, 255);
  setMousePos();
}
