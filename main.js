const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let brushSize = 4;
let mouseInside = false;
let optionSelected = 1;
let colorBrush = '#000000';

function drawCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

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

function stopDrawing() {
  isDrawing = false;
}

function onSizeBrushChange(value) {
  brushSize = Number(value);
  document.getElementById('brush-size-info').textContent = value;
}

canvas.onmousedown = function () {
  mouseInside = true;
};

canvas.onmouseup = function () {
  mouseInside = false;
};

function removeCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function optionChange(value) {
  optionSelected = Number(value);

  let pencilContainer = document.getElementById('pencil-container');
  let eraserContainer = document.getElementById('eraser-container');
  let clearContainer = document.getElementById('clear-container');

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

  if (optionSelected === 3) {
    removeCanvas();
  }
}

function onColorBrushChange(value) {
  colorBrush = value;
  document.getElementById('colorBrush').textContent = value;
}

window.addEventListener('load', drawCanvas);
window.addEventListener('mousedown', startDrawing);
window.addEventListener('mousemove', drawing);
window.addEventListener('mouseup', stopDrawing);
