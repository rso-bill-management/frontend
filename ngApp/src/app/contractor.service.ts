import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contractor } from 'src/model/contractor.model';
import { Observable } from 'rxjs';
import { GlobalConstants } from './common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  constructor(public httpClient: HttpClient) {}

  upsertContractor(contractor: Contractor): Observable<any> {
    return this.httpClient.post<any>(
      GlobalConstants.apiURLUpsertContractor,
      contractor
    );
  }

  removeContractor(contractor: Contractor): Observable<any> {
    return this.httpClient.post<any>(
      GlobalConstants.apiURLRemoveContractor,
      contractor
    );
  }
}
