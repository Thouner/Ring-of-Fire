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

  constructor(private router: Router, private firestore: Firestore) { }

  ngOnInit(): void {
  }


  async newGame() {
    //start game
    let game = new Game();
    // this.firestore
    //   .collection('game')
    //   .add(game.toJason())
    //   .then((gameInfo: any) => {
    //     console.log(gameInfo);

    // this.router.navigateByUrl('/game/' + gameInfo.id);
    // });


    // // setDoc(doc(coll, 'b9skAhX0CYOXxyX9wPRE'), { game: game.toJason() })
    // setDoc(doc(coll), { game: game.toJason() }).then((gameinfo: any) => {
    //     console.log(gameinfo);

    //   });


    // this.router.navigateByUrl('/game');


    // const docRef:any = await addDoc(collection(this.firestore, 'games'), {
    // });
    const coll = collection(this.firestore, 'games');
    console.log("Document written with ID: ", coll);

    await setDoc(doc(coll), { game: game.toJason() }).then((gameinfo: any) => {
      console.log(gameinfo);
    });




  }

}
