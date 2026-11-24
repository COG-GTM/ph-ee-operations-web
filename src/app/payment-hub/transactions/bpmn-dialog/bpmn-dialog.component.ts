/** Angular Imports */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'mifosx-bpmn-dialog',
    templateUrl: './bpmn-dialog.component.html',
    styleUrls: ['./bpmn-dialog.component.scss'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class BpmnDialogComponent implements OnInit {

  datasource: any;

  constructor(public dialogRef: MatDialogRef<BpmnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.datasource = data.datasource;
  }

  ngOnInit() {
  }
}
