//
export class Screen {
  constructor(game) {
    this.game = game;

    this.gameOver = document.getElementById('game_over');
    this.playAgainBtn = document.getElementById('play_again_btn');
    this.gameOverScore = document.getElementById('go_score');

    this.playAgainBtn.addEventListener('touchend', () => {
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
