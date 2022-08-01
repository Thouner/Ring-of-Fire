import { Component, OnInit } from '@angular/core';
import { addDoc, doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection, setDoc } from '@firebase/firestore';
import { Game } from 'src/models/game';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router, private firestore: Firestore) {

  }

  ngOnInit(): void {
  }


  async newGame() {
    //start game
    let game = new Game();


    const coll: any = collection(this.firestore, 'games');
    let gameInfo = await addDoc(coll, { game: game.toJson() });
    // console.log("Document written with ID: ", gameInfo.id);
    this.router.navigateByUrl('/game/' + gameInfo.id);

  }

}
