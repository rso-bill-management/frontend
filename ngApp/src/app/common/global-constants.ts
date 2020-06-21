import { environment } from 'src/environments/environment';

export class GlobalConstants {
  public static apiURLRegister: string = environment.apiUrl + '/register';
  public static apiURLLogin: string = environment.apiUrl + '/login';
  public static apiURLEvents: string = environment.apiUrl + '/events';
  public static apiURLGetContractorList: string =
    environment.apiUrl + '/contractor-list';
  public static apiURLUpsertContractor: string =
    environment.apiUrl + '/upsert-contractor';
  public static apiURLRemoveContractor: string =
    environment.apiUrl + '/remove-contractor';
}
