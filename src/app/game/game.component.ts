import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { collection } from '@firebase/firestore';
import { addDoc, collectionData, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
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
  gameId: string;

  constructor(private router: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {

    const coll = collection(firestore, 'games');
    this.games$ = collectionData(coll);

    this.games$.subscribe((newGame) => {
      // console.log('was gibts neues', newGame[0].game);

      this.game.players = newGame[0].game.players;
      this.game.stack = newGame[0].game.stack;
      this.game.playedCards = newGame[0].game.playedCards;
      this.game.currentPlayer = newGame[0].game.currentPlayer;
      this.game.avatar = newGame[0].game.avatar;

    });

  }

  async saveGame() {
    const coll: any = collection(this.firestore, 'games');

    await updateDoc(coll, this.gameId, { game: this.game.toJson() });
    // await setDoc(coll, `${this.gameId}`, { game: this.game.toJson() });

  }

  ngOnInit(): void {
    this.newGame();

    this.router.params.subscribe((params) => {
      this.gameId = params['id'];
      // console.log('im spiel ', this.gameId);
    });
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




