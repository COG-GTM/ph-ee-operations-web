import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dates } from 'app/core/utils/dates';
import { Transfer } from '../model/transfer.model';

@Component({
  selector: 'mifosx-view-transfer-details',
  templateUrl: './view-transfer-details.component.html',
  styleUrls: ['./view-transfer-details.component.scss']
})
export class ViewTransferDetailsComponent {

  transfer: any;

  constructor(private dates: Dates,
    public dialogRef: MatDialogRef<ViewTransferDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.transfer = data.transfer;
  }

  convertTimestampToUTCDate(timestamp: any) {
    if (!timestamp) {
      return undefined;
    }
    return this.dates.formatUTCDate(new Date(timestamp));
  }

  status(item: Transfer): string {
    if (item.status === 'COMPLETED') {
      return 'green';
    } else if (item.status === 'ON_GOING') {
      return 'yellow';
    }
    return 'red';
  }

}
