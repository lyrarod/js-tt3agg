const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cw = (canvas.width = 360);
const ch = (canvas.height = 340);

function hasCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export { ctx, cw, ch, hasCollision };
