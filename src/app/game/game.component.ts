import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog, } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';



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

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {

    if (!this.pickCardAniamtion) {
      document.documentElement.style.setProperty('$rotateValue', `${this.currentDeg}deg`);
      this.currentDeg--;
      // console.log(this.currentDeg);
      this.currentCard = this.game.stack.pop();
      this.pickCardAniamtion = true;
      setTimeout(() => {
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length ;

        this.game.playedCards.push(this.currentCard);
        this.pickCardAniamtion = false;
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {

    });

    dialogRef.afterClosed().subscribe(name => {
      if (name){
        this.game.players.push(name);
      }

    });
  }





}




