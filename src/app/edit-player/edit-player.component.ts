import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures =[];

  constructor() {
    for (let i = 1; i < 9; i++) {
        this.allProfilePictures.push(`player${i}.png`)
    }
    console.log(this.allProfilePictures);
   }

  ngOnInit(): void {

  }

}
