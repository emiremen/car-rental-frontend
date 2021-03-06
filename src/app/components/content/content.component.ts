import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { RentalsDto } from 'src/app/models/rentalDto';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  cars: CarDto[] = [];
  rentals: RentalsDto[] = [];

  rentalsLoaded: boolean = false;
  carsLoaded: boolean = false;

  filterText:string = "";

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
