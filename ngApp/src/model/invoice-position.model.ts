export interface InvoicePosition {
  title: string;
  count: number;
  unit: string;
  netPrice: number; // netto
  vat: number; // 0 - 100
  vatAmount: number;
  grossPrice: number; // brutto
}
