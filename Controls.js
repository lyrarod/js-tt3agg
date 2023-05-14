const events = ['touchstart', 'touchend', 'mousedown', 'mouseup', 'click'];

export class Controls {
  constructor(game) {
    this.game = game;

    this.keyPressed = {};
    addEventListener('keydown', ({ code }) => (this.keyPressed[code] = true));
    addEventListener('keyup', ({ code }) => (this.keyPressed[code] = false));

    this.reset();

    this.specialBtn = document.getElementById('special_btn');

    this.specialBtn.ontouchstart = () => {
      if (this.game.player.specialShots > 0) {
        this.game.player.specialShots--;
        this.game.enemy.enemies = [];
      }
      this.game.specialEl.innerHTML = `🛡 ${this.game.player.specialShots}`;
    };

    this.shoot_btn = document.getElementById('shoot_btn');
    this.left_btn = document.getElementById('left_btn');
    this.right_btn = document.getElementById('right_btn');

    events.forEach((e) => {
      this.shoot_btn.addEventListener(e, () => {
        if (e === 'mousedown' || e === 'touchstart') {
          this.isShooting = true;
          setTimeout(() => {
            this.isShooting = false;
          });
        }
        if (e === 'touchend' || e === 'mouseup') {
          this.isShooting = false;
        }
      });

      this.right_btn.addEventListener(e, () => {
        if (e === 'touchend' || e === 'mouseup') {
          this.moveRight = false;
        }
        if (e === 'touchstart' || e === 'mousedown') {
          this.moveRight = true;
        }
      });

      this.left_btn.addEventListener(e, () => {
        if (e === 'touchend' || e === 'mouseup') {
          this.moveLeft = false;
        }
        if (e === 'touchstart' || e === 'mousedown') {
          this.moveLeft = true;
        }
      });
    });
  }

  reset() {
    this.moveLeft = false;
    this.moveRight = false;
    this.isShooting = false;
  }
}
