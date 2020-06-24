import { environment } from 'src/environments/environment';

export class GlobalConstants {
  public static apiURLRegister: string = environment.apiUrl + '/register';
  public static apiURLLogin: string = environment.apiUrl + '/login';
  public static apiURLEvents: string = environment.apiUrl + '/events';
  public static apiURLInvoice: string = environment.apiUrl + '/invoicing';

  public static apiURLGetContractorList: string =
    environment.apiUrl + '/invoicing/contractors';
  public static apiURLUpsertContractor: string =
    environment.apiUrl + '/invoicing/contractors';
  public static apiURLRemoveContractor: string =
    environment.apiUrl + '/remove-contractor';
  public static apiURLSetSeller: string =
    environment.apiUrl + '/invoicing/set_seller';
  public static apiURLGetSeller: string =
    environment.apiUrl + '/invoicing/seller';

  public static apiURLAddPredefinedInvoice: string =
    GlobalConstants.apiURLInvoice + '/predefined_items';

  public static apiURLGetPredefinedInvoice: string =
    GlobalConstants.apiURLInvoice + '/predefined_items';

  public static apiURLGetInvoicesList: string =
    GlobalConstants.apiURLInvoice + '/invoices';
}
