import { Component, OnInit } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection, setDoc } from '@firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router, private firestore: Firestore) { }

  ngOnInit(): void {
  }


  newGame() {
    //start game
    let game = new Game();


    const coll = collection(this.firestore, 'games');
    // setDoc(doc(coll, 'b9skAhX0CYOXxyX9wPRE'), { game: game.toJason() })
    setDoc(doc(coll), { game: game.toJason() }).then((gameinfo: any) => {
        console.log(gameinfo);

      });


    // this.router.navigateByUrl('/game');

  }

}
