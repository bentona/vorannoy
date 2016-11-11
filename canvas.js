
let ctx = document.getElementById("canvas").getContext("2d");

let dimX = 1440;
let dimY = 900;
let offset = 0;

random = (n) => Math.floor(Math.random() * n)

distance = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
  //return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2)
}

range = (n) => [...Array(n).keys()]

closest = (point, allPoints, metric) => {
  return allPoints.reduce((acc, item) => {
    if (metric(point, item) < metric(point, acc)){
      return item;
    } else {
      return acc;
    }
  })
}

class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color = randomColor(x/(dimX*2) + y/(dimY*2));
  }
}

class Color{
  constructor(r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

randomColor = (bias) => {
  let flip = Math.floor(random(2))
  let randComp = random(bias * 100)
  let progComp = bias * 155;
  let value = Math.floor(randComp + progComp);
  let partisan = value - flip*value
  return new Color(value*flip, Math.floor(bias*50), value - value*flip);
}

randomPoint = () => new Point(random(dimX), random(dimY))

colorPoint = (x, y, size, color) => {
  ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},150)`;
  ctx.fillRect(x, y, size, size);
}

renderPoint = (pt) => {
  colorPoint(pt.x, pt.y, 5, new Color(0,0,0))
}

doit = (n) => {
  let points = range(n).map((x) => randomPoint())
  range(dimX).map( (x) => {
    range(dimY).map( (y) => {
      let closestPoint = closest(new Point(x, y), points);
      colorPoint(x, y, 1, closestPoint.color)
    })
  })
}

pixerate = (x, y, fcn) => {
  range(x).map( (x1) => {
    range(y).map( (y1) => {
      return fcn(x1, y1)
    }
  })
}

cache = (metric) => {
  pixerate(dimX, dimY, (x, y) => {

  })
}


