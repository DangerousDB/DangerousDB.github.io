const canvas = document.getElementById("treejs");
const ctx = canvas.getContext("2d");
width = canvas.width;
height = canvas.height;
// canvas.width = window.innerHeight;
// canvas.height = window.innerHeight;

var deg_to_rad = Math.PI / 180.0;
var maxDepth = 10;
var a = 20;
var style = getComputedStyle(document.getElementById("treejs"));
var color = style.getPropertyValue("--main-color");

function drawLine(x1, y1, x2, y2) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}

function lerp(a, b, x) {
  return a + (b - a) * x;
}

function drawTree(x1, y1, angle, depth, a) {
  if (depth !== 0) {
    var x2 = x1 + Math.cos(angle * deg_to_rad) * depth * 2.5;
    var y2 = y1 + Math.sin(angle * deg_to_rad) * depth * 2.5;
    ctx.strokeStyle = color;
    ctx.beginPath();

    drawLine(x1, y1, x2, y2);
    drawTree(x2, y2, angle - a, depth - 1, a);
    drawTree(x2, y2, angle + a, depth - 1, a);
  }
}


window.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "ArrowRight":
      a += 0.5;
      a = a % 180;
      break;
    case "ArrowLeft":
      if (a > 0) {
        a -= 0.5;
      }
      break;
  }
});

//___________________animation loop ___________________

function cycle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  color = style.getPropertyValue("--main-color");
  drawTree(canvas.width / 2, canvas.height * 0.95, -90, maxDepth, a);
  requestAnimationFrame(cycle);
}
requestAnimationFrame(cycle);
