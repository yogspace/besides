class Particle {
  constructor() {
    this.x = random(-70, 70);
    this.y = random(-70, 70);
    this.r = random(1, 7);
    this.xConstSpeed = random(-1, 1);
    this.yConstSpeed = random(-1, 1);

    this.easing = random(0.01, 0.03);
    this.xEasingSpeed = 0;
    this.yEasingSpeed = 0;
    this.radius = 100;
  }

  createParticle() {
    noStroke();
    circle(this.x, this.y, this.r);
  }

  moveParticle() {
    if (this.x * this.x + this.y * this.y > this.radius * this.radius) {
      this.xConstSpeed *= -1;
      this.yConstSpeed *= -1;
    }
    if (
      pow(this.x - (mouseX - 200), 2) + pow(this.y - (mouseY - 200), 2) >
      pow(this.radius, 2)
    ) {
      this.xEasingSpeed = (mouseX - 200 - this.x) * this.easing;
      this.yEasingSpeed = (mouseY - 200 - this.y) * this.easing;
    }

    this.x += this.xConstSpeed + this.xEasingSpeed;
    this.y += this.yConstSpeed + this.yEasingSpeed;
  }
}

let particles = [];

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(220);
  translate(width / 2, height / 2);

  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
  }
}
