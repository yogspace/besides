class Particle {
  constructor() {
    this.x = random(-15, 15);
    this.y = random(-15, 15);
    this.r = random(1, 3);
    this.xConstSpeed = random(-1, 1);
    this.yConstSpeed = random(-1, 1);

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
      this.xConstSpeed *= -1;
      this.yConstSpeed *= -1;
    }
    if (
      pow(this.x - (player.pos.x - sketchWidth / 2), 2) +
        pow(this.y - (player.pos.y - sketchHeight / 2), 2) >
      pow(this.radius, 2)
    ) {
      this.xEasingSpeed =
        (player.pos.x - sketchWidth / 2 - this.x) * this.easing;
      this.yEasingSpeed =
        (player.pos.y - sketchHeight / 2 - this.y) * this.easing;
    }

    this.x += this.xConstSpeed + this.xEasingSpeed;
    this.y += this.yConstSpeed + this.yEasingSpeed;
  }
}
