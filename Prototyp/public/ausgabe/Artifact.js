class Artifact {
  constructor(x, y, lifeTime) {
    this.x = x;
    this.y = y;
    this.lifeTime = 0;
    this.size = 1;
    this.lifeTimeStart = lifeTime;
  }

  display() {
    fill(255, 255, 255, 100);
    circle(this.x, this.y, this.lifeTime / 7.5);
  }

  grow() {
    if (this.lifeTime < this.lifeTimeStart) {
      this.lifeTime = this.lifeTime + 1.5;
    }
  }
  shrink() {
    if (this.lifeTime > 0) {
      this.lifeTime = this.lifeTime - 0.5;
    }
  }
}
