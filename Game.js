import { Bullet } from './Bullet';
import { Controls } from './Controls';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { Screen } from './Screen';

export class Game {
  constructor(ctx, cw, ch) {
    this.ctx = ctx;
    this.cw = cw;
    this.ch = ch;
    this.enemy = new Enemy(this);
    this.bullet = new Bullet(this);
    this.player = new Player(this);
    this.control = new Controls(this);
    this.screen = new Screen(this);
    this.gameObjects = [];
    this.score = 0;

    this.status = {
      game_over: false,
      game_running: false,
    };

    this.reset();

    this.music = new Audio(
      'https://opengameart.org/sites/default/files/Hero%20Immortal.mp3'
    );
    this.music.volume = 0.1;
  }

  animation = null;
  Bullet = Bullet;

  start() {
    this.loop();
    this.gameObjects = [this.player, this.bullet, this.enemy];

    this.status.game_running = true;
    this.music.play();
    this.music.loop = true;
    this.screen.playScreen.style.display = 'none';
    this.control.shoot_btn.style.pointerEvents = 'auto';
    this.control.specialBtn.style.pointerEvents = 'auto';
  }

  update() {
    if (this.player.lives < 0) {
      cancelAnimationFrame(this.animation);
      this.status.game_over = true;
      this.status.game_running = false;
      this.control.reset();
      this.screen.gameOverScreen();
      this.music.pause();
      this.music.currentTime = 0;
      return;
    }

    this.gameObjects.forEach((obj) => {
      obj.update();
    });
  }

  draw() {
    this.gameObjects.forEach((obj) => {
      obj.draw();
    });
  }

  loop = () => {
    this.animation = requestAnimationFrame(this.loop);
    this.background();
    this.draw();
    this.update();
  };

  background() {
    let { ctx, cw, ch } = this;
    ctx.beginPath();
    ctx.fillStyle = '#0007';
    ctx.fillRect(0, 0, cw, ch);
    ctx.closePath();
  }

  reset() {
    this.animation = null;
    this.player.reset();
    this.score = 0;
    this.enemy.enemies = [];
    this.enemy.timeToNextEnemy = 100;
    this.bullet.bullets = [];
    this.elementsReset();
  }

  elementsReset() {
    this.screen.specialEl.innerHTML = `🛡 ${this.player.specialShots}`;
    this.screen.livesEl.innerHTML = `❤ ${this.player.lives}`;
    this.screen.scoreEl.innerHTML = `💎 ${this.score}`;
    this.screen.gameOverScore.innerHTML = `Your Score: ${this.score}`;
  }
}
