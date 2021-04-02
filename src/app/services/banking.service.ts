import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banking } from '../models/banking';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  apiUrl = "https://localhost:44306/api/bankings/";

  constructor(private httpClient: HttpClient) { }

  getBanking(banking:Banking):Observable<SingleResponseModel<Banking>>{
    return this.httpClient.post<SingleResponseModel<Banking>>(this.apiUrl + "getbyfilter", banking);
  }

  updateBanking(banking:Banking):Observable<SingleResponseModel<Banking>>{
    return this.httpClient.post<SingleResponseModel<Banking>>(this.apiUrl + "update", banking);
  }












  // getBanking(banking:Banking){
  //   const params = new HttpParams()
  //   .set('id', '')
  //   .set('userId', '2')
  //   .set('nameOnCard', banking.nameOnCard)
  //   .set('cardNumber', banking.cardNumber)
  //   .set('expiryDate', banking.expiryDate)
  //   .set('cvc', banking.cvc);
    
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');

  //   return this.httpClient.get<SingleResponseModel<Banking>>(this.apiUrl + "getbyfilter", {headers,params});
  // }


}
