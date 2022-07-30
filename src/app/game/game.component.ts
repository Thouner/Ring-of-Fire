import { Component, HostBinding, Input, OnInit } from '@angular/core';
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
  currentDeg = -16;


  game: Game;


@HostBinding('style.$rotateValue')
public rotateValue: any = '-16deg';

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
      this.currentDeg --;

      this.rotateValue = this.currentDeg + 'deg';
      // document.documentElement.style.setProperty('$rotateValue', `${this.rotateValue}`);
      console.log('rotateValue', this.rotateValue);
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




