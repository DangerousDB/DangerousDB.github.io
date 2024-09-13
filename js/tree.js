const treecanvas = document.getElementById("treejs");
var treectx = treecanvas.getContext("2d");
var treestyle = getComputedStyle(document.getElementById("treejs"));
var treecolor = treestyle.getPropertyValue("--main-color");

var deg_to_rad = Math.PI / 180.0;
var maxDepth = 10;
var a = 20;
var newA = Math.random() * 360;

function lerp(start, end) {
  let diff = end - start;
  let move = diff / 10;
  return start + move;
}

function drawLine(x1, y1, x2, y2) {
  treectx.moveTo(x1, y1);
  treectx.lineTo(x2, y2);
  treectx.closePath();
  treectx.stroke();
}

function drawTree(x1, y1, angle, depth, a) {
  if (depth !== 0) {
    var x2 = x1 + Math.cos(angle * deg_to_rad) * depth * 2.5;
    var y2 = y1 + Math.sin(angle * deg_to_rad) * depth * 2.5;
    treectx.strokeStyle = treecolor;
    treectx.beginPath();

    drawLine(x1, y1, x2, y2);
    drawTree(x2, y2, angle - a, depth - 1, a);
    drawTree(x2, y2, angle + a, depth - 1, a);
  }
}

function treeresizeCanvas() {
  // Get the computed width and height from CSS
  treecanvas.width = treecanvas.clientWidth;
  treecanvas.height = treecanvas.clientHeight;
}
treeresizeCanvas();
window.addEventListener("resize", treeresizeCanvas);

//___________________animation loop ___________________

function treecycle() {
  treectx.clearRect(0, 0, treecanvas.width, treecanvas.height);
  treecolor = treestyle.getPropertyValue("--main-color");
  if (Math.abs(newA - a) < 0.01) {
    newA = Math.random() * 360;
  } else {
    a = lerp(a, newA);
  }

  drawTree(treecanvas.width / 2, treecanvas.height * 0.95, -90, maxDepth, a);
  requestAnimationFrame(treecycle);
}
requestAnimationFrame(treecycle);
