import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44306/api/users/";

  constructor(private httpClient:HttpClient) { }

  getUserByMail(mail:string):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + "getbymail?mail=" + mail);
  }

  update(user:User):Observable<SingleResponseModel<User>>{
    return this.httpClient.post<SingleResponseModel<User>>(this.apiUrl + "update", user);
  }
}
