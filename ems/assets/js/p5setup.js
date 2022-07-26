let ghost1;
let ghost2;
let ghost3;
let ghost4;
let ghost1kill;
let ghost2kill;
let ghost3kill;
let ghost4kill;
let diam;
let heart;
let head;
let bodytail;
let blackhole;

function preload() {
  ghost1 = loadImage("img/ghost1.svg");
  ghost2 = loadImage("img/ghost2.svg");
  ghost3 = loadImage("img/ghost3.svg");
  ghost4 = loadImage("img/ghost4.svg");
  ghost1kill = loadImage("img/ghost1kill.svg");
  ghost2kill = loadImage("img/ghost2kill.svg");
  ghost3kill = loadImage("img/ghost3kill.svg");
  ghost4kill = loadImage("img/ghost4kill.svg");
  diam = loadImage("img/food.svg");
  heart = loadImage("img/heart.svg");
  head = loadImage("img/head.svg");
  bodytail = loadImage("img/bodytail.svg");
  blackhole = loadImage("img/blackhole.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
}

new p5();
var width = windowWidth;
var height = windowHeight;

window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});
