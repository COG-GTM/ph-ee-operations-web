/** Angular Imports */
import { ChangeDetectorRef, Component, ViewChild, inject, viewChild } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from '@angular/material/table';
import { MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { G2PPaymentConfigService } from '../services/g2p-payment-config.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'mifosx-g2p-payment',
    templateUrl: './g2p-payment.component.html',
    styleUrls: ['./g2p-payment.component.scss'],
    imports: [FlexModule, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatButton, NgClass, ExtendedModule, FaIconComponent, MatLabel, MatFormField, MatInput, ReactiveFormsModule, MatCard, MatProgressBar, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, RouterLink, MatNoDataRow, MatPaginator, TranslateModule]
})
export class G2pPaymentComponent {
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  readonly paginator = viewChild(MatPaginator);
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'governmentEntity':
          return item.governmentEntity.name;
        case 'program':
          return item.program.programName;
        case 'payerDfsp':
          return item.dfsp.name;
        case 'account':
          return item.account;
        default:
          return item.status;
      }
    };
  }
  readonly panel = viewChild<MatExpansionPanel>('panel');

  /** government Entity form control. */
  governmentEntity = new UntypedFormControl();
  /** serial Number form control. */
  program = new UntypedFormControl();
  /** functional Id form control. */
  payerDfsp = new UntypedFormControl();
  /** Paymnent Account form control. */
  account = new UntypedFormControl();
  /** status form control. */
  status = new UntypedFormControl();

  /** Columns to be displayed in transactions table. */
  displayedColumns: string[] = ['governmentEntity', 'program', 'payerDfsp', 'account', 'status'];
  /** Data source for transactions table. */
  dataSource = new MatTableDataSource();

  programData: any;
  isLoading = false;

  /** Track selected filters. */
  selectedFilters = {
    governmentEntity: false,
    program: false,
    payerDfsp: false,
    account: false,
    status: false,
  };

  /**
   * @param route ActivatedRoute
   */
  constructor() {
    this.route.data.subscribe((data: any) => {
      this.programData = data.g2pPayments;
    });
  }

  ngOnInit(): void {
    this.getConfigs();
  }

  /**
   * Get the G2P payment configurations.
   * @returns The G2P payment configurations
   */
  getConfigs(): void {
    this.dataSource = new MatTableDataSource(this.programData);
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.matSort;
  }

  /**
   * Get the status style based on the status code.
   * @param code - The status code
   * @returns The style class to be applied
   */
  statusStyle(code: string): string {
    if (code === 'Inactive') {
      return 'red';
    } else if (code === 'Active') {
      return 'green';
    } else {
      return '';
    }
  }

  /**
   * Apply filters to the data source.
   */
  searchConfigs(): void {
    const filterValues = this.collectFilterValues();
    this.applyFilters(filterValues);
    this.updateSelectedFilters();
    this.panel().close();
  }

  /**
   * Collect values from the form controls for filtering.
   * @returns Object containing filter values
   */
  private collectFilterValues(): any {
    return {
      governmentEntity: this.governmentEntity.value ? this.governmentEntity.value.trim().toLowerCase() : '',
      program: this.program.value ? this.program.value.trim().toLowerCase() : '',
      payerDfsp: this.payerDfsp.value ? this.payerDfsp.value.trim().toLowerCase() : '',
      status: this.status.value ? this.status.value.trim().toLowerCase() : '',
      account: this.account.value ? this.account.value : '',
    };
  }

  /**
   * Apply filter criteria to the data source based on the user input.
   * @param filterValues - The values to be used for filtering
   */
  private applyFilters(filterValues: any): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerms = JSON.parse(filter);

      return (
        data.governmentEntity.name.toLowerCase().includes(searchTerms.governmentEntity) &&
        data.program.programName.toLowerCase().includes(searchTerms.program) &&
        data.dfsp.name.toLowerCase().includes(searchTerms.payerDfsp) &&
        data.status.toLowerCase().includes(searchTerms.status) &&
        data.account === searchTerms.account
      );
    };

    this.dataSource.filter = JSON.stringify(filterValues);
  }

  /**
   * Update the selected filters state to reflect which filters are active.
   */
  private updateSelectedFilters(): void {
    this.selectedFilters.governmentEntity = !!this.governmentEntity.value;
    this.selectedFilters.program = !!this.program.value;
    this.selectedFilters.payerDfsp = !!this.payerDfsp.value;
    this.selectedFilters.status = !!this.status.value;
    this.selectedFilters.account = !!this.account.value;
  }

  /** Clear filter */
  removeFilter(filterType: string, event?: MouseEvent): void {
    event?.stopPropagation();
    (this as any)[filterType].reset();
    this.getConfigs();
  }

  /**
   * Toggle the expansion panel.
   * @param event
   */
  togglePanel(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.panel().toggle();
  }
}
