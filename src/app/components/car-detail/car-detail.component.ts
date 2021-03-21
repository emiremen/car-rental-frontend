import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car:any;

  constructor(private activatedRoute: ActivatedRoute, private carService: CarService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.carService.getCarById(params["carId"]).subscribe(response =>{
          this.car = response.data;
          console.log(response.data)
        })
      }
    })
  }
}
