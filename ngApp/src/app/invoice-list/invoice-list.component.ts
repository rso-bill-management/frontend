import {Component, OnInit, ViewChild} from '@angular/core';
import {InvoiceModel} from '../../model/invoice.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {InvoiceListDatasource} from './invoice-list.datasource';
import {MatSort} from '@angular/material/sort';
import {InvoiceService} from '../invoice.service';
import {GlobalConstants} from '../common/global-constants';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  displayedColumns: string[] = [
    'number',
    'dateIssue',
    'placeIssue',
    'netPriceSum',
    'grossSum',
    'openInvoice'
  ];
  public dataSource = new MatTableDataSource<InvoiceModel>([]);
  private invoiceRemoteDataSource = new InvoiceListDatasource(
    this.invoiceService
  );

  urlToPDF: string = GlobalConstants.apiURLToPdf;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private invoiceService: InvoiceService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.invoiceRemoteDataSource.getInvoices().subscribe(d => {
      this.dataSource.data = d;
    });
  }

  downloadPdf(uuid: string) {
    this.httpClient.get(`${this.urlToPDF}/${uuid}/pdf`, {
      responseType: 'arraybuffer'
    }).subscribe(r => {
      const blob = new Blob([r], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      const pwa = window.open(url);
    });
  }
}
