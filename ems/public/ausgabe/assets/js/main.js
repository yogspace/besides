let socket = io();

let sketchWidth = document.getElementById("sketch").offsetWidth;
let sketchHeight = document.getElementById("sketch").offsetHeight;
let backgroundImg;
let fazitImg;
let ideeImg;
let prototypeImg;
let visualImg;

let route;

let info = "default";
let infoMode = false;

let config = {
  speed: 1000,
  anmountOfWayPoints: 2,
  showWayPoints: true,
};

let mousePos = {
  x: 0,
  y: 0,
};

let areas = [
  {
    name: "idee",
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.038,
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

let close = [
  {
    name: "close",
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.4,
      y: sketchHeight - sketchHeight * 0.05,
      width: sketchWidth * 0.085,
      height: sketchHeight * 0.05,
    },
    color: [255, 255, 0],
  },
];

let inputCanvas = {};

let wayPoints = [
  //FLUR
  {
    name: "idee",
    id: 0,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.04,
      y: sketchHeight - sketchHeight * 0.18,
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
      x: sketchWidth / 2 - sketchWidth * 0.12,
      y: sketchHeight / 2 - sketchHeight * 0.038,
    },
  },
  {
    id: 2,
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.05,
      y: sketchHeight / 2 - sketchHeight * 0.038,
    },
  },
  {
    id: 3,
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.02,
      y: sketchHeight / 2 + sketchWidth * 0.015,
    },
  },
  {
    id: 12,
    pos: {
      x: sketchWidth / 2 - sketchWidth * 0.032,
      y: sketchHeight / 2 + sketchWidth * 0.12,
    },
  },
  {
    id: 4,
    pos: {
      x: sketchWidth / 2 + sketchWidth * 0.05,
      y: sketchHeight / 2 + sketchHeight * 0.08,
    },
  },
  //SCHLAFZIMMER
  {
    name: "fazit",
    id: 5,
    pos: {
      x: sketchWidth * 0.28,
      y: sketchHeight * 0.35,
    },
  },
  //WOHNZIMMER

  {
    id: 7,
    pos: {
      x: sketchWidth - sketchWidth * 0.2,
      y: sketchHeight * 0.25,
    },
  },
  {
    name: "prototype",
    id: 8,
    pos: {
      x: sketchWidth - sketchWidth * 0.09,
      y: sketchHeight * 0.33,
    },
  },
  //KÜCHE
  {
    name: "team",
    id: 9,
    pos: {
      x: sketchWidth - sketchWidth * 0.35,
      y: sketchHeight - sketchHeight * 0.35,
    },
  },
  {
    name: "visual",
    id: 10,
    pos: {
      x: sketchWidth - sketchWidth * 0.32,
      y: sketchHeight - sketchHeight * 0.22,
    },
  },
  {
    name: "la",
    id: 11,
    pos: {
      x: sketchWidth - sketchWidth * 0.318,
      y: sketchHeight * 0.316,
    },
  },
];

/* function mouseMoved() {
  mousePos = {
    x: mouseX,
    y: mouseY,
  };
  payload = {
    canvas: {
      width: sketchWidth,
      height: sketchHeight,
    },
    mousePos: mousePos,
    area: {
      in: false,
      x: areas[2].pos.x,
      y: areas[2].pos.y,
      width: areas[2].pos.width,
      height: areas[2].pos.height,
    },
  };
  socket.emit("send", payload);

  if (
    mouseX > areas[2].pos.x - areas[2].pos.width / 2 &&
    mouseX < areas[2].pos.x + areas[2].pos.width / 2 &&
    mouseY > areas[2].pos.y - areas[2].pos.height / 2 &&
    mouseY < areas[2].pos.y + areas[2].pos.height / 2
  ) {
    payload.area.in = true;
  } else {
    payload.area.in = false;
  }
  socket.emit("sendAreaLive", payload);
} */

function mouseClicked() {
  move();
  closeTab();
}

function move() {
  for (let i = 0; i < areas.length; i++) {
    if (
      mouseX > areas[i].pos.x - areas[i].pos.width / 2 &&
      mouseX < areas[i].pos.x + areas[i].pos.width / 2 &&
      mouseY > areas[i].pos.y - areas[i].pos.height / 2 &&
      mouseY < areas[i].pos.y + areas[i].pos.height / 2
    ) {
      socket.emit("sendArea", areas[i].name);
      info = areas[i].name;
      infoMode = true;
    }
  }
}

function closeTab() {
  for (let i = 0; i < close.length; i++) {
    if (
      mouseX > close[i].pos.x - close[i].pos.width / 2 &&
      mouseX < close[i].pos.x + close[i].pos.width / 2 &&
      mouseY > close[i].pos.y - close[i].pos.height / 2 &&
      mouseY < close[i].pos.y + close[i].pos.height / 2
    ) {
      info = "default";
      infoMode = false;
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
    fill(c);
    rect(
      areas[i].pos.x,
      areas[i].pos.y,
      areas[i].pos.width,
      areas[i].pos.height
    );
  }
}

function drawClose() {
  for (let i = 0; i < close.length; i++) {
    let c = color(
      Number(close[i].color[0]),
      Number(close[i].color[1]),
      Number(close[i].color[2])
    );
    fill(c);
    rect(
      close[i].pos.x,
      close[i].pos.y,
      close[i].pos.width,
      close[i].pos.height
    );
  }
}

function drawBackround() {
  noStroke();
  background(255, 255, 255);
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
  wayPoint: {
    name: "",
  },
};

function preload() {
  backgroundImg = loadImage("./assets/img/Outputwohnung.png");
  fazitImg = loadImage("./assets/img/fazit.svg");
  ideeImg = loadImage("./assets/img/idee.svg");
  prototypeImg = loadImage("./assets/img/prototype.svg");
  visualImg = loadImage("./assets/img/visual.svg");
}

function setup() {
  sketchWidth = document.getElementById("sketch").offsetWidth;
  sketchHeight = document.getElementById("sketch").offsetHeight;
  let renderer = createCanvas(sketchWidth, sketchHeight);
  renderer.parent("sketch");

  rectMode(CENTER);

  for (let i = 0; i < 100; i++) {
    player.particles.push(new Particle());
  }
}

function windowResized() {
  sketchWidth = document.getElementById("sketch").offsetWidth;
  sketchHeight = document.getElementById("sketch").offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}

function draw() {
  clear();

  drawBackround();
  drawWayPoints();
  // drawCircle();
  drawPlayer();
  drawAreas();

  //es muss mit Zeitversatz gearbeitet werden!!!
  if (player.pos === route[route.length - 1] && infoMode === true) {
  }

  if (info === "fazit") {
    image(fazitImg, 0, 0, sketchWidth, sketchHeight);
    drawClose();
  }
  if (info === "idee") {
    image(ideeImg, 0, 0, sketchWidth, sketchHeight);
  }
  if (info === "prototype") {
    image(prototypeImg, 0, 0, sketchWidth, sketchHeight);
    drawClose();
  }
  if (info === "visual") {
    image(visualImg, 0, 0, sketchWidth, sketchHeight);
    drawClose();
  }
}

moveTo(wayPoints[0]);

socket.on("send", (payload) => {
  mousePos = payload.mousePos;
  inputCanvas = payload.canvas;
  mousePos.x = mousePos.x * (sketchWidth / inputCanvas.width);
  mousePos.y = mousePos.y * (sketchHeight / inputCanvas.height);
});

socket.on("sendArea", (name) => {
  for (let i = 0; i < wayPoints.length; i++) {
    if (name === wayPoints[i].name) {
      moveTo(wayPoints[i]);
    }
  }
});

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
    case "idee":
      switch (point.name) {
        case "fazit":
          route = getWayPointPos([12, 1]);
          break;
        case "prototype":
          route = getWayPointPos([12, 2, 11, 7]);
          break;
        case "team":
          route = getWayPointPos([12, 4]);
          break;
        case "visual":
          route = getWayPointPos([12, 4, 9]);
          break;
        default:
          break;
      }
      break;
    case "fazit":
      switch (point.name) {
        case "idee":
          route = getWayPointPos([1, 12]);
          break;
        case "prototype":
          route = getWayPointPos([1, 2, 11, 7]);
          break;
        case "team":
          route = getWayPointPos([1, 3, 4]);
          break;
        case "visual":
          route = getWayPointPos([1, 4, 9]);
          break;
        default:
          break;
      }
      break;
    case "prototype":
      switch (point.name) {
        case "idee":
          route = getWayPointPos([7, 11, 2, 12]);
          break;
        case "fazit":
          route = getWayPointPos([7, 11, 2, 4]);
          break;
        case "team":
          route = getWayPointPos([7, 11, 2, 3, 4]);
          break;
        case "visual":
          route = getWayPointPos([7, 11, 2, 3, 4, 9]);
          break;
        default:
          break;
      }
      break;
    case "team":
      switch (point.name) {
        case "idee":
          route = getWayPointPos([4, 12]);
          break;
        case "fazit":
          route = getWayPointPos([4, 1]);
          break;
        case "prototype":
          route = getWayPointPos([4, 3, 2, 11, 7]);
          break;
        case "visual":
          route = getWayPointPos([]);
          break;
        default:
          break;
      }
      break;
    case "visual":
      switch (point.name) {
        case "idee":
          route = getWayPointPos([9, 4, 12]);
          break;
        case "fazit":
          route = getWayPointPos([9, 4, 1]);
          break;
        case "prototype":
          route = getWayPointPos([9, 4, 3, 2, 11, 7]);
          break;
        case "team":
          route = getWayPointPos([]);
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

function curveRoute(route, anmount) {
  for (let i = 0; i < anmount; i++) {
    let newRoute = [];
    for (let i = 0; i < route.length; i++) {
      let cP = {};
      newRoute.push(route[i]);
      if (route[i + 1]) {
        let range = sqrt(
          (route[i + 1].x - route[i].x) * (route[i + 1].x - route[i].x) +
            (route[i + 1].y - route[i].y)
        );

        range = map(range, 0, 200, 0.2, 0.8);
        cP.x = (route[i + 1].x + route[i].x) / 2;
        cP.y = (route[i + 1].y + route[i].y) / 2;

        if (route[i + 1].x > route[i].x) {
          cP.x = cP.x - range * (cP.x - route[i].x);
          if (route[i + 1].y > route[i].y) {
            cP.y = cP.y - range * (cP.y - route[i].y);
          } else if (route[i + 1].y < route[i].y) {
            cP.y = cP.y + range * (cP.y - route[i].y);
          } else {
            cP.y = cP.y;
          }
        } else if (route[i + 1].x < route[i].x) {
          cP.x = cP.x + range * (cP.x - route[i].x);
          if (route[i + 1].y > route[i].y) {
            cP.y = cP.y - range * (cP.y - route[i].y);
          } else if (route[i + 1].y < route[i].y) {
            cP.y = cP.y + range * (cP.y - route[i].y);
          } else {
            cP.y = cP.y;
          }
        } else {
          cP.x = cP.x;
        }

        newRoute.push(cP);
      }
    }
    route = newRoute;
  }
  console.log(route);
  return route;
}

function moveTo(point) {
  // let route = curveRoute(calcRoute(point), config.anmountOfWayPoints);
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
