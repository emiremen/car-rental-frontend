import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44306/api/brands/";

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "getall");
  }

  addBrand(carBrand:string): Observable<SingleResponseModel<Brand>> {
    return this.httpClient.post<SingleResponseModel<Brand>>(this.apiUrl + "add", {carBrand});// gönderdiğin değişken ismi ile backenddeki sınıf içerisindeki isim aynı olmalı
  }

  updateBrand(carBrand:Brand): Observable<SingleResponseModel<Brand>> {
    return this.httpClient.post<SingleResponseModel<Brand>>(this.apiUrl + "update", carBrand);// gönderdiğin değişken ismi ile backenddeki sınıf içerisindeki isim aynı olmalı
  }

  deleteBrand(carBrand:Brand): Observable<SingleResponseModel<Brand>> {
    return this.httpClient.post<SingleResponseModel<Brand>>(this.apiUrl + "delete", carBrand);// gönderdiğin değişken ismi ile backenddeki sınıf içerisindeki isim aynı olmalı
  }
}