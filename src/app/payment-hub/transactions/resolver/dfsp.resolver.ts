/** Angular Imports */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';


/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { TransactionsService } from '../service/transactions.service';
import { Currency } from '../model/currency.model';
import { DfspEntry } from '../model/dfsp.model';

/**
 * Currencies data resolver.
 */
export const dfspResolver: ResolveFn<any> = () => {
  const transactionsService = inject(TransactionsService);
  return transactionsService.getDfspEntries();
};
