import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44306/api/colors/";

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "getall");
  }

  addColor(color:Color): Observable<ListResponseModel<Color>> {
    const colorFormData = new FormData();
    colorFormData.append("brand", color.carColor)
    return this.httpClient.post<ListResponseModel<Color>>(this.apiUrl + "add", color);
  }

}