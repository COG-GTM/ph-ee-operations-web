/** Angular Imports */
import { Injectable, inject } from '@angular/core';


/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { TransactionsService } from '../service/transactions.service';
import { Currency } from '../model/currency.model';

/**
 * Currencies data resolver.
 */
@Injectable()
export class CurrenciesResolver  {
    private transactionsService = inject(TransactionsService);


    /**
     * Returns the currencies data.
     * @returns {Observable<any>}
     */
    resolve(): Observable<any> {
        return this.transactionsService.getCurrencies();
    }
}
