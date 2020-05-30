import {InvoicePosition} from './invoice-position.model';
import {PaymentType} from './payment.type';
import {Contractor} from './contractor.model';

export interface InvoiceModel {
  number: string;
  dateIssue: Date;
  placeIssue: string;
  saleDate: Date;
  contractor: Contractor;
  positions: InvoicePosition[];
  netPriceSum: number; // suma netto
  vatSum: number; // suma vatu z pozycji
  grossSum: number; // suma brutto
  paymentType: PaymentType;
  paymentDays: number;
}
