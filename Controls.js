const events = ['touchstart', 'touchend', 'mousedown', 'mouseup', 'click'];

export class Controls {
  constructor(game) {
    this.game = game;
    this.keyPressed = {};
    this.lastEvent = null;

    const { player, enemy, Bullet, bullet } = this.game;

    this.reset();

    addEventListener('keydown', ({ code }) => {
      if (this.lastEvent === code) return;
      this.lastEvent = code;
      this.keyPressed[code] = true;

      if (this.keyPressed.Space && this.lastEvent === 'Space') {
        // this.isShooting = true;
        this.game.player.laser.currentTime = 0;
        this.game.player.laser.play();

        bullet.add(
          new Bullet(
            this.game,
            player.x + player.width * 0.5 - bullet.width * 0.5,
            player.y - bullet.height,
            'orangered'
          )
        );
      }
      console.log(this.keyPressed);

      if (this.game.status.game_running) return;

      if (code === 'Enter') {
        this.game.reset();
        this.game.start();
        this.game.screen.gameOver.style.display = 'none';
      }
    });

    addEventListener('keyup', ({ code }) => {
      this.keyPressed[code] = false;
      console.log(this.keyPressed);

      // if (!this.keyPressed.Space) {
      //   this.isShooting = false;
      // }

      this.lastEvent = null;
      delete this.keyPressed[code];
      console.log(this.keyPressed);
    });

    this.left_btn = document.getElementById('left_btn');
    this.right_btn = document.getElementById('right_btn');
    this.shoot_btn = document.getElementById('shoot_btn');
    this.play_btn = document.getElementById('play_btn');

    // SPECIAL SHOOTING
    this.specialBtn = document.getElementById('special_btn');

    // let { player, enemy } = this.game;

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

      let timer = null;
      this.shoot_btn.addEventListener(e, (evt) => {
        evt.preventDefault();
        if (evt.repeat) return;

        if (e === 'mousedown' || e === 'touchstart') {
          // console.log('shot');
          this.isShooting = true;

          timer = setTimeout(() => {
            this.isShooting = false;
          }, 50);
        }
        if (e === 'touchend' || e === 'mouseup') {
          this.isShooting = false;
          clearTimeout(timer);
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
