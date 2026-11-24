/** Angular Imports */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';


/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { G2PPaymentConfigService } from '../services/g2p-payment-config.service';

/**
 * G2P Payment Configs resolver.
 */
export const g2pPaymentConfigsResolver: ResolveFn<any> = () => {
  const g2pPaymentConfigService = inject(G2PPaymentConfigService);
  return g2pPaymentConfigService.getG2pPayments();
};
