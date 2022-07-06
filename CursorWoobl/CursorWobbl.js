let mousePositions = [{ x: 0, y: 0 }];
let mpTimer = 0;

function calculatePos() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let position = {
      x: mouseX,
      y: mouseY,
    };
    mpTimer++;

    if (mpTimer > 100) {
      mousePositions.push(position);
      mpTimer = 0;
    }

    if (mousePositions > 100) {
      mousePositions.unshift();
    }
  }
}

function draw() {
  clear();
  background(0, 0, 0);
  ellipse(mousePositions[0].x, mousePositions[0].y, 20, 20);
  calculatePos();

  // console.log(mousePositions);
  console.log(mpTimer);
}
