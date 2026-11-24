/** Angular Imports */
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';

/** rxjs Imports */
import { of } from 'rxjs';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButton } from '@angular/material/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';

/**
 * Roles and Permissions component.
 */
@Component({
    selector: 'mifosx-roles-and-permissions',
    templateUrl: './roles-and-permissions.component.html',
    styleUrls: ['./roles-and-permissions.component.scss'],
    imports: [FlexModule, RouterLink, MatButton, FaIconComponent, MatFormField, MatLabel, MatInput, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatTooltip, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator]
})
export class RolesAndPermissionsComponent implements OnInit {
  private route = inject(ActivatedRoute);


  /** Role data. */
  roleData: any;
  /** Columns to be displayed in roles and permissions table. */
  displayedColumns: string[] = ['name', 'description', 'disabled'];
  /** Data source for roles and permissions table. */
  dataSource: MatTableDataSource<any>;

  /** Paginator for roles and permissions table. */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /** Sorter for roles and permissions table. */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Retrieves the roles data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
  constructor() {
    this.route.data.subscribe(( data: { roles: any }) => {
      this.roleData = data.roles;
    });
  }

  /**
   * Filters data in roles and permissions table based on passed value.
   * @param {string} filterValue Value to filter data.
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Sets the roles and permissions table.
   */
  ngOnInit() {
    this.setRoles();
  }

  /**
   * Initializes the data source, paginator and sorter for roles and permissions table.
   */
  setRoles() {
    this.dataSource = new MatTableDataSource(this.roleData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
