let sketchWidth;
let sketchHeight;
let currentPosition;

function updateContent() {
  //every second the html Content will be updated
  setInterval(async () => {
    const response = await fetch("/data", { method: "GET" });

    //if express delivers no training
    const isContentEmpty = response.headers.get("Content-Length") === "0";
    if (isContentEmpty) {
      console.log("no content");
      return;
    }

    const data = await response.json();
    console.log(data);
    //overwrite training
  }, 1000);
}

updateContent();

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
}
