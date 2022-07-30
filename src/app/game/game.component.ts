import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { collection } from '@firebase/firestore';
import { collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAniamtion = false;
  currentCard: string = '';
  game: Game;

  games$: Observable<any>;
  gameArray: any;
  gameText: string = '';

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    // this.route.params.subscribe((params) => {
    //   console.log(params);
    // });
    const coll = collection(firestore, 'games');
    this.games$ = collectionData(coll);

    this.games$.subscribe((newGame) => {
      console.log('was gibts neues', newGame);

      // this.game.players = newGame.players;
      // this.game.stack = newGame.stack;
      // this.game.playedCards = newGame.playedCards;
      // this.game.currentPlayer = newGame.currentPlayer;
      // this.game.avatar = newGame.avatar;

    });

  }

  addNewGame() {
    const coll = collection(this.firestore, 'games');
    setDoc(doc(coll, 'b9skAhX0CYOXxyX9wPRE'), { game: this.game.toJason() });
  }

  ngOnInit(): void {
    this.newGame();
    // this.addNewGame();
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {

    if (!this.pickCardAniamtion) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAniamtion = true;
      setTimeout(() => {
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

        this.game.playedCards.push(this.currentCard);
        this.pickCardAniamtion = false;
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {

    });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.game.players.push(name);
      }

    });
  }



}




