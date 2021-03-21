import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44306/api/";

  constructor(private httpClient:HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId:number): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbyid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandName(brandName:string): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbybrandname?brandName=" + brandName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorName(colorName:string): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycolorname?colorName=" + colorName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  
  getCarsByFiltered(brandName:string, colorName:string): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbyfiltered?brandName=" + brandName + "&colorName=" + colorName;
    //let newPath = this.apiUrl + "cars/getcardetailsbyfilteredb?randName=${brandName}&colorName=${colorName}";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}