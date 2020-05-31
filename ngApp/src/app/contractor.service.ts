import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contractor } from 'src/model/contractor.model';
import { Observable } from 'rxjs';
import { GlobalConstants } from './common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  constructor(private httpClient: HttpClient) {}

  upsertContractor(contractor: Contractor): Observable<any> {
    return this.httpClient.post<any>(
      GlobalConstants.apiURLAddOrUpdateContractor,
      contractor
    );
  }

  removeContractor(): void {}
}
