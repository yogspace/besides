// https://p5js.org/examples/simulate-particles.html
class Particle {
  constructor() {
    this.pos = p5.Vector.random2D();
    this.r = random(1, 5);

    this.speedConst = p5.Vector.random2D().mult(0.5);
    this.speedEasing = createVector(0, 0);

    this.easing = random(0.04, 0.05);
    this.radius = random(15, 25);
    this.display = true;
  }

  createParticle() {
    noStroke();
    if (this.display) {
      circle(this.pos.x, this.pos.y, this.r);
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
    let mousePos = createVector(
      player.pos.x - sketchWidth / 2,
      player.pos.y - sketchHeight / 2
    );
    if (mousePos.dist(this.pos) > this.radius) {
      // if particle is too far from the mouse position
      this.speedConst.mult(-1); // change direction of constant speed component
      this.speedConst.rotate(random(-PI / 3, PI / 3));
      this.speedEasing = mousePos.sub(this.pos).mult(this.easing); // Add speed component in direction of mouse position
    } else {
      this.speedEasing = createVector(0, 0); //reset easing speed if particel is in range
    }

    this.pos = this.pos.add(this.speedEasing).add(this.speedConst);
  }
}
