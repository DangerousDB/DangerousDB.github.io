const Sierpinskicanvas = document.getElementById("Sierpinski");
const Sierpinskictx = Sierpinskicanvas.getContext("2d");

var Sierpinskistyle = getComputedStyle(document.getElementById("Sierpinski"));
var Sierpinskicolor = Sierpinskistyle.getPropertyValue("--main-color");

let maxPoints = 500;
let maxHeight = (Sierpinskicanvas.height * 99) / 100;
let minHeight = Sierpinskicanvas.height / 100;
let maxWidth = (Sierpinskicanvas.width * 99) / 100;
let minWidth = Sierpinskicanvas.width / 100;
let HeightSize = maxHeight - minHeight;
let WidthSize = maxWidth - minWidth;

let size = Math.min(WidthSize, HeightSize);
let sideLength = (size * 2) / Math.sqrt(3);
let midPoint = Sierpinskicanvas.width / 2;
let pointOffset = sideLength / 2;

let pointTwo = [midPoint, minHeight];
let pointThree = [midPoint - pointOffset, maxHeight];
let pointOne = [midPoint + pointOffset, maxHeight];
let Sierpinskipoints = [];
let Sierpinskix = 0;
let Sierpinskiy = 0;

Sierpinskictx.beginPath();
Sierpinskictx.moveTo(pointOne[0], pointOne[1]);
Sierpinskictx.lineTo(pointTwo[0], pointTwo[1]);
Sierpinskictx.lineTo(pointThree[0], pointThree[1]);
Sierpinskictx.lineTo(pointOne[0], pointOne[1]);
while (!Sierpinskictx.isPointInPath(Sierpinskix, Sierpinskiy)) {
  Sierpinskix = (Math.random() * Sierpinskicanvas.width * 3) / 5 + pointTwo[0];
  Sierpinskiy = (Math.random() * Sierpinskicanvas.height * 3) / 5 + pointOne[1];
}
Sierpinskictx.closePath();

function SierpinskiresizeCanvas() {
  // Get the computed width and height from CSS
  Sierpinskicanvas.width = Sierpinskicanvas.clientWidth;
  Sierpinskicanvas.height = Sierpinskicanvas.clientHeight;
}
SierpinskiresizeCanvas();
window.addEventListener("resize", SierpinskiresizeCanvas);

//___________________animation loop ___________________

function Sierpinskicycle() {
  Sierpinskicolor = Sierpinskistyle.getPropertyValue("--main-color");
  Sierpinskictx.fillStyle = Sierpinskicolor;
  Sierpinskictx.clearRect(
    0,
    0,
    Sierpinskicanvas.width,
    Sierpinskicanvas.height
  );

  Sierpinskictx.beginPath();
  Sierpinskictx.arc(pointOne[0], pointOne[1], 1, 0, 2 * Math.PI);
  Sierpinskictx.fill();

  Sierpinskictx.beginPath();
  Sierpinskictx.arc(pointTwo[0], pointTwo[1], 1, 0, 2 * Math.PI);
  Sierpinskictx.fill();

  Sierpinskictx.beginPath();
  Sierpinskictx.arc(pointThree[0], pointThree[1], 1, 0, 2 * Math.PI);
  Sierpinskictx.fill();

  for (i = 0; i < Sierpinskipoints.length; i++) {
    let point = Sierpinskipoints[i];
    // console.log(point);

    Sierpinskictx.beginPath();
    Sierpinskictx.arc(point[0], point[1], 0.5, 0, 2 * Math.PI);
    Sierpinskictx.fill();
  }

  if (Sierpinskipoints.length > maxPoints) {
    for (let i = 0; i < (Math.random() * maxPoints) / 10; i++) {
      Sierpinskipoints.shift();
    }
  }

  switch (Math.floor(Math.random() * 3)) {
    case 0:
      Sierpinskix = (Sierpinskix + pointOne[0]) / 2;
      Sierpinskiy = (Sierpinskiy + pointOne[1]) / 2;
      break;
    case 1:
      Sierpinskix = (Sierpinskix + pointTwo[0]) / 2;
      Sierpinskiy = (Sierpinskiy + pointTwo[1]) / 2;
      break;
    case 2:
      Sierpinskix = (Sierpinskix + pointThree[0]) / 2;
      Sierpinskiy = (Sierpinskiy + pointThree[1]) / 2;
      break;
    default:
  }
  Sierpinskipoints.push([Sierpinskix, Sierpinskiy]);

  requestAnimationFrame(Sierpinskicycle);
}
requestAnimationFrame(Sierpinskicycle);
