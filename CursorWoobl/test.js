
let x1 = 1;
let y1 = 1;
let x = 1;
let y = 1;
let x2 = 2;
let y2 = 2;

let easing = 0.1;
let easing2 = 0.12;


function draw() {
  background(0, 0, 0);
  let targetX = mouseX;
  let dx = targetX - x;
  let dx2 = targetX - x2;
  x1 += dx*0;
  x += dx * easing;
  x2 += dx2 * easing2;

  let targetY = mouseY;
  let dy = targetY - y;
  let dy2 = targetY - y2;
  y1 += dy *0;
  y += dy * easing;
  y2 += dy2 * easing2;


  ellipse(x1, y1, 20, 20);
  ellipse(x, y, 20, 20);
  ellipse(x2, y2, 20, 20);
}
