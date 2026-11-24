import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { SettingsService } from 'app/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {
  private http = inject(HttpClient);
  private settingsService = inject(SettingsService);


  apiPrefix: string = environment.backend.operations;

  getTransfers(page: number, size: number): Observable<any> {
    const httpParams = new HttpParams()
    .set('page', page)
    .set('size', size);
    const headers = new HttpHeaders()
    .set('Platform-TenantId', this.settingsService.tenantIdentifier);

    return this.http.get(this.apiPrefix + '/transfers', { params: httpParams, headers: headers });
  }

  getSubBatchSumaryDetail(batchId: string, subBatchId: string): Observable<any> {
    return this.http.get(this.apiPrefix + '/batches/' + batchId + '/subBatches/' + subBatchId);

    // Mock data for transfer details
    // return this.http.get('../../assets/mock/payment-hub/sub-batches-details.mock.json');
  }

}
