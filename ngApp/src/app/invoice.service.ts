import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalConstants} from './common/global-constants';
import {Contractor} from '../model/contractor.model';
import {PredefinedInvoiceModel} from '../model/predefined-invoice.model';
import {InvoiceModel} from '../model/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(public httpClient: HttpClient) {
  }

  getInvoicesList(): Observable<InvoiceModel[]> {
    return this.httpClient.get<InvoiceModel[]>(GlobalConstants.apiURLGetInvoicesList);
  }

  upsertInvoice(invoiceModel: InvoiceModel): Observable<any> {
    return this.httpClient.post<any>(
      GlobalConstants.apiURLAddInvoice,
      invoiceModel
    );
  }

  addPredefinedInvoice(p: PredefinedInvoiceModel): Observable<any> {
    return this.httpClient.post<any>(
      GlobalConstants.apiURLAddPredefinedInvoice,
      p
    );
  }

  listPredefinedInvoice(): Observable<PredefinedInvoiceModel[]> {
    return this.httpClient.get<PredefinedInvoiceModel[]>(
      GlobalConstants.apiURLGetPredefinedInvoice
    );
  }
}
