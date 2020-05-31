import {Observable, of} from 'rxjs';
import {InvoiceModel} from '../../model/invoice.model';

export class InvoiceListDatasource {
  private invoicesSource: Observable<InvoiceModel[]> = of([
    {
      number: '10/10/2020',
      dateIssue: new Date(),
      placeIssue: 'Warsaw',
      netPriceSum: 120.00,
      grossSum: 153.00
    } as InvoiceModel,
    {
      number: '15/10/2020',
      dateIssue: new Date(),
      placeIssue: 'Opole',
      netPriceSum: 160.00,
      grossSum: 1993.00
    } as InvoiceModel]);

  getInvoices() {
    return this.invoicesSource;
  }

}
