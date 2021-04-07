import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44306/api/carimages/";

  constructor(private httpClient: HttpClient) { }

  getImagesByCarId(carId:number): Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  addCarImages(savedCarId: number, imgFile: File[]) {

    const formData = new FormData();
    formData.append("toSavedCarId", savedCarId.toString());

    for  (var i =  0; i < imgFile.length; i++)  {  
      formData.append("file",  imgFile[i]);
  } 
    return this.httpClient.post(this.apiUrl + "add", formData);
  }

  updateCarImage(savedCarId:number, imgFile: File[]) {
    const formData = new FormData();
    formData.append("toSavedCarId", savedCarId.toString());

    for  (var i =  0; i < imgFile.length; i++)  {  
      formData.append("file",  imgFile[i]);
  } 
    return this.httpClient.post(this.apiUrl + "update", formData);
  }

  deleteCarImage(carImage:CarImage): Observable<SingleResponseModel<CarImage>> {
    return this.httpClient.post<SingleResponseModel<CarImage>>(this.apiUrl + "delete", carImage);
  }
}