import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44306/api/";

  constructor(private httpClient: HttpClient) { }

  getUploadOptions = (): HttpHeaders => {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.delete('Content-Type');
    return headers;
  }

  addCarImages(savedCar: Car, imgFile: File[]) {

    const formData = new FormData();
    formData.append("toSavedCarId", savedCar.id.toString());
    //imgFile.forEach(img => {
    //  formData.append("file[]", img);
    //});

    for  (var i =  0; i < imgFile.length; i++)  {  
      formData.append("file",  imgFile[i]);
  } 


    return this.httpClient.post(this.apiUrl + "carimages/add", formData);
  }



}