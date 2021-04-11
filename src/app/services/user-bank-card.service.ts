import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserBankCard } from '../models/userBankCard';

@Injectable({
  providedIn: 'root'
})
export class UserBankCardService {

  apiUrl = "https://localhost:44306/api/userbankcards/";

  constructor(private httpClient: HttpClient) { }

  getUserBankCard(userId: number): Observable<ListResponseModel<UserBankCard>> {
    return this.httpClient.get<ListResponseModel<UserBankCard>>(this.apiUrl + "get?userid=" + userId);
  }

  updateUserBankCard(userBankCard: UserBankCard): Observable<SingleResponseModel<UserBankCard>> {
    return this.httpClient.post<SingleResponseModel<UserBankCard>>(this.apiUrl + "update", userBankCard);
  }

  addUserBankCard(userBankCard: UserBankCard): Observable<SingleResponseModel<UserBankCard>> {
    return this.httpClient.post<SingleResponseModel<UserBankCard>>(this.apiUrl + "add", userBankCard);
  }

  deleteUserBankCard(userBankCard: UserBankCard): Observable<SingleResponseModel<UserBankCard>> {
    return this.httpClient.post<SingleResponseModel<UserBankCard>>(this.apiUrl + "delete", userBankCard);
  }
}