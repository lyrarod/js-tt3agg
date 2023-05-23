export class Player {
  constructor(game) {
    this.game = game;
    this.cw = game.cw;
    this.ch = game.ch;
    this.laser = new Audio(
      'https://opengameart.org/sites/default/files/laser7.wav'
    );
    this.reset();
  }
  width = 28;
  height = 10;
  speed = 4;
  color = 'lightgreen';
  frame = 0;
  timeToNextShoot = 10;
  specialShots = 0;
  lives = 0;

  reset() {
    this.x = this.cw * 0.5 - this.width * 0.5;
    this.y = this.ch - this.height - 5;

    this.specialShots = 3;
    this.lives = 3;
  }

  draw() {
    let { ctx } = this.game;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }

  update() {
    const { isShooting, moveLeft, moveRight, keyPressed } = this.game.control;
    const { Bullet, bullet } = this.game;

    if ((isShooting || keyPressed.Space) && this.frame <= 0) {
      this.laser.currentTime = 0;
      this.laser.play();

      bullet.add(
        new Bullet(
          this.game,
          this.x + this.width * 0.5 - bullet.width * 0.5,
          this.y - bullet.height,
          this.color
        )
      );
      this.frame = this.timeToNextShoot;
      //console.log(bullet.bullets.length);
    }
    this.frame--;

    if ((moveLeft || keyPressed.ArrowLeft) && this.x > 0) {
      this.x -= this.speed;
    }
    if ((moveRight || keyPressed.ArrowRight) && this.x + this.width < this.cw) {
      this.x += this.speed;
    }
  }
}
