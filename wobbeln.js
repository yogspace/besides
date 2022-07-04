function setup() {
  angleMode(DEGREES);
}

function randomgrid() {
  for (let i = 0; i < 1000; i++) {
    var r = 100;
    xx = Math.random() * 2 * r - r;
    ylim = Math.sqrt(r * r - xx * xx);
    yy = Math.random() * 2 * ylim - ylim;
    rect(xx, yy, 10);
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getCircleGrid(radius) {
  let r = radius;
  let circleGrid = [];

  translate(width / 2, height / 2);
  //kreis
  for (let x = -r; x < r; x += 7) {
    for (let y = -r; y < r; y += 7) {
      if (x * x + y * y <= r * r) {
        circleGrid.push({ x: x, y: y });
      }
    }
  }
  //shape
  return circleGrid;
}

function drawCircle(radius) {
  let circleGrid = getCircleGrid(radius);
  for (let i of circleGrid) {
    rect(i.x, i.y, 5);
  }
}

frameRate(1);
function draw() {
  clear();
  drawCircle(getRndInteger(50, 200));
}
