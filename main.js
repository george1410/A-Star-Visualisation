const margin = 10;
const cellSize = 50;
const gridSize = 10;

// define the node class.
class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.obstacle = false;
        this.start = false;
        this.end = false;
    }
}

// populate a 2d array with nodes.
const nodes = Array(gridSize);
for (let i = 0; i < nodes.length; i++) {
    nodes[i] = Array(gridSize);
    for (let j = 0; j < nodes[i].length; j++) {
        nodes[i][j] = new Node(i, j);
    }
}
var startNode = null;
var endNode = null;

// create the canvas element and add it to the page.
const canvas = document.createElement('canvas');
canvas.width = canvas.height = margin * 2 + cellSize * gridSize;
canvas.style = 'display: block';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// create a button and add it to the page.
const button = document.createElement('button');
button.textContent = 'Find Path!';
document.body.appendChild(button);
button.addEventListener('click', (e) => {
    if (isValid()) {
        //findPath();
        console.log("valid!");
    }
});

// build error messages.
const startError = document.createElement('p');
startError.textContent = 'You need to set a start position! (Hold S and click)';
document.body.appendChild(startError);
startError.hidden = true;
const endError = document.createElement('p');
endError.textContent = 'You need to set an end position! (Hold E and click)';
document.body.appendChild(endError);
endError.hidden = true;

// initial draw of the UI.
draw();

// wait for a mouseclick.
canvas.addEventListener('mousedown', (e) => {
    var xPos = e.clientX;
    var yPos = e.clientY;

    var node = getNode(xPos, yPos);
    if (node == null) {
        return;
    }

    // if holding 's', toggle the clicked Node as the start node
    // else if holding 'e' toggle the clicked Node as the end node
    // otherwise toggle the clicked Node as an obstacle.
    if (sDown) {
        if (!node.start) {
            if (startNode != null) {
                startNode.start = false;
            }
            startNode = node;
        } else {
            startNode = null;
        }
        node.obstacle = node.end = false;
        node.start = !node.start;
    } else if (eDown) {
        if (!node.end) {
            if (endNode != null) {
                endNode.end = false;
            }
            endNode = node;
        } else {
            endNode = null;
        }
        node.obstacle = node.start = false;
        node.end = !node.end;
    } else {
        node.start = node.end = false;
        node.obstacle = !node.obstacle;
    }
    console.log(node);

    //redraw the UI after any updates.
    draw();
});

// keep track of whether 's' or 'e' keys are being pressed.
var sDown = false;
var eDown = false;
window.addEventListener('keydown', (e) => {
    console.log("keypress");
    if (e.key == 's' || e.key == 'S') {
        sDown = true;
    }
    if (e.key == 'e' || e.key == 'E') {
        eDown = true;
    }
});
window.addEventListener('keyup', (e) => {
    if (e.key == 's' || e.key == 'S') {
        sDown = false;
    }
    if (e.key == 'e' || e.key == 'E') {
        eDown = false;
    }
});


// converts raw coordinates into the clicked Node.
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

// draws the grid UI.
function draw() {
    ctx.lineWidth = 2;
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes[i].length; j++) {
            let currentNode = nodes[i][j];
            if (currentNode.obstacle) {
                // draw solid black
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = '#000000';
                ctx.fillRect(margin + i*cellSize +1, margin + j*cellSize +1, cellSize -2, cellSize -2);
            } else if (currentNode.start) {
                // draw solid green
                ctx.strokeStyle = '#2ECC40';
                ctx.fillStyle = '#2ECC40';
                ctx.fillRect(margin + i*cellSize +1, margin + j*cellSize +1, cellSize -2 , cellSize-2);
            } else if (currentNode.end) {
                // draw solid red
                ctx.strokeStyle = '#FF4136';
                ctx.fillStyle = '#FF4136';
                ctx.fillRect(margin + i*cellSize +1, margin + j*cellSize +1, cellSize -2, cellSize -2);
            } else {
                // draw blank
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(margin + i*cellSize, margin + j*cellSize, cellSize, cellSize);
                ctx.strokeStyle = '#000000';
                ctx.strokeRect(margin + i*cellSize, margin + j*cellSize, cellSize, cellSize);
            }
        }
    }
}

// checks whether the setup is valid (i.e. start and end are set)
function isValid() {
    var valid = true;
    if (startNode == null) {
        valid = false;
        startError.hidden = false;
    } else {
        startError.hidden = true;
    }
    if (endNode == null) {
        valid = false;
        endError.hidden = false;
    } else {
        endError.hidden = true;
    }
    return valid;
}