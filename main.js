const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let optionSelected = 1;

// Set canvas size and fill canvas rect
function drawCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.fillStyle = document.getElementById('color-canvas').value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Return true if mouse pos is inside the canvas. Also if return false, stop the path
function isMouseInsideCanvas(event) {
  canvasPosX = event.pageX - canvas.offsetLeft;
  canvasPosY = event.pageY - canvas.offsetTop;
  if (
    canvasPosX >= 0 &&
    canvasPosX <= 800 &&
    canvasPosY >= 0 &&
    canvasPosY <= 600
  ) {
    return true;
  }
  isDrawing = false;
  return false;
}

// Draw a path when stop is not and the mouse is down
function drawing(event) {
  if (!isDrawing) return;
  if (!isMouseInsideCanvas(event)) return;

  ctx.lineTo(event.offsetX, event.offsetY);

  if (optionSelected === 2) {
    ctx.strokeStyle = '#fff';
  } else {
    ctx.strokeStyle = document.getElementById('color-brush').value;
  }
  ctx.stroke();
}

// Draw a new path when the mouse is already down
function startDrawing(event) {
  if (!isMouseInsideCanvas(event)) return;
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = document.getElementById('brush-size').value;

  if (optionSelected === 2) {
    ctx.strokeStyle = '#fff';
  } else {
    ctx.strokeStyle = document.getElementById('color-brush').value;
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
  document.getElementById('color-brush').value = value;
}

// Update color piked to input element
function changeColorCanvas(value) {
  document.getElementById('color-canvas').value = value;
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
