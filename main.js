const canvas = document.createElement('canvas');
const margin = 10;
const cellSize = 50;
const gridSize = 10;
const nodes = [gridSize];

canvas.width = canvas.height = margin * 2 + cellSize * gridSize;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#000000';
ctx.lineWidth = 2;

for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        ctx.strokeRect(margin + i*cellSize, margin + j*cellSize, cellSize, cellSize);
    }
}

canvas.addEventListener('mousedown', (e) => {
    var xPos = e.clientX;
    var yPos = e.clientY;

    getCell(xPos, yPos);    
});

function getCell (xPos, yPos) {
    xPos -= margin;
    yPos -= margin;
    
    xCoord = Math.floor(xPos/cellSize);
    yCoord = Math.floor(yPos/cellSize);

    console.log(`xCoord = ${xCoord}, yCoord = ${yCoord}`);
}