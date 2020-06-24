import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ContractorService} from '../contractor.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {PredefinedInvoiceModel} from '../../model/predefined-invoice.model';
import {ContractorAddComponent} from '../contractor-add/contractor-add.component';
import {SettingsInvoiceItemsAddComponent} from '../settings-invoice-items-add/settings-invoice-items-add.component';
import {InvoiceService} from '../invoice.service';

@Component({
  selector: 'app-settings-invoice-items',
  templateUrl: './settings-invoice-items.component.html',
  styleUrls: ['./settings-invoice-items.component.css']
})
export class SettingsInvoiceItemsComponent implements OnInit {

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private invoiceService: InvoiceService
  ) {
    this.searchKey = '';
  }

  displayedColumns = [
    'title',
    'count',
    'unit',
    'unitNettoPrice',
    'vat'
  ];

  listData: MatTableDataSource<PredefinedInvoiceModel> = new MatTableDataSource<PredefinedInvoiceModel>([]);
  searchKey: string;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.listData.data = [
      /*      {
              id: 30,
              count: 10,
              title: 'Sprzedaz czegos tam', unit: 'SZT', vat: 23, unitNettoPrice: 100
            }*/
    ];
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;

    this.invoiceService.listPredefinedInvoice().subscribe(e => {
      this.listData.data = e;
    });
  }

  applyfilter(): void {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  addInvoiceItem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    const dialogReference = this.matDialog.open(
      SettingsInvoiceItemsAddComponent,
      dialogConfig
    );
    dialogReference.afterClosed().subscribe(predefinedInvoiceItem => {
      if (predefinedInvoiceItem) {
        this.listData.data = [...this.listData.data, predefinedInvoiceItem];
      }
    });
  }

  onSearchClear(): void {
    this.searchKey = '';
    this.applyfilter();
  }
}
