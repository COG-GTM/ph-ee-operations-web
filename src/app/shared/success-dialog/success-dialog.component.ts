import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA  } from '@angular/material/dialog'
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'mifosx-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SuccessDialogComponent>) {
   }

   ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000); 
  }
}
