import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44306/api/payments/";

  constructor(private httpClient: HttpClient) { }

  getPayments(): Observable<ListResponseModel<Payment>>{
    return this.httpClient.get<ListResponseModel<Payment>>(this.apiUrl);
  }

  addPayment(payment:Payment): Observable<ListResponseModel<Payment>>{
    payment.customerId = 1;
    payment.paymentDate = new Date();
    return this.httpClient.post<ListResponseModel<Payment>>(this.apiUrl + "add", payment)
  }
}