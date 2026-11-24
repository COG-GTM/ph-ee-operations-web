/** Angular Imports */
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { TransactionsService } from '../service/transactions.service';

/**
 * Transaction data resolver.
 */
export const transactionResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const transactionsService = inject(TransactionsService);
  const transactionId = route.paramMap.get('id');
  return transactionsService.getTransactionDetail(transactionId);
};
