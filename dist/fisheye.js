

const canvas = document.getElementById('fisheye');
const ctx = canvas.getContext('2d');
const content = document.getElementById('content');
console.log(content)
async function draw() {
  const w = canvas.width = window.innerWidth;
  const h = canvas.height = window.innerHeight;

  // Draw the screen contents into an offscreen canvas
  const offscreen = document.createElement('canvas');
  offscreen.width = w;
  offscreen.height = h;
  const octx = offscreen.getContext('2d');

  const image = await html2canvas(content).then(canvas => canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height));
  ctx.putImageData(image, 0, 0);

  ctx.putImageData(outData, 0, 0);
}

window.addEventListener('resize', draw);
window.addEventListener('load', draw);
