import { Component, inject } from '@angular/core';
import {MAT_DIALOG_DATA  } from '@angular/material/dialog'
import { MatDialogRef } from '@angular/material/dialog';
import { FlexModule } from '@angular/flex-layout/flex';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'mifosx-success-dialog',
    templateUrl: './success-dialog.component.html',
    styleUrls: ['./success-dialog.component.scss'],
    imports: [FlexModule, FaIconComponent, TranslateModule]
})
export class SuccessDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject<MatDialogRef<SuccessDialogComponent>>(MatDialogRef);


   ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000); 
  }
}
