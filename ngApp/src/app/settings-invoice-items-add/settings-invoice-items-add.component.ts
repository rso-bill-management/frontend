import {Component, Inject, OnInit} from '@angular/core';
import {ContractorService} from '../contractor.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PredefinedInvoiceModel} from '../../model/predefined-invoice.model';
import {InvoiceService} from '../invoice.service';

@Component({
  selector: 'app-settings-invoice-items-add',
  templateUrl: './settings-invoice-items-add.component.html',
  styleUrls: ['./settings-invoice-items-add.component.css']
})
export class SettingsInvoiceItemsAddComponent implements OnInit {
  constructor(
    private invoiceService: InvoiceService,
    public dialogRef: MatDialogRef<SettingsInvoiceItemsAddComponent>
  ) {
    this.predefiniedInvoiceModel = {
      title: '',
      count: 0,
      unit: '',
      unitNettoPrice: 0,
      vat: 0
    } as PredefinedInvoiceModel;
  }

  predefiniedInvoiceModel: PredefinedInvoiceModel;

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.invoiceService
      .addPredefinedInvoice(this.predefiniedInvoiceModel)
      .subscribe(
        response => this.submitSuccess(this.predefiniedInvoiceModel),
        error => this.submitError(error)
      );
  }

  submitSuccess(response): void {
    this.onClose(response);
  }

  submitError(error): void {}

  onClose(results): void {
    this.dialogRef.close(results);
  }

}
