import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog'
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'mifosx-sub-batch-summary',
    templateUrl: './sub-batch-summary.component.html',
    styleUrls: ['./sub-batch-summary.component.scss'],
    imports: [MatDialogTitle, FaIconComponent, CdkScrollable, MatDialogContent, TranslateModule]
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