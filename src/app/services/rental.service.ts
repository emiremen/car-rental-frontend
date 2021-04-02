import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalsDto } from '../models/rentalDto';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44306/api/rentals/";

  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<RentalsDto>>{
    return this.httpClient.get<ListResponseModel<RentalsDto>>(this.apiUrl + "getall");
  }

  getRentalByCarId(carId:number): Observable<SingleResponseModel<Rental>>{
    return this.httpClient.get<SingleResponseModel<Rental>>(this.apiUrl + "getbycarid?carId=" + carId);
  }

  addRental(rental:Rental): Observable<SingleResponseModel<Rental>>{
    rental.customerId = 1;
    rental.rentedDate = new Date();
    return this.httpClient.post<SingleResponseModel<Rental>>(this.apiUrl + "add", rental)
  }
}
