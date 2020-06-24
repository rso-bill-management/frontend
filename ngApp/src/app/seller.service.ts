import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from './common/global-constants';
import { SellerModel } from 'src/model/seller.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  constructor(public httpClient: HttpClient) {}

  getSellerData(): Observable<any> {
    return this.httpClient.get<any>(GlobalConstants.apiURLGetSeller);
  }

  submitSellerData(seller: SellerModel): Observable<any> {
    return this.httpClient.post<any>(GlobalConstants.apiURLSetSeller, seller);
  }
}
