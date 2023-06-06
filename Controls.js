const events = ['touchstart', 'touchend', 'mousedown', 'mouseup', 'click'];

export class Controls {
  constructor(game) {
    this.game = game;
    this.keyPressed = {};
    this.lastEvent = null;

    const { player, enemy } = this.game;

    this.reset();

    addEventListener('keydown', ({ code }) => {
      if (this.lastEvent === code) return;
      this.lastEvent = code;
      this.keyPressed[code] = true;

      if (this.keyPressed.Space && this.lastEvent === 'Space') {
        this.game.player.shoot();
      }
      // console.log(this.lastEvent)
      // console.log(this.keyPressed);

      if (this.game.status.game_running) return;

      if (this.lastEvent === 'Enter') {
        this.game.reset();
        this.game.start();
        this.game.screen.gameOver.style.display = 'none';
      }
    });

    addEventListener('keyup', ({ code }) => {
      this.keyPressed[code] = false;
      // console.log(this.keyPressed);
      this.lastEvent = null;
      delete this.keyPressed[code];
      // console.log(this.keyPressed);
    });

    this.left_btn = document.getElementById('left_btn');
    this.right_btn = document.getElementById('right_btn');
    this.shoot_btn = document.getElementById('shoot_btn');
    this.play_btn = document.getElementById('play_btn');

    // SPECIAL SHOOT
    this.specialBtn = document.getElementById('special_btn');

    this.specialBtn.onclick = () => {
      if (player.specialShots > 0) {
        player.specialShots--;
        enemy.enemies = [];
        this.game.screen.specialEl.innerHTML = `🛡 ${player.specialShots}`;
      }
    };

    events.forEach((e) => {
      this.play_btn.addEventListener(e, () => {
        if (e === 'touchend' || e === 'mouseup') {
          this.game.reset();
          this.game.start();
        }
      });

      this.shoot_btn.addEventListener(e, () => {
        if (e === 'touchstart') {
          // console.log('shot');
          this.game.player.shoot();
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
  }
}
