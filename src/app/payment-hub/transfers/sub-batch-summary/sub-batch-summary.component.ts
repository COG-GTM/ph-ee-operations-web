import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'mifosx-sub-batch-summary',
    templateUrl: './sub-batch-summary.component.html',
    styleUrls: ['./sub-batch-summary.component.scss'],
    standalone: false
})
export class SubBatchSummaryComponent {

  subBatch: any;

  constructor(
    public dialogRef: MatDialogRef<SubBatchSummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.subBatch = data.subBatch;
      console.log(this.subBatch)
  }
}