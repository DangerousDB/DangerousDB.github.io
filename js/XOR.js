const XORcanvas = document.getElementById("90XOR");
const XORctx = XORcanvas.getContext("2d");
var XORstyle = getComputedStyle(document.getElementById("90XOR"));
var XORcolor = XORstyle.getPropertyValue("--main-color");
var XORbgcolor = XORstyle.getPropertyValue("--bg-color");

let num = 0;
let n = window.innerHeight;
let w = window.innerWidth;
let original = [];
let secondary = [];
let orientation = 4;
let reverse = false;

let antX, antY;
let foreimageData = XORctx.createImageData(w, n);
let backimageData = XORctx.createImageData(w, n);

let y = 0;

//creates each box
for (i = 0; i < w; i++) {
  if (Math.random() > 0.5) {
    original.push(1);
  } else {
    original.push(0);
  }
  secondary.push(1);
}
// console.log(original);

function changePixel(x, y, r, g, b, br, bg, bb) {
  // Modify pixel data
  foreimageData.data[y * (foreimageData.width * 4) + x * 4] = r; // R value
  foreimageData.data[y * (foreimageData.width * 4) + x * 4 + 1] = g; // G value
  foreimageData.data[y * (foreimageData.width * 4) + x * 4 + 2] = b; // B value
  foreimageData.data[y * (foreimageData.width * 4) + x * 4 + 3] = 255; // A value

  backimageData.data[y * (backimageData.width * 4) + x * 4] = br; // R value
  backimageData.data[y * (backimageData.width * 4) + x * 4 + 1] = bg; // G value
  backimageData.data[y * (backimageData.width * 4) + x * 4 + 2] = bb; // B value
  backimageData.data[y * (backimageData.width * 4) + x * 4 + 3] = 255; // A values
}

function XOR(a, b) {
  return (a || b) && !(a && b);
}

function rgbComponents(color) {
  return color.replace(/[^\d,]/g, "").split(",");
}

function XORresizeCanvas() {
  // Get the computed width and height from CSS
  XORcanvas.width = XORcanvas.clientWidth;
  XORcanvas.height = XORcanvas.clientHeight;
}
XORresizeCanvas();
window.addEventListener("resize", XORresizeCanvas);

//___________________animation loop ___________________

function XORcycle() {
  //clears screen
  // console.log(color)

  prev = XORcolor;
  XORcolor = XORstyle.getPropertyValue("--main-color");
  XORbgcolor = XORstyle.getPropertyValue("--bg-color");
  if (prev != XORcolor) {
    reverse = !reverse;
  }
  frgb = rgbComponents(XORcolor);
  brgb = rgbComponents(XORbgcolor);

  if (reverse) {
    // resetColors();
    XORctx.putImageData(backimageData, 0, 0);
    frgb = rgbComponents(XORbgcolor);
    brgb = rgbComponents(XORcolor);
  } else {
    XORctx.putImageData(foreimageData, 0, 0);
  }

  y++;
  if (y >= XORcanvas.height) {
    for (let i = 0; i < secondary.length; i++) {
      if (XOR(original[i + 1], original[i - 1])) {
        secondary[i] = 1;

        changePixel(i, 0, frgb[0], frgb[1], frgb[2], brgb[0], brgb[1], brgb[2]);
      } else {
        secondary[i] = 0;
        changePixel(i, 0, brgb[0], brgb[1], brgb[2], frgb[0], frgb[1], frgb[2]);
      }
    }
    y = 0;
  } else {
    for (let i = 0; i < secondary.length; i++) {
      if (XOR(original[i + 1], original[i - 1])) {
        secondary[i] = 1;

        changePixel(i, y, frgb[0], frgb[1], frgb[2], brgb[0], brgb[1], brgb[2]);
      } else {
        secondary[i] = 0;
        changePixel(i, y, brgb[0], brgb[1], brgb[2], frgb[0], frgb[1], frgb[2]);
      }
    }
  }

  for (let i = 0; i < secondary.length; i++) {
    original[i] = secondary[i];
  }

  requestAnimationFrame(XORcycle);
}
requestAnimationFrame(XORcycle);
