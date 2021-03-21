import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  cars: Car[] = [];
  rentals: Rental[] = [];

  rentalsLoaded: boolean = false;
  carsLoaded: boolean = false;

  constructor(private carService: CarService, private rentalService: RentalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandName"] && params["colorName"]) {
        this.getCarsByFiltered(params["brandName"], params["colorName"])
      }
      else if (params["brandName"]) {
        this.getCarsByBrandName(params["brandName"])
      }
      else if (params["colorName"]) {
        this.getCarsByColorName(params["colorName"])
      }
      else{
        this.getCars();
      }
    });

    if(Object.getOwnPropertyNames(this.cars)){

    }
  }

  ///////// Cars /////////

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.carsLoaded = true;
    })
  }

  getCarsByBrandName(brandName: string) {
    this.carService.getCarsByBrandName(brandName).subscribe(response => {
      this.cars = response.data;
      this.carsLoaded = true;
    })
  }
  
  getCarsByFiltered(brandName: string, colorName:string) {
    this.carService.getCarsByFiltered(brandName, colorName).subscribe(response => {
      this.cars = response.data;
      this.carsLoaded = true;
    })
  }

  getCarsByColorName(colorName: string) {
    this.carService.getCarsByColorName(colorName).subscribe(response => {
      this.cars = response.data;
      this.carsLoaded = true;
    })
  }

  ///////// Rantals /////////

  getRentals() {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
      this.rentalsLoaded = true;
    })
  }

}
