/** Angular Imports */
import { ChangeDetectorRef, Component, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from '@angular/material/table';

/** rxjs Imports */
import { EMPTY, catchError, finalize } from 'rxjs';

/** Custom Services */
import { AlertService } from 'app/core/alert/alert.service';
import { UsersService } from '../services/users.service';
import { MatCard } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';


/**
 * User Requests Component
 */
@Component({
    selector: 'mifosx-user-requests',
    templateUrl: './user-requests.component.html',
    styleUrls: ['./user-requests.component.scss'],
    imports: [MatCard, MatProgressBar, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatFormField, MatLabel, MatInput, MatIcon, FaIconComponent, MatCellDef, MatCell, FlexModule, MatButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow, MatPaginator, TranslateModule]
})
export class UserRequestsComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private alertService = inject(AlertService);
  private usersService = inject(UsersService);

  /** Loading indicator */
  isLoading = false;

  /** Table data source */
  dataSource = new MatTableDataSource();

  /** Table paginator and sort */
  readonly paginator = viewChild(MatPaginator);
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  /** table columns */
  displayedColumns: string[] = ['username', 'email', 'firstName', 'lastName', 'mobileNo', 'userType', 'id', 'actionType', 'roles', 'status', 'actions'];

  /** Filters */
  showFilter: { [key: string]: boolean } = {
    username: false,
    email: false,
    firstName: false,
    lastName: false,
    mobileNo: false,
    userType: false,
    id: false,
    actionType: false,
    roles: false,
    status: false,
    actions: false,
  };

  /**
   * @description On init
   */
  ngOnInit() {
    this.getAllTasks();
  }


  /**
   * @description Toggle filter for column
   * @param columnName column name to toggle filter
   */
  toggleFilter(columnName: string) {
    for (let key in this.showFilter) {
      if (key !== columnName) {
        this.showFilter[key] = false;
      }
    }
    this.showFilter[columnName] = !this.showFilter[columnName];
    if (!this.showFilter[columnName]) {
      this.applyFilter('', columnName);
    }
  }


  /**
   * @description Apply filter to table
   * @param filterValue filter value from input
   * @param columnName column name to apply filter
   */
  applyFilter(filterValue: string, columnName: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const valueToCheck = String(data[columnName] || '').toLowerCase();
      return valueToCheck.includes(filter);
    };
    this.dataSource.filter = filterValue;
  }


  /**
   * @description Get all tasks
   */
  getAllTasks() {
    this.isLoading = true;
    this.usersService
      .getProcessedTasks()
      .pipe(
        finalize(() => (this.isLoading = false)),
        catchError((error) => {
          console.error('Error fetching tasks:', error);
          this.alertService.alert({ type: 'error', message: 'Error fetching tasks' });
          return EMPTY;
        })
      )
      .subscribe((userRequests) => {
        this.dataSource.data = userRequests;
        this.cdr.detectChanges();
        this.dataSource.paginator = this.paginator();
      });
  }

  /**
   * @description Approve record
   * @param user user object
   */
  approveRecord(user: any) {
    this.usersService
      .processUserRequest(user, true)
      .pipe(
        finalize(() => this.getAllTasks()),
        catchError((error) => {
          console.error('Error processing user request:', error);
          this.alertService.alert({ type: 'error', message: 'Error processing user request' });
          return EMPTY;
        })
      )
      .subscribe();
  }

  /**
   * @description Reject record
   * @param user user object
   */
  delRecord(user: any) {
    this.usersService
      .processUserRequest(user, false)
      .pipe(
        finalize(() => this.getAllTasks()),
        catchError((error) => {
          console.error('Error rejecting user request:', error);
          this.alertService.alert({ type: 'error', message: 'Error rejecting user request' });
          return EMPTY;
        })
      )
      .subscribe();
  }
}
