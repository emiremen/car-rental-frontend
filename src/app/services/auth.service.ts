import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { PasswordChangeModel } from '../models/passwordChangeModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44306/api/auth/";

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel);
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel);
  }

  changePassword(passwordChangeModel:PasswordChangeModel){
    console.log(passwordChangeModel)
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "changepassword", passwordChangeModel);
  }

  isAuthenticated(key:string){
    if(localStorage.getItem(key)){
      return true;
    }
    return false;
  }

  setAuthentication(key:string, value:string){
    localStorage.setItem(key, value);
  }

  getAuthentication(key:string){
    return localStorage.getItem(key);
  }
  deleteAuthentication(key:string){
    localStorage.removeItem(key);
  }

}
