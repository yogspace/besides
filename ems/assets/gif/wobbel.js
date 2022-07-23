function setup() {
  createCanvas(500, 500);
}

let xPos = 50;
let yPos = 50;
let x = random(-15, 15);
let y = random(-15, 15);
let r = random(1, 3);
let xConstSpeed = random(-1.5, 1.5);
let yConstSpeed = random(-1.5, 1.5);

let easing = random(0.01, 0.03);
let xEasingSpeed = 0;
let yEasingSpeed = 0;
let radius = 20;
let display = true;

function createParticle() {
  noStroke();
  if (display) {
    circle(x, y, r);
  }
}

function moveParticle() {
  if (x * x + y * y > radius * radius) {
    xConstSpeed *= random(-1.5, 1.5);
    yConstSpeed *= random(-1.5, 1.5);
  }
  if (pow(x - (xPos - 250), 2) + pow(y - (yPos - 250), 2) > pow(radius, 2)) {
    // easing = random(0.03, 0.08);
    xEasingSpeed = (xPos - 250 - x) * random(0.03, 0.08);
    yEasingSpeed = (yPos - 250 - y) * random(0.03, 0.08);
  }

  x += xConstSpeed + xEasingSpeed;
  y += yConstSpeed + yEasingSpeed;
}

function draw() {
  createParticle();
  moveParticle();
  clear();
}
