import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { collection } from '@firebase/firestore';
import { addDoc, collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  games$: Observable<any>;
  gameArray: any;
  gameText: string = '';
  gameId: string;
  coll: any;
  gameOver: boolean = false;


  constructor(private route: Router, private router: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    this.coll = collection(firestore, 'games');
    this.games$ = collectionData(this.coll);
    this.games$.subscribe((newGame) => {
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
    setDoc(doc(this.coll, this.gameId), { game: this.game.toJson() });
  }


  ngOnInit(): void {
    this.newGame();
    this.router.params.subscribe((params) => {
      this.gameId = params['id'];
    });
  }


  newGame() {
    this.game = new Game();
  }



  takeCard() {
    if (this.game.players.length > 0) {
      if (this.game.stack.length == 0) {
        this.gameOver = true;
      } else if (!this.game.pickCardAniamtion) {
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
    } else {
      this.openDialog();
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });
    dialogRef.afterClosed().subscribe(nameAndAvatar => {
      if (nameAndAvatar[0]) {
        this.game.players.push(nameAndAvatar[0]);
        this.game.avatar.push(nameAndAvatar[1]);
        this.saveGame();
      }
    });

  }


  editPlayer(playerIndex) {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
    });
    dialogRef.afterClosed().subscribe(change => {
      if (change) {
        this.game.avatar[playerIndex] = change;
      }
      if (change == 'delete') {
        this.game.players.splice(playerIndex, 1);
        this.game.avatar.splice(playerIndex, 1);
      }
      this.saveGame();
    });

  }


  restart(){
    this.route.navigateByUrl('');
    deleteDoc(doc(this.coll, this.gameId));
  }

}




