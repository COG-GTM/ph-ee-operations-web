import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog'
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'mifosx-batch-summary',
    templateUrl: './batch-summary.component.html',
    styleUrls: ['./batch-summary.component.scss'],
    imports: [MatDialogTitle, FaIconComponent, CdkScrollable, MatDialogContent, TranslateModule]
})
export class BatchSummaryComponent {
  dialogRef = inject<MatDialogRef<BatchSummaryComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  batch: any;

  constructor() {
      const data = this.data;

      this.batch = data.batch;
  }
}
