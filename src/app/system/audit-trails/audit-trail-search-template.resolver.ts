/** Angular Imports */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';


/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { SystemService } from '../system.service';

/**
 * Audit Trail Search Template data resolver.
 */
export const auditTrailSearchTemplateResolver: ResolveFn<any> = () => {
  const systemService = inject(SystemService);
  return systemService.getAuditTrailSearchTemplate();
};
