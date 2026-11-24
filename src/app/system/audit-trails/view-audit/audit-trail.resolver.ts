/** Angular Imports */
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { SystemService } from '../../system.service';

/**
 * Audit Trail data resolver.
 */
export const auditTrailResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const systemService = inject(SystemService);
  const auditTrailId = route.paramMap.get('id');
  return systemService.getAuditTrail(auditTrailId);
};
