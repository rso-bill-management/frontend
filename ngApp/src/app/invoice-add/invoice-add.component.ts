import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {

  public formModel = this.fb.group({
    number: ['', Validators.required],
    dateIssue: ['', Validators.required],
    placeIssue: ['', Validators.required],
    saleDate: ['', Validators.required],
    contractor: this.fb.group({
      name: ['', Validators.required],
      taxpayerIdentificationNumber: [''],
      town: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
    }),
    positions: this.fb.array([]),
    paymentType: ['', Validators.required],
    paymentDays: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.addNewPosition();
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
      netPrice: ['', Validators.required],
      vat: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
      vatAmount: ['', Validators.required],
    });
  }

  get positions() {
    return this.formModel.get('positions') as FormArray;
  }

  onSubmit($event: any) {
    console.log(this.formModel.value);
  }

  public calcVatAmountForPos(pos: number) {
    const position = (this.positions.at(pos)) as FormGroup;
    const val = +position.get('netPrice').value * (+position.get('vat').value / 100.0);
    return val ?? 0.0;
  }

  public calcGrossAmountForPos(pos: number) {
    const position = (this.positions.at(pos)) as FormGroup;
    return +position.get('netPrice').value + this.calcVatAmountForPos(pos);
  }

  calcSumNet() {
    return this.positions.controls
      .map(e => e as FormGroup)
      .map(e => +e.get('netPrice').value)
      .reduce((a, b) => a + b, 0.0);
  }
  calcSumVat() {
    return this.positions.controls
      .map((e, index) => this.calcVatAmountForPos(index))
      .reduce((a, b) => a + b, 0.0);
  }
  calcSumGross() {
    return this.positions.controls
      .map((e, index) => this.calcGrossAmountForPos(index))
      .reduce((a, b) => a + b, 0.0);
  }

  clear() {
    this.formModel.reset();
  }
}
