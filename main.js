const canvas = document.createElement('canvas');
const margin = 10;
const cellSize = 50;
const gridSize = 10;

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.obstacle = false;
        this.start = false;
        this.end = false;
    }
}

const nodes = Array(gridSize);
for (let i = 0; i < nodes.length; i++) {
    nodes[i] = Array(gridSize);
    for (let j = 0; j < nodes[i].length; j++) {
        nodes[i][j] = new Node(i, j);
    }
}

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

    console.log(getNode(xPos, yPos));
});

function getNode (xPos, yPos) {
    xPos -= margin;
    yPos -= margin;
    
    xCoord = Math.floor(xPos/cellSize);
    yCoord = Math.floor(yPos/cellSize);

    console.log(`xCoord = ${xCoord}, yCoord = ${yCoord}`);
    if (xCoord < 0 || yCoord < 0 || xCoord >= gridSize || yCoord >= gridSize) {
        return null;
    } else {
        return nodes[xCoord][yCoord];
    }
}