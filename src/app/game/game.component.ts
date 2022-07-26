import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAniamtion = false;
  currentCard: string = '';

  game: Game;
  currentDeg = -16;

  constructor() {

  }

  ngOnInit(): void {
    this.newGame();
  }


  newGame() {
    this.game = new Game();
    console.log(this.game);
  }


  takeCard() {

    if (!this.pickCardAniamtion) {
      // document.documentElement.style.setProperty('$rotateValue', `${this.currentDeg}deg`);
      this.currentDeg--;
      console.log(this.currentDeg);
      this.currentCard = this.game.stack.pop();
      this.pickCardAniamtion = true;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        // console.log(this.game.playedCards.length);
        this.pickCardAniamtion = false;
      }, 1500);
    }
  }
}
