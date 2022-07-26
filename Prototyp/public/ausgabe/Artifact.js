class Artifact {
  constructor(x, y, lifeTime) {
    this.x = x;
    this.y = y;
    this.lifeTime = 0;
    this.size = 1;
    this.lifeTimeStart = lifeTime;
  }
  spawn() {
    if (this.lifeTime < this.lifeTimeStart) {
      this.lifeTime = this.lifeTime + 1;
    }
    fill(0, 255, 0);
    circle(this.x, this.y, this.lifeTime / 10);
    console.log(this.lifeTime);
  }
  die() {
    if (this.lifeTime > 0) {
      this.lifeTime = this.lifeTime - 1;
    }
    fill(0, 255, 0);
    this.lifeTime = this.lifeTimeStart;
    circle(this.x, this.y, this.lifeTime / 10);
  }
}
