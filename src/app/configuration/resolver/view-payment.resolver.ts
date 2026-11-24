/** Angular Imports */
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { G2PPaymentConfigService } from '../services/g2p-payment-config.service';

/**
 * View  resolver.
 */
export const viewPaymentConfigResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const g2pPaymentConfigService = inject(G2PPaymentConfigService);
  const config_id = route.paramMap.get('id');
  return g2pPaymentConfigService.getG2pPaymentById(config_id);
};
