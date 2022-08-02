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

  // pickCardAniamtion = false;
  // currentCard: string = '';

  game: Game;

  games$: Observable<any>;
  gameArray: any;
  gameText: string = '';
  gameId: string;
  coll: any;

  constructor(private router: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {

    this.coll = collection(firestore, 'games');
    this.games$ = collectionData(this.coll);

    this.games$.subscribe((newGame) => {
      // console.log('was gibts neues', newGame[0].game);

      this.game.players = newGame[0].game.players;
      this.game.stack = newGame[0].game.stack;
      this.game.playedCards = newGame[0].game.playedCards;
      this.game.currentPlayer = newGame[0].game.currentPlayer;
      this.game.avatar = newGame[0].game.avatar;
      this.game.pickCardAniamtion = newGame[0].game.pickCardAniamtion;
      this.game.currentCard = newGame[0].game.currentCard;

    });

  }

  async saveGame() {


    // await updateDoc(this.coll, this.gameId, { game: this.game.toJson() });
    // await setDoc(this.coll, `${this.gameId}`, { game: this.game.toJson() });
    setDoc(doc(this.coll, this.gameId), { game: this.game.toJson() });
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

    if (!this.game.pickCardAniamtion) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAniamtion = true;
      this.saveGame();
      setTimeout(() => {
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAniamtion = false;
        this.saveGame();
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {

    });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.game.players.push(name);
        this.saveGame();
      }

    });
  }



}




