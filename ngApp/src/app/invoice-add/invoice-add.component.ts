import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PredefinedInvoiceModel} from '../../model/predefined-invoice.model';
import {InvoiceService} from '../invoice.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Contractor} from '../../model/contractor.model';
import {ContractorService} from '../contractor.service';
import {MatSelectChange} from '@angular/material/select';
import {SellerService} from '../seller.service';
import {SellerModel} from 'src/model/seller.model';
import {DatePipe} from '@angular/common';
import {PaymentType} from '../../model/payment.type';
import {Router} from '@angular/router';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {

  private predefinedInvoiceItems: PredefinedInvoiceModel[];
  public predefinedContractors: Contractor[] = [];

  public seller: SellerModel = {
    tin: '',
    companyName: '',
    accountNumber: '',
    town: '',
    street: '',
    postalCode: ''
  };

  public formModel = this.fb.group({
    dateIssue: [new Date(), Validators.required],
    placeIssue: ['', Validators.required],
    saleDate: [new Date(), Validators.required],
    contractor: this.fb.group({
      name: ['', Validators.required],
      tin: [''],
      town: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
    }),
    positions: this.fb.array([]),
    paymentType: ['', Validators.required],
    paymentDays: ['', Validators.required]
  });

  constructor(private route: Router, private fb: FormBuilder, private iS: InvoiceService, private sellerService: SellerService, private contractorService: ContractorService) {
  }

  ngOnInit(): void {
    this.sellerService.getSellerData().subscribe(response => {
      this.seller = response;
      this.formModel.patchValue({
        placeIssue: this.seller.town
      }, {});
    }, error => {
    });
    this.addNewPosition();
    this.iS.listPredefinedInvoice().subscribe(e => this.predefinedInvoiceItems = e);
    this.contractorService.getContractorList().subscribe(e => this.predefinedContractors = e.body || []);
  }

  public addNewPosition() {
    this.positions.push(this.newPosition());
  }

  removePosition(i: number) {
    this.positions.removeAt(i);
    if (this.positions.length === 0) {
      this.addNewPosition();
    }
  }

  newPosition(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      count: ['', Validators.compose([Validators.required, Validators.min(1)])],
      unit: ['', Validators.required],
      unitNettoPrice: ['', Validators.required],
      vat: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])]
    });
  }

  get positions() {
    return this.formModel.get('positions') as FormArray;
  }

  onSubmit($event: any) {
    if (!this.formModel.valid) {
      return;
    }
    const copy = {
      ...this.formModel.value,
      dateIssue: new DatePipe('en-US').transform(this.formModel.value.dateIssue, 'yyyy-MM-dd'),
      saleDate: new DatePipe('en-US').transform(this.formModel.value.saleDate, 'yyyy-MM-dd'),
      netPriceSum: this.calcSumNet(),
      grossSum: Number(this.calcSumGross()),
      vatSum: Number(this.calcSumVat())
    };
    this.iS.upsertInvoice(copy).subscribe(e => {
      this.route.navigate(['invoice-list']);
    });
  }

  public calcVatAmountForPos(pos: number) {
    const position = (this.positions.at(pos)) as FormGroup;
    const val = (+position.get('count').value * +position.get('unitNettoPrice').value) * (+position.get('vat').value / 100.0);
    return Number(val.toFixed(2)) ?? 0.0;
  }

  public calcGrossAmountForPos(pos: number) {
    const position = (this.positions.at(pos)) as FormGroup;
    return (+position.get('count').value * +position.get('unitNettoPrice').value) + this.calcVatAmountForPos(pos);
  }

  calcSumNet() {
    return this.positions.controls
      .map(e => e as FormGroup)
      .map(e => +e.get('count').value * +e.get('unitNettoPrice').value)
      .reduce((a, b) => a + b, 0.0);
  }

  calcSumVat() {
    return this.positions.controls
      .map((e, index) => this.calcVatAmountForPos(index))
      .reduce((a, b) => a + b, 0.0).toFixed(2);
  }

  calcSumGross() {
    return this.positions.controls
      .map((e, index) => this.calcGrossAmountForPos(index))
      .reduce((a, b) => a + b, 0.0).toFixed(2);
  }

  clear() {
    this.formModel.reset();
  }

  getFilteredInvoiceItems(value: string): PredefinedInvoiceModel[] {
    if (!this.predefinedInvoiceItems) {
      return [];
    }
    return this.predefinedInvoiceItems.filter(e => e.title.toLowerCase().includes(value));
  }

  onTitleOptionSelected($event: MatAutocompleteSelectedEvent, i: number) {
    const selected = $event.option.value as PredefinedInvoiceModel;
    const position = (this.positions.at(i)) as FormGroup;
    position.patchValue(
      {
        title: selected.title,
        count: selected.count,
        unit: selected.unit,
        unitNettoPrice: selected.unitNettoPrice,
        vat: selected.vat,
      });
  }

  onSelectPredefinedContractor($event) {
    const selectedContractor = $event.value as Contractor;
    this.formModel.get('contractor').patchValue({
      ...selectedContractor,
      tin: selectedContractor.tin,
    }, {onlySelf: true});
  }
}
