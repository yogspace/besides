class Particle {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.x = random(-15, 15);
    this.y = random(-15, 15);
    this.r = random(1, 3);
    this.xConstSpeed = random(-1.5, 1.5);
    this.yConstSpeed = random(-1.5, 1.5);

    this.easing = random(0.01, 0.03);
    this.xEasingSpeed = 0;
    this.yEasingSpeed = 0;
    this.radius = 20;
    this.display = true;
  }

  createParticle() {
    noStroke();
    if (this.display) {
      circle(this.x, this.y, this.r);
    }
  }

  showParticle(bool) {
    if (!bool) {
      this.display = false;
    } else {
      this.display = true;
    }
  }

  moveParticle() {
    if (this.x * this.x + this.y * this.y > this.radius * this.radius) {
      this.xConstSpeed *= random(-1.5, 1.5);
      this.yConstSpeed *= random(-1.5, 1.5);
    }
    if (
      pow(this.x - (this.xPos - sketchWidth / 2), 2) +
        pow(this.y - (this.yPos - sketchHeight / 2), 2) >
      pow(this.radius, 2)
    ) {
      // this.easing = random(0.03, 0.08);
      this.xEasingSpeed =
        (this.xPos - sketchWidth / 2 - this.x) * random(0.03, 0.08);
      this.yEasingSpeed =
        (this.yPos - sketchHeight / 2 - this.y) * random(0.03, 0.08);
    }

    this.x += this.xConstSpeed + this.xEasingSpeed;
    this.y += this.yConstSpeed + this.yEasingSpeed;
  }
  setPos(x, y) {
    this.xPos = x;
    this.yPos = y;
  }
}
