import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44306/api/colors/";

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "getall");
  }

  addColor(carColor:string): Observable<SingleResponseModel<Color>> {
    return this.httpClient.post<SingleResponseModel<Color>>(this.apiUrl + "add", {carColor});
  }

  updateColor(carColor:Color): Observable<SingleResponseModel<Color>> {
    return this.httpClient.post<SingleResponseModel<Color>>(this.apiUrl + "update", carColor);
  }

  deleteColor(carColor:Color): Observable<SingleResponseModel<Color>> {
    return this.httpClient.post<SingleResponseModel<Color>>(this.apiUrl + "delete", carColor);
  }
}