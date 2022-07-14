let socket = io();

let sketchWidth = document.getElementById("sketch").offsetWidth;
let sketchHeight = document.getElementById("sketch").offsetHeight;
let backgroundImg;

let config = {
  speed: 1000,
  anmountOfWayPoints: 2,
  showWayPoints: false,
};

let mousePos = {
  x: 0,
  y: 0,
};
let inputCanvas = {};

let wayPoints = [
  //FLUR
  {
    name: "door",
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
    name: "bed",
    id: 5,
    pos: {
      x: sketchWidth * 0.28,
      y: sketchHeight * 0.35,
    },
  },
  //WOHNZIMMER
  {
    name: "livearea",
    id: 6,
    pos: {
      x: sketchWidth - sketchWidth * 0.26,
      y: sketchHeight * 0.38,
    },
  },
  {
    id: 7,
    pos: {
      x: sketchWidth - sketchWidth * 0.2,
      y: sketchHeight * 0.25,
    },
  },
  {
    name: "desk",
    id: 8,
    pos: {
      x: sketchWidth - sketchWidth * 0.09,
      y: sketchHeight * 0.33,
    },
  },
  //KÜCHE
  {
    name: "table",
    id: 9,
    pos: {
      x: sketchWidth - sketchWidth * 0.35,
      y: sketchHeight - sketchHeight * 0.35,
    },
  },
  {
    name: "kitchen",
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
  backgroundImg = loadImage("./img/Outputwohnung.png");
}

function setup() {
  sketchWidth = document.getElementById("sketch").offsetWidth;
  sketchHeight = document.getElementById("sketch").offsetHeight;
  let renderer = createCanvas(sketchWidth, sketchHeight);
  renderer.parent("sketch");

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
  let route = [];
  switch (player.lastWayPoint.name) {
    case "door":
      switch (point.name) {
        case "bed":
          route = getWayPointPos([12, 1]);
          break;
        case "livearea":
          route = getWayPointPos([12, 2]);
          break;
        case "desk":
          route = getWayPointPos([12, 2, 11, 7]);
          break;
        case "table":
          route = getWayPointPos([12, 4]);
          break;
        case "kitchen":
          route = getWayPointPos([12, 4, 9]);
          break;
        default:
          break;
      }
      break;
    case "bed":
      switch (point.name) {
        case "door":
          route = getWayPointPos([1, 12]);
          break;
        case "livearea":
          route = getWayPointPos([1, 2]);
          break;
        case "desk":
          route = getWayPointPos([1, 2, 11, 7]);
          break;
        case "table":
          route = getWayPointPos([1, 3, 4]);
          break;
        case "kitchen":
          route = getWayPointPos([1, 4, 9]);
          break;
        default:
          break;
      }
      break;
    case "livearea":
      switch (point.name) {
        case "door":
          route = getWayPointPos([2, 12]);
          break;
        case "bed":
          route = getWayPointPos([2, 1]);
          break;
        case "desk":
          route = getWayPointPos([7]);
          break;
        case "table":
          route = getWayPointPos([2, 3, 4]);
          break;
        case "kitchen":
          route = getWayPointPos([2, 3, 4, 9]);
          break;
        default:
          break;
      }
      break;
    case "desk":
      switch (point.name) {
        case "door":
          route = getWayPointPos([7, 11, 2, 12]);
          break;
        case "bed":
          route = getWayPointPos([7, 11, 2, 4]);
          break;
        case "livearea":
          route = getWayPointPos([7]);
          break;
        case "table":
          route = getWayPointPos([7, 11, 2, 3, 4]);
          break;
        case "kitchen":
          route = getWayPointPos([7, 11, 2, 3, 4, 9]);
          break;
        default:
          break;
      }
      break;
    case "table":
      switch (point.name) {
        case "door":
          route = getWayPointPos([4, 12]);
          break;
        case "bed":
          route = getWayPointPos([4, 1]);
          break;
        case "livearea":
          route = getWayPointPos([4, 3, 2]);
          break;
        case "desk":
          route = getWayPointPos([4, 3, 2, 11, 7]);
          break;
        case "kitchen":
          route = getWayPointPos([]);
          break;
        default:
          break;
      }
      break;
    case "kitchen":
      switch (point.name) {
        case "door":
          route = getWayPointPos([9, 4, 12]);
          break;
        case "bed":
          route = getWayPointPos([9, 4, 1]);
          break;
        case "livearea":
          route = getWayPointPos([9, 4, 3, 2]);
          break;
        case "desk":
          route = getWayPointPos([9, 4, 3, 2, 11, 7]);
          break;
        case "table":
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
  let route = calcRoute(point);
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

socket.on("sendAreaLive", (payload) => {
  if (player.lastWayPoint.name === "livearea") {
    if (payload.area.in) {
      mapLiveArea(payload);
    } else {
      for (let i = 0; i < wayPoints.length; i++) {
        if (wayPoints[i].name === "livearea") {
          wayPoints[i].pos = player.pos;
          // player.pos = wayPoints[i].pos;
        }
      }
    }
  }
});

function mapLiveArea(area) {
  let verhaeltnis = {
    x: sketchWidth / inputCanvas.width,
    y: sketchHeight / inputCanvas.height,
  };

  let pos = {
    x:
      map(
        area.mousePos.y,
        area.area.y - area.area.height / 2,
        area.area.y + area.area.height / 2,
        verhaeltnis.x * area.area.height,
        0
      ) +
      (sketchWidth - sketchWidth * 0.318),
    y:
      map(
        area.mousePos.x,
        area.area.x - area.area.width / 2,
        area.area.x + area.area.width / 2,
        0,
        verhaeltnis.y * area.area.width
      ) +
      sketchHeight * 0.316,
  };
  player.pos = pos;
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

function drawBackround() {
  noStroke();
  // background(0, 0, 0);
  background(255, 255, 255);
  image(backgroundImg, 0, 0, sketchWidth, sketchHeight);
}
