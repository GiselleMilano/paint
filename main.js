const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let brushSize = 4;
let mouseInside = false;
let optionSelected = 1;
let colorBrush = '#000000';

// Set canvas size and fill canvas rect
function drawCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw a path when stop is not and the mouse is down
function drawing(event) {
  if (!isDrawing) return;
  if (!mouseInside) return;

  ctx.lineTo(event.offsetX, event.offsetY);

  if (optionSelected === 2) {
    ctx.strokeStyle = '#fff';
  } else {
    ctx.strokeStyle = colorBrush;
  }
  ctx.stroke();
}

// Draw a new path when the mouse is already down
function startDrawing() {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = brushSize;

  if (optionSelected === 2) {
    ctx.strokeStyle = '#fff';
  } else {
    ctx.strokeStyle = colorBrush;
  }
}

// Stop function drawing and startDrawing
function stopDrawing() {
  isDrawing = false;
}

// change the size of the brush (eraser or pencil)
function changeSizeBrush(value) {
  brushSize = Number(value);
  document.getElementById('brush-size-info').textContent = brushSize;
}

canvas.onmousedown = function () {
  mouseInside = true;
};

canvas.onmouseup = function () {
  mouseInside = false;
};

// Delete canvas rect and fill a new canvas rect
function removeCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Change pencil to eraser or vice versa
function changeTool(value) {
  optionSelected = Number(value);

  let pencilContainer = document.getElementById('pencil-container');
  let eraserContainer = document.getElementById('eraser-container');

  if (optionSelected === 1) {
    pencilContainer.classList.add('option-selected');
  } else {
    pencilContainer.classList.remove('option-selected');
  }

  if (optionSelected === 2) {
    eraserContainer.classList.add('option-selected');
  } else {
    eraserContainer.classList.remove('option-selected');
  }
}

// Update color piked to input element
function changeColorBrush(value) {
  colorBrush = value;
  document.getElementById('colorBrush').textContent = value;
}

// Save | Download image
function downloadImage(data, filename = 'untitled.png') {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

// Convert canvas to image
function saveCanvas() {
  const dataURL = canvas.toDataURL('image/png', 1.0);
  downloadImage(dataURL, 'my-canvas.png');
}

// EVENTS
window.addEventListener('load', drawCanvas);
document.addEventListener('mousedown', startDrawing);
document.addEventListener('mousemove', drawing);
document.addEventListener('mouseup', stopDrawing);
