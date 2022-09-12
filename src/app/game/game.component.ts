import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { collectionData, deleteDoc, doc, docData, Firestore, onSnapshot, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { collection, getDoc } from 'firebase/firestore';


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
  gameById: any;


  /**
   * loading the games from firebase
   */
  constructor(private route: Router, private router: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    this.coll = collection(this.firestore, 'games');
  }


  /**
   * start the game, save the game id
   */
  ngOnInit(): void {
    this.newGame();
    this.router.params.subscribe(async (params) => {
      this.gameId = params['id'];
      onSnapshot(doc(this.firestore, "games", params['id']), (doc) => {
        const newGame: any = doc.data();
        // console.log(newGame);
        this.updateGameData(newGame);
      });
    })
  }


  /**
   * save the game in a variable
   */
  newGame() {
    this.game = new Game();
  }


  /**
   * updates the game variable
   *
   * @param newGame - data loaded from firebase
   */
  updateGameData(newGame: any) {
    this.game.players = newGame.game.players;
    this.game.stack = newGame.game.stack;
    this.game.playedCards = newGame.game.playedCards;
    this.game.currentPlayer = newGame.game.currentPlayer;
    this.game.avatar = newGame.game.avatar;
    this.game.pickCardAniamtion = newGame.game.pickCardAniamtion;
    this.game.currentCard = newGame.game.currentCard;
  }


  /**
   * save the game on firebase
   */
  saveGame() {
    setDoc(doc(this.coll, this.gameId), { game: this.game.toJson() });
  }


  /**
   * draw a card
   */
  takeCard() {
    if (this.game.players.length > 0) {
      this.gameProcess();
    } else {
      this.openDialog();
    }
  }


  /**
   * card animation and show the next player
   */
  gameProcess() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAniamtion) {
      this.cardsAnimation();
      this.displayNextPlayer();
    }
  }


  /**
   * show the card animation
   */
  cardsAnimation() {
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAniamtion = true;
    this.saveGame();
  }


  /**
   * display of the next player
   */
  displayNextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAniamtion = false;
      this.saveGame();
    }, 1000);
  }


  /**
   * open the component to add to the player
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });
    dialogRef.afterClosed().subscribe(nameAndAvatar => {
      this.createNewPlayer(nameAndAvatar);
    });
  }


  /**
   * add a new player
   *
   * @param nameAndAvatar - array with player name and picture
   */
  createNewPlayer(nameAndAvatar) {
    if (nameAndAvatar[0]) {
      this.game.players.push(nameAndAvatar[0]);
      this.game.avatar.push(nameAndAvatar[1]);
      this.saveGame();
    }
  }


  /**
   * open the component to edit the player
   *
   * @param playerIndex - the player current index
   */
  editPlayer(playerIndex) {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
    });
    dialogRef.afterClosed().subscribe(change => {
      this.changePlayerImg(change, playerIndex);
      this.deletePlayer(change, playerIndex);
      this.saveGame();
    });
  }


  /**
   * change the player picture
   *
   * @param change - new image to which the player changes
   * @param playerIndex - the player current index
   */
  changePlayerImg(change, playerIndex) {
    if (change) {
      this.game.avatar[playerIndex] = change;
    }
  }


  /**
   * delete the player
   *
   * @param change- new image to which the player changes
   * @param playerIndex - the player current index
   */
  deletePlayer(change, playerIndex) {
    if (change == 'delete') {
      this.game.players.splice(playerIndex, 1);
      this.game.avatar.splice(playerIndex, 1);
    }
  }


  /**
   * return to the start screen and delete the current game id
   */
  restart() {
    if (this.gameOver) {
      this.route.navigateByUrl('');
      deleteDoc(doc(this.coll, this.gameId));
    }
  }
}




