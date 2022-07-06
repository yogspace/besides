// Yoff value
var yoff = 0.0;

// Min and max radius of shapes
var min_radius = 20;
var max_radius = 250;

// Increment for angle defining number of points for curveVertex
var angle_incr = 0.1;

// Max intensity of noise
var max_noise = 100;

function setup() {
  createCanvas(600, 600);
}

function wibbern() {
  noiseDetail(1, 0.8);

  noFill();

  for (let radius = min_radius; radius < max_radius; radius += 5) {
    // Stroke alpha
    let alpha = map(radius, min_radius, max_radius, 255, 50);
    stroke(255, alpha);

    beginShape();
    for (let a = 0; a < TWO_PI; a += angle_incr) {
      // Compute xoff and yoff values
      let xoff = cos(a) + 1;
      let offset = map(
        noise(xoff, sin(a) + 1 + yoff),
        0,
        1,
        -max_noise,
        max_noise
      );

      // Multiply the radius by an factor in order to control displacement
      let r = radius + offset * map(radius, min_radius, max_radius, 0.1, 1);
      let x = r * cos(a);
      let y = r * sin(a);

      curveVertex(x, y);
    }
    endShape(CLOSE);

    yoff += 0.001;
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  wibbern();
}

// Stop the loop
