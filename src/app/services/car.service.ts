import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44306/api/";

  constructor(private httpClient:HttpClient) { }

  getCars(): Observable<ListResponseModel<CarDto>>{
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarById(carId:number): Observable<ListResponseModel<CarDto>>{
    let newPath = this.apiUrl + "cars/getcardetailsbyid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByBrandName(brandName:string): Observable<ListResponseModel<CarDto>>{
    let newPath = this.apiUrl + "cars/getcardetailsbybrandname?brandName=" + brandName;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByColorName(colorName:string): Observable<ListResponseModel<CarDto>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycolorname?colorName=" + colorName;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  
  getCarsByFiltered(brandName:string, colorName:string): Observable<ListResponseModel<CarDto>>{
    let newPath = this.apiUrl + "cars/getcardetailsbyfiltered?brandName=" + brandName + "&colorName=" + colorName;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  addCar(car:Car): Observable<ListResponseModel<Car>>{
    car.brandId = (Number)(car.brandId)
    car.colorId = (Number)(car.colorId)
    return this.httpClient.post<ListResponseModel<Car>>(this.apiUrl + "cars/addcar", car)
  }
}