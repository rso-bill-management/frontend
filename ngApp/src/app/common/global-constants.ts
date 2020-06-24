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
  public static apiURLGetSellerData: string =
    environment.apiUrl + '/get-seller';
  public static apiURLUpsertSeller: string =
    environment.apiUrl + '/upsert-seller';

  public static apiURLAddPredefinedInvoice: string =
    GlobalConstants.apiURLInvoice + '/predefined_items';

  public static apiURLGetPredefinedInvoice: string =
    GlobalConstants.apiURLInvoice + '/predefined_items';
}
