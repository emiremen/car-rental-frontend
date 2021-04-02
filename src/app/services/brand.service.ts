import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44306/api/brands/";

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "getall");
  }

  addBrand(carBrand:string): Observable<ListResponseModel<Brand>> {
    return this.httpClient.post<ListResponseModel<Brand>>(this.apiUrl + "add", {carBrand});// gönderdiğin değişken ismi ile backenddeki sınıf içerisindeki isim aynı olmalı
  }
}