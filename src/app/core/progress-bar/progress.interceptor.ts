/** Angular Imports */
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

/** rxjs Imports */
import { finalize } from 'rxjs/operators';

/** Custom Services */
import { ProgressBarService } from './progress-bar.service';

/**
 * Http Request interceptor to start/stop loading the progress bar for a pending request
 * and stop when a response or error is received.
 */
export const progressInterceptor: HttpInterceptorFn = (request, next) => {
  const progressBarService = inject(ProgressBarService);
  progressBarService.increase();
  return next(request).pipe(
    finalize(() => { progressBarService.decrease(); })
  );
};
