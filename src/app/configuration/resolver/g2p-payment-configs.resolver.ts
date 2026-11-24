/** Angular Imports */
import { Injectable, inject } from '@angular/core';


/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { G2PPaymentConfigService } from '../services/g2p-payment-config.service';

/**
 * G2P Payment Configs resolver.
 */
@Injectable()
export class G2PPaymentConfigsResolver {
    private g2pPaymentConfigService = inject(G2PPaymentConfigService);


    /**
     * Returns the G2p Payment Configs data.
     * @returns {Observable<any>}
     */
    resolve(): Observable<any> {
        return this.g2pPaymentConfigService.getG2pPayments();
    }

}
