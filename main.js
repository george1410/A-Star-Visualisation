const canvas = document.createElement('canvas');
canvas.width = canvas.height = 520;

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#000000';
ctx.lineWidth = 2;

for (let i = 10; i < 500; i += 50) {
    for (let j = 10; j < 500; j += 50) {
        ctx.strokeRect(i,j,50,50);
    }
}