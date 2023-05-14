import { hasCollision } from './utils';

export class Bullet {
  constructor(game, x, y, color) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  width = 4;
  height = 8;
  speed = 6;
  bullets = [];

  add(bullet) {
    this.bullets.push(bullet);
  }

  draw() {
    let { ctx } = this.game;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }

  update() {
    const { bullets } = this;
    const { enemies } = this.game.enemy;

    bullets.forEach((bullet, iBullet) => {
      bullet.draw();
      bullet.y -= bullet.speed;
      if (bullet.y < -1) {
        bullets.splice(iBullet, 1);
      }

      enemies.forEach((enemy, iEnemy) => {
        if (hasCollision(bullet, enemy)) {
          bullets.splice(iBullet, 1);
          enemy.health--;
          enemy.y -= 10;

          if (enemy.health <= 0) {
            this.game.score++;
            this.game.scoreEl.innerHTML = `💎 ${this.game.score}`;
            this.game.screen.gameOverScore.innerHTML = `Your Score: ${this.game.score}`;

            if (
              this.game.score === 20 ||
              this.game.score === 30 ||
              this.game.score === 40 ||
              this.game.score === 50 ||
              this.game.score === 60 ||
              this.game.score === 70 ||
              this.game.score === 80
            ) {
              this.game.player.specialShots++;
              this.game.specialEl.innerHTML = `🛡 ${this.game.player.specialShots}`;
            }

            enemies.splice(iEnemy, 1);
          }
        }
      });
    });
  }
}
