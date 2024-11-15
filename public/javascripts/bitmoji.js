
const canvas = document.getElementById('bitmojiCanvas');
const ctx = canvas.getContext('2d');


let penColor = '#000000';
let penThickness = 5;
let penType = 'pencil';
let drawing = false;
let activeSticker = null;  
let stickers = [];         
let isDragging = false;
let currentText = '';      
let textFontSize = 20;
let textColor = '#000000';
let textPosX = 100;
let textPosY = 100;


const bgColorPicker = document.getElementById('bgColorPicker');
bgColorPicker.addEventListener('input', function() {
  canvas.style.backgroundColor = this.value;
});


const penColorPicker = document.getElementById('penColorPicker');
penColorPicker.addEventListener('input', function() {
  penColor = this.value;
});


const penThicknessInput = document.getElementById('penThickness');
penThicknessInput.addEventListener('input', function() {
  penThickness = this.value;
});

const penTypeSelect = document.getElementById('penType');
penTypeSelect.addEventListener('change', function() {
  penType = this.value;
});

canvas.addEventListener('mousedown', function(e) {
  if (penType === 'text') return; 

  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});


canvas.addEventListener('mousemove', function(e) {
  if (!drawing) return;

  if (penType === 'eraser') {
    ctx.clearRect(e.offsetX - penThickness / 2, e.offsetY - penThickness / 2, penThickness, penThickness);
  } else {
    ctx.lineWidth = penThickness;
    ctx.strokeStyle = penColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});


canvas.addEventListener('mouseup', function() {
  drawing = false;
});


const clearCanvasBtn = document.getElementById('clearCanvas');
clearCanvasBtn.addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});


const saveBitmojiBtn = document.getElementById('saveBitmoji');
saveBitmojiBtn.addEventListener('click', function() {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'coffee-bitmoji.png';
  link.click();
});


const stickerItems = document.querySelectorAll('.sticker-item img');
stickerItems.forEach(sticker => {
  sticker.addEventListener('click', function() {
    const stickerImage = new Image();
    stickerImage.src = this.src;
    
    stickerImage.onload = function() {
      const stickerObj = {
        image: stickerImage,
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        isDragging: false
      };
      stickers.push(stickerObj);
      drawStickers();
    };
  });
});

// Draw stickers on the canvas
function drawStickers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  stickers.forEach(sticker => {
    ctx.drawImage(sticker.image, sticker.x, sticker.y, sticker.width, sticker.height);
  });
}

// Detect sticker drag start
canvas.addEventListener('mousedown', function(e) {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  stickers.forEach(sticker => {
    if (mouseX > sticker.x && mouseX < sticker.x + sticker.width &&
        mouseY > sticker.y && mouseY < sticker.y + sticker.height) {
      activeSticker = sticker;
      sticker.isDragging = true;
    }
  });
});

// Detect sticker drag movement
canvas.addEventListener('mousemove', function(e) {
  if (activeSticker && activeSticker.isDragging) {
    activeSticker.x = e.offsetX - activeSticker.width / 2;
    activeSticker.y = e.offsetY - activeSticker.height / 2;
    drawStickers();
  }
});

// Detect sticker drag end
canvas.addEventListener('mouseup', function() {
  if (activeSticker) {
    activeSticker.isDragging = false;
    activeSticker = null;
  }
});

// Handle text input
const textInput = document.getElementById('textInput');
textInput.addEventListener('input', function() {
  currentText = this.value;
});

// Handle text font size change
const textSizeInput = document.getElementById('textSize');
textSizeInput.addEventListener('input', function() {
  textFontSize = this.value;
});

// Handle text color change
const textColorPicker = document.getElementById('textColorPicker');
textColorPicker.addEventListener('input', function() {
  textColor = this.value;
});

// Add text to canvas
const addTextBtn = document.getElementById('addText');
addTextBtn.addEventListener('click', function() {
  ctx.fillStyle = textColor;
  ctx.font = `${textFontSize}px poppins`;
  ctx.fillText(currentText, textPosX, textPosY);

  // Make text draggable
  let isTextDragging = false;

  canvas.addEventListener('mousedown', function(e) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    if (mouseX > textPosX && mouseX < textPosX + ctx.measureText(currentText).width &&
        mouseY > textPosY - textFontSize && mouseY < textPosY) {
      isTextDragging = true;
    }
  });

  canvas.addEventListener('mousemove', function(e) {
    if (isTextDragging) {
      textPosX = e.offsetX;
      textPosY = e.offsetY;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      drawStickers();  // Redraw stickers
      ctx.fillStyle = textColor;
      ctx.font = `${textFontSize}px Arial`;
      ctx.fillText(currentText, textPosX, textPosY); // Redraw text
    }
  });

  canvas.addEventListener('mouseup', function() {
    isTextDragging = false;
  });
});

// Close modal
// const closeModalBtn = document.getElementById('closeModal');
// closeModalBtn.addEventListener('click', function() {
//   const bitmojiModal = document.getElementById('bitmojiModal');
//   bitmojiModal.classList.add('hidden');
// });

// // Open modal
// const bitmojiBtn = document.getElementById('bitmojiBtn');
// bitmojiBtn.addEventListener('click', function() {
//   const bitmojiModal = document.getElementById('bitmojiModal');
//   bitmojiModal.classList.remove('hidden');
// });
