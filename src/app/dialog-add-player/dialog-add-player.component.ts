import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})


export class DialogAddPlayerComponent implements OnInit {

  name: string = '';
  avatar: string = '';
  allProfilePictures: any = [];


  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) {
    for (let i = 1; i < 9; i++) {
      this.allProfilePictures.push(`player${i}.png`)
    }
  }


  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
