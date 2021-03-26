import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { CarImageService } from 'src/app/services/carImage.service';
import { Car } from 'src/app/models/car';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDto: any;
  carAddForm!: FormGroup;
  savedCar:any;
  imgUploadSuccess?: boolean;
  imgFile: File[] = [];

  
  constructor(private activatedRoute: ActivatedRoute, private carService: CarService, private formBuilder: FormBuilder, private carImageService:CarImageService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.carService.getCarById(params["carId"]).subscribe((response) => {
          this.carDto = response.data;
        })
      }
    })

    this.createCarProduct();
  }

  createCarProduct() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: [""]
    });
  }

  addImage(){
    if(this.imgFile){
      this.carImageService.addCarImages(this.savedCar, this.imgFile).subscribe(response =>{
        this.imgUploadSuccess = true;
        console.warn(response)
      },
      error =>{
        this.imgUploadSuccess = false;
        console.warn(error)
      });
    }
      else{
        console.log("Dosya boş")
      }
    
  }

  addCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(response => {
        console.log("Araç başarıyla eklendi");
        this.savedCar = response.data;
        console.log(response)
        this.addImage();
      },
      error => {
        console.log(error)
      }
      );
    }
    else {
      console.error("Formunuz eksik");
    }

  }

  onFileChange(event:any){
    this.imgFile = event.target.files
    console.log(this.imgFile)
  }

}
