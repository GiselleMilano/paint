const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let brushSize = 4;

function drawCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawing(event) {
  if (!isDrawing) return;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

function startDrawing() {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = brushSize;
}
function stopDrawing() {
  isDrawing = false;
}

window.addEventListener('load', drawCanvas);
window.addEventListener('mousedown', startDrawing);
window.addEventListener('mousemove', drawing);
window.addEventListener('mouseup', stopDrawing);
