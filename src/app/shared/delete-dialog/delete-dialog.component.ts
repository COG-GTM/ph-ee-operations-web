/** Angular Imports */
import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

/**
 * Delete dialog component.
 */
@Component({
    selector: 'mifosx-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class DeleteDialogComponent implements OnInit {
  dialogRef = inject<MatDialogRef<DeleteDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);


  ngOnInit() {
  }

}
