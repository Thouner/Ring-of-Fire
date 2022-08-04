import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})


export class EditPlayerComponent implements OnInit {

  avatar: string = '';
  allProfilePictures: any = [];


  constructor(private dialogRef: MatDialogRef<EditPlayerComponent>) {
    for (let i = 1; i < 9; i++) {
      this.allProfilePictures.push(`${i}`)
    }
  }


  ngOnInit(): void {
    console.log();

  }


  /**
   * Closing the component without selection
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
