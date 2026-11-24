/** Angular Imports */
import { Injectable, inject } from '@angular/core';


/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { G2PPaymentConfigService } from '../services/g2p-payment-config.service';

/**
 * G2P template data resolver.
 */
@Injectable()
export class G2PTemplateResolver {
    private g2pPaymentConfigService = inject(G2PPaymentConfigService);


    /**
     * Returns the G2p template data.
     * @returns {Observable<any>}
     */
    resolve(): Observable<any> {
        return this.g2pPaymentConfigService.getTemplateData();
    }

}
