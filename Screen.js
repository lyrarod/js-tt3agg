//
export class Screen {
  constructor(game) {
    this.game = game;

    this.gameOver = document.getElementById('game_over');
    this.gameOverScore = document.getElementById('go_score');
    this.playScreen = document.getElementById('play_screen');

    this.scoreEl = document.getElementById('score');
    this.livesEl = document.getElementById('lives');
    this.specialEl = document.getElementById('special');

    this.playAgainBtn = document.getElementById('play_again_btn');

    this.playAgainBtn.addEventListener('touchend', () => {
      this.game.reset();
      this.game.start();
      this.gameOver.style.display = 'none';
    });

    this.playAgainBtn.addEventListener('mouseup', () => {
      this.game.reset();
      this.game.start();
      this.gameOver.style.display = 'none';
    });
  }

  gameOverScreen() {
    this.gameOver.style.display = 'flex';
    this.game.control.specialBtn.style.pointerEvents = 'none';
  }
}
