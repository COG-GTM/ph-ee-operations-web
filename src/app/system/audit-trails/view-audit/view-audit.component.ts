/** Angular Imports */
import { Component, OnInit, inject, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DatePipe } from '@angular/common';

/**
 * View Audit Component.
 */
@Component({
    selector: 'mifosx-view-audit',
    templateUrl: './view-audit.component.html',
    styleUrls: ['./view-audit.component.scss'],
    imports: [FlexModule, MatCard, MatCardContent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DatePipe]
})
export class ViewAuditComponent implements OnInit {
  private route = inject(ActivatedRoute);


  /** Audit Trail Data. */
  auditTrailData: any;
  /** Columns to be displayed in audit trail table. */
  displayedColumns: string[] = ['command', 'commandValue'];
  /** Data source for audit trail table. */
  dataSource: MatTableDataSource<any>;

  /** Paginator for audit trails table. */
  readonly paginator = viewChild(MatPaginator);
  /** Sorter for audit trails table. */
  readonly sort = viewChild(MatSort);

  /**
   * Retrieves the audit trail data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
  constructor() {
    this.route.data.subscribe((data: { auditTrail: any }) => {
      this.auditTrailData = data.auditTrail;
    });
  }

  /**
   * Sets the audit trail commands table.
   */
  ngOnInit() {
    this.setAuditTrailCommands();
  }

  /**
   * Initalizes Audit Trail Commands Data.
   */
  get auditTrailCommandsData() {
    return Object.entries(JSON.parse(this.auditTrailData.commandAsJson))
      .map(
        ([key, value]) => ({ command: key, commandValue: value })
      );
  }

  /**
   * Initializes the data source, paginator and sorter for audit trail commands table.
   */
  setAuditTrailCommands() {
    this.dataSource = new MatTableDataSource(this.auditTrailCommandsData);
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
  }

}
