let sketchWidth = document.getElementById("sketch").offsetWidth;
let sketchHeight = document.getElementById("sketch").offsetHeight;

let backgroundImg;

let time = 0;

let route;

let info = "default";
let infoMode = false;

let config = {
  speed: 1000,
  anmountOfWayPoints: 2,
  showWayPoints: false,
};

let mousePos = {
  x: 0,
  y: 0,
};

let tags = [
  {
    name: "IDEE",
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.038,
      y: sketchHeight - sketchHeight * 0.15,
    },
  },
  {
    name: "TRAILER",
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.245,
      y: sketchHeight / 2 - sketchHeight * 0.35,
    },
  },
  {
    name: "PROTOTYP",
    pos: {
      x: sketchWidth - sketchWidth * 0.5,
      y: sketchHeight / 2 - sketchHeight * 0.3,
    },
  },
  {
    name: "FAZIT & BEURTEILUNG",
    pos: {
      x: sketchWidth - sketchWidth * 0.807,
      y: sketchHeight * 0.28,
    },
  },
  {
    name: "TEAM",
    pos: {
      x: sketchWidth * 0.705,
      y: sketchHeight / 2 + sketchHeight * 0.105,
    },
  },
  {
    name: "VISUALISIERUNG",
    pos: {
      x: sketchWidth * 0.166,
      y: sketchHeight - sketchHeight * 0.42,
    },
  },
];

let areas = [
  {
    name: "idee",
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.038,
      y: sketchHeight - sketchHeight * 0.15,
      width: sketchWidth * 0.085,
      height: sketchHeight * 0.05,
    },
    color: [255, 255, 0],
  },
  {
    name: "trailer",
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.245,
      y: sketchHeight / 2 - sketchHeight * 0.35,
      width: sketchWidth * 0.13,
      height: sketchHeight * 0.04,
    },
    color: [255, 0, 0],
  },
  {
    name: "prototype",
    pos: {
      x: sketchWidth - sketchWidth * 0.5,
      y: sketchHeight / 2 - sketchHeight * 0.3,
      //   y: sketchHeight / 2 + sketchHeight * 0.176,
      width: sketchWidth * 0.07,
      height: sketchHeight * 0.128,
    },
    color: [0, 255, 0],
  },
  {
    name: "fazit",
    pos: {
      x: sketchWidth - sketchWidth * 0.807,
      y: sketchHeight * 0.28,
      width: sketchWidth * 0.14,
      height: sketchHeight * 0.3,
    },
    color: [255, 0, 255],
  },
  {
    name: "team",
    pos: {
      x: sketchWidth * 0.705,
      y: sketchHeight / 2 + sketchHeight * 0.105,
      width: sketchWidth * 0.11,
      height: sketchWidth * 0.136,
    },
    color: [0, 0, 255],
  },
  {
    name: "visual",
    pos: {
      x: sketchWidth * 0.166,
      y: sketchHeight - sketchHeight * 0.42,
      //   y: sketchHeight - sketchHeight * 0.125,
      width: sketchWidth * 0.1,
      height: sketchWidth * 0.05,
      //   height: sketchWidth * 0.072,
    },
    color: [255, 125, 0],
  },
];

let inputCanvas = {};

let wayPoints = [
  //FLUR
  {
    name: "idee",
    id: 0,
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.04,
      y: sketchHeight - sketchHeight * 0.19,
    },
  },
  //   {
  //     pos: {
  //       x: sketchWidth / 2 - sketchWidth * 0.12,
  //       y: sketchHeight / 2 + sketchHeight * 0.13,
  //     },
  //   },
  {
    id: 1,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.13,
      y: sketchHeight / 2 + sketchHeight * 0.13,
    },
  },
  {
    id: 2,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.13,
      y: sketchHeight / 2 - sketchHeight * 0.038,
    },
  },
  {
    id: 3,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.02,
      y: sketchHeight / 2 - sketchWidth * 0.065,
    },
  },
  {
    id: 12,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.03,
      y: sketchHeight / 2 + sketchWidth * 0.05,
    },
  },
  {
    id: 4,
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.06,
      y: sketchHeight / 2 + sketchHeight * 0.08,
    },
  },
  //SCHLAFZIMMER
  {
    name: "fazit",
    id: 5,
    pos: {
      x: sketchWidth * 0.2,
      y: sketchHeight * 0.2,
    },
  },
  //WOHNZIMMER

  {
    id: 7,
    pos: {
      x: sketchWidth - sketchWidth * 0.435,
      y: sketchHeight * 0.46,
    },
  },
  {
    name: "prototype",
    id: 8,
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.005,
      y: sketchHeight * 0.2,
    },
  },
  //KÜCHE
  {
    name: "team",
    id: 9,
    pos: {
      x: sketchWidth - sketchWidth * 0.3,
      y: sketchHeight - sketchHeight * 0.4,
    },
  },
  {
    name: "visual",
    id: 10,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.33,
      y: sketchHeight - sketchHeight * 0.41,
    },
  },
  {
    name: "trailer",
    id: 11,
    pos: {
      x: sketchWidth - sketchWidth * 0.25,
      y: sketchHeight * 0.19,
    },
  },
  {
    name: "start",
    id: 6,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.04,
      y: sketchHeight * 0.93,
    },
  },
  {
    id: 13,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.04,
      y: sketchHeight * 0.87,
    },
  },
];

function mouseClicked() {
  move();
}

function move() {
  for (let i = 0; i < areas.length; i++) {
    if (
      mouseX > areas[i].pos.x - areas[i].pos.width / 2 &&
      mouseX < areas[i].pos.x + areas[i].pos.width / 2 &&
      mouseY > areas[i].pos.y - areas[i].pos.height / 2 &&
      mouseY < areas[i].pos.y + areas[i].pos.height / 2
    ) {
      changeArea(areas[i].name);
      info = areas[i].name;
      infoMode = true;
    }
  }
}

function drawCircle() {
  noStroke();
  fill(255, 0, 0);
  circle(mouseX, mouseY, 20);
}

function drawAreas() {
  for (let i = 0; i < areas.length; i++) {
    let c = color(
      Number(areas[i].color[0]),
      Number(areas[i].color[1]),
      Number(areas[i].color[2])
    );
    //fill(c);
    noFill();
    rect(
      areas[i].pos.x,
      areas[i].pos.y,
      areas[i].pos.width,
      areas[i].pos.height
    );
  }
}

function drawTags() {
  for (let i = 0; i < tags.length; i++) {
    let tagNames = tags[i].name;
    fill("ffffff");
    textSize(10);
    textAlign(CENTER);
    text(tagNames, tags[i].pos.x, tags[i].pos.y);
  }
}

function drawBackround() {
  noStroke();

  image(backgroundImg, 0, 0, sketchWidth, sketchHeight);
}

let routes = [];

let player = {
  particles: [],
  pos: {
    x: wayPoints[0].pos.x,
    y: wayPoints[0].pos.y,
  },
  lastWayPoint: {
    name: "",
    pos: {
      x: 0,
      y: 0,
    },
  },
};

function preload() {
  backgroundImg = loadImage("./assets/img/Outputwohnung.png");
  font = loadFont("./assets/fonts/SuisseEDUIntl-Regular.otf");
}

function setup() {
  sketchWidth = document.getElementById("sketch").offsetWidth;
  sketchHeight = document.getElementById("sketch").offsetHeight;
  let renderer = createCanvas(sketchWidth, sketchHeight);
  renderer.parent("sketch");

  rectMode(CENTER);

  for (let i = 0; i < 100; i++) {
    player.particles.push(new Particle(player.pos.x, player.pos.y));
  }
}

function windowResized() {
  sketchWidth = document.getElementById("sketch").offsetWidth;
  sketchHeight = document.getElementById("sketch").offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}

function draw() {
  clear();

  // drawCircle();
  drawBackround();
  drawAreas();
  drawTags();
  drawWayPoints();
  drawPlayer();

  //es muss mit Zeitversatz gearbeitet werden!!!
  if (
    player.pos === route[route.length - 1] &&
    infoMode === true &&
    info === player.lastWayPoint.name
  ) {
    time++;
    if (time > 200) {
      if (info === "fazit") {
        on("overlayFazit");
        off("sketch");
      } else if (info === "idee") {
        // image(ideeImg, 0, 0, sketchWidth, sketchHeight);
        on("overlayIdee");
        off("sketch");
      } else if (info === "prototype") {
        on("overlayPrototype");
        off("sketch");
      } else if (info === "visual") {
        on("overlayVisual");
        off("sketch");
      } else if (info === "team") {
        on("overlayTeam");
        off("sketch");
      } else if (info === "trailer") {
        on("overlayTrailer");
        off("sketch");
      }
    }
  }
}

function on(overlayName) {
  document.getElementById(overlayName).style.display = "block";
}

function off(overlayName) {
  document.getElementById(overlayName).style.display = "none";
}

document.getElementById("close1").addEventListener("click", function () {
  off("overlayIdee");
  info = "default";
  on("sketch");
});

document.getElementById("close2").addEventListener("click", function () {
  off("overlayFazit");
  info = "default";
  on("sketch");
});

document.getElementById("close3").addEventListener("click", function () {
  off("overlayPrototype");
  info = "default";
  on("sketch");
});

document.getElementById("close4").addEventListener("click", function () {
  off("overlayTrailer");
  info = "default";
  on("sketch");
});

document.getElementById("close5").addEventListener("click", function () {
  off("overlayTeam");
  info = "default";
  on("sketch");
});

document.getElementById("close6").addEventListener("click", function () {
  off("overlayVisual");
  info = "default";
  on("sketch");
});

moveTo(wayPoints[12]);

function changeArea(name) {
  for (let i = 0; i < wayPoints.length; i++) {
    if (name === wayPoints[i].name) {
      moveTo(wayPoints[i]);
    }
  }
}

//HIER DIE ANIMATION
function getWayPointPos(ids) {
  let points = [player.pos];
  for (let j = 0; j < ids.length; j++) {
    for (let i = 0; i < wayPoints.length; i++) {
      if (wayPoints[i].id === ids[j]) {
        points.push(wayPoints[i].pos);
      }
    }
  }
  return points;
}

function calcRoute(point) {
  route = [];
  switch (player.lastWayPoint.name) {
    case "start":
      switch (point.name) {
        case "fazit":
          route = getWayPointPos([13, 12, 2, 5]);
          break;
        case "prototype":
          route = getWayPointPos([13, 12, 3, 8]);
          break;
        case "team":
          route = getWayPointPos([13, 12, 4, 9]);
          break;
        case "visual":
          route = getWayPointPos([13, 12, 1, 10]);
          break;
        case "trailer":
          route = getWayPointPos([13, 12, 7, 11]);
          break;
        case "idee":
          route = getWayPointPos([13, 0]);
          break;
        default:
          break;
      }
      break;
    case "idee":
      switch (point.name) {
        case "trailer":
          route = getWayPointPos([12, 7, 11]);
          break;
        case "fazit":
          route = getWayPointPos([12, 2, 5]);
          break;
        case "prototype":
          route = getWayPointPos([12, 3, 8]);
          break;
        case "team":
          route = getWayPointPos([12, 4, 9]);
          break;
        case "visual":
          route = getWayPointPos([12, 1, 10]);
          break;
        default:
          break;
      }
      break;
    case "fazit":
      switch (point.name) {
        case "idee":
          route = getWayPointPos([2, 12, 0]);
          break;
        case "prototype":
          route = getWayPointPos([2, 12, 3, 8]);
          break;
        case "team":
          route = getWayPointPos([2, 12, 4, 9]);
          break;
        case "visual":
          route = getWayPointPos([2, 12, 1, 10]);
          break;
        case "trailer":
          route = getWayPointPos([2, 12, 7, 11]);
          break;
        default:
          break;
      }
      break;
    case "prototype":
      switch (point.name) {
        case "idee":
          route = getWayPointPos([3, 12, 0]);
          break;
        case "fazit":
          route = getWayPointPos([3, 12, 2, 5]);
          break;
        case "team":
          route = getWayPointPos([3, 12, 4, 9]);
          break;
        case "visual":
          route = getWayPointPos([3, 12, 1, 10]);
          break;
        case "trailer":
          route = getWayPointPos([3, 7, 11]);
          break;

        default:
          break;
      }
      break;
    case "team":
      switch (point.name) {
        case "idee":
          route = getWayPointPos([4, 12, 0]);
          break;
        case "fazit":
          route = getWayPointPos([4, 12, 2, 5]);
          break;
        case "prototype":
          route = getWayPointPos([4, 12, 3, 8]);
          break;
        case "visual":
          route = getWayPointPos([4, 12, 1, 10]);
          break;
        case "trailer":
          route = getWayPointPos([4, 12, 7, 11]);
          break;
        default:
          break;
      }
      break;
    case "visual":
      switch (point.name) {
        case "idee":
          route = getWayPointPos([1, 0]);
          break;
        case "fazit":
          route = getWayPointPos([1, 12, 2, 5]);
          break;
        case "prototype":
          route = getWayPointPos([1, 12, 3, 8]);
          break;
        case "team":
          route = getWayPointPos([1, 12, 4, 9]);
          break;
        case "trailer":
          route = getWayPointPos([1, 12, 7, 11]);
          break;
        default:
          break;
      }
    case "trailer":
      switch (point.name) {
        case "idee":
          route = getWayPointPos([7, 12, 0]);
          break;
        case "fazit":
          route = getWayPointPos([7, 2, 5]);
          break;
        case "prototype":
          route = getWayPointPos([7, 12, 3, 8]);
          break;
        case "team":
          route = getWayPointPos([7, 12, 4, 9]);
          break;

        case "visual":
          route = getWayPointPos([7, 12, 1, 10]);
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  route.push(point.pos);
  return route;
}

function moveTo(point) {
  route = calcRoute(point);
  player.lastWayPoint = point;
  console.log(route);

  let i = 0;
  let moving = setInterval(function () {
    if (i < route.length) {
      player.pos = route[i];
      i++;
    } else {
      clearInterval(moving);
    }
  }, config.speed);
}

function drawPlayer() {
  // fill(0, 0, 255);
  // stroke(0, 150, 0);
  // strokeWeight(10);
  // line(player.pos.x, player.pos.y - 30, player.pos.x, player.pos.y + 30);
  // noStroke();
  // circle(player.pos.x, player.pos.y, 30);

  push();
  translate(sketchWidth / 2, sketchHeight / 2);
  fill(0, 0, 255);

  for (let i = 0; i < player.particles.length; i++) {
    player.particles[i].createParticle();
    player.particles[i].moveParticle();
    player.particles[i].setPos(player.pos.x, player.pos.y);
  }
  pop();
}

function drawWayPoints() {
  if (config.showWayPoints) {
    for (let i = 0; i < wayPoints.length; i++) {
      fill(255, 0, 0);
      circle(wayPoints[i].pos.x, wayPoints[i].pos.y, 20);
      fill(0);
      textSize(20);
      text(wayPoints[i].id, wayPoints[i].pos.x, wayPoints[i].pos.y);
    }
  }
}

function drawCircle() {
  noStroke();
  fill(255, 0, 0);
  circle(mousePos.x, mousePos.y, 20);
}
