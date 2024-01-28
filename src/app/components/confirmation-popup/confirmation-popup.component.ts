import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css'],
})
export class ConfirmationPopupComponent implements OnInit {
  name: string = '';

  constructor(public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string}
  ) {}

    ngOnInit(): void {
      this.name = this.data.name;
    }
    
    onButtonClicked(isConfirmed: boolean) {
      this.dialogRef.close(isConfirmed);
    }
}
