export class Enemy {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
  }
  id = Date.now();
  width = 20 + Math.random() * 20;
  height = 5 + Math.random() * 10;
  speed = 0.3 + Math.random() * 0.15;
  color = 'darkred';
  enemies = [];
  frame = 0;
  timeToNextEnemy = 100;
  health = 3;

  draw() {
    let { ctx } = this.game;
    if (this.health === 2) this.color = 'crimson';
    if (this.health === 1) this.color = 'tomato';
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }

  update() {
    let { cw, ch, score, player, livesEl } = this.game;
    this.enemies.forEach((enemy, i) => {
      enemy.draw();
      enemy.y += enemy.speed;

      if (enemy.y > ch) {
        this.enemies.splice(i, 1);
        player.lives--;

        livesEl.innerHTML = `❤ ${player.lives === -1 ? 0 : player.lives}`;
      }

      if (score >= 10) {
        enemy.y += 0.05;
        this.timeToNextEnemy = 90;
      }
      if (score >= 20) {
        enemy.y += 0.05;
        this.timeToNextEnemy = 80;
      }
      if (score >= 30) {
        enemy.y += 0.05;
        this.timeToNextEnemy = 70;
      }
      if (score >= 40) {
        enemy.y += 0.05;
        this.timeToNextEnemy = 60;
      }
      if (score >= 50) {
        enemy.y += 0.05;
        this.timeToNextEnemy = 50;
      }
    });

    if (this.frame <= 0) {
      const x = Math.floor(Math.random() * (cw - this.width));
      const y = -this.height * 3;
      this.enemies.push(new Enemy(this.game, x, y));

      this.frame = this.timeToNextEnemy;
    }
    this.frame--;
  }
}
