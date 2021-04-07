import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  carAddForm: FormGroup;
  savedCar: any;
  imgUploadSuccess: boolean;
  imgFile: File[] = [];

  toSaveBrand: Brand= {id:null, carBrand: null};
  toSaveColor: Color= {id:null, carColor: null};

  allBrands: Brand[] = [];
  allColors: Color[] = [];

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private carImageService: CarImageService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllColors();
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

  addImage() {
    if (this.imgFile) {
      this.carImageService.addCarImages(this.savedCar.id, this.imgFile).subscribe(response => {
        this.imgUploadSuccess = true;
        console.warn(response)
      },
        error => {
          this.imgUploadSuccess = false;
          console.warn(error)
        });
    }
    else {
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
        if (this.imgFile.length > 0) {
          this.addImage();
        }

      },
        responseError => {
          console.log(responseError)
          if(responseError.error.Errors.length > 0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Hata");
            }
          }
        }
      );
    }
    else {
      console.error("Formunuz eksik");
    }

  }

  onFileChange(event: any) {
    this.imgFile = event.target.files
    console.log(this.imgFile)
  }

  addBrand(brandName:string) {
    this.brandService.addBrand(brandName).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Yeni marka başarılı bir şekilde eklendi.", "Başarılı")
      }
    });
  }
  addColor(colorName:string) {
    this.colorService.addColor(colorName).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Yeni renk başarılı bir şekilde eklendi.", "Başarılı")
      }
    });
  }


  updateBrand(id:any, brandName:any) {
    let brandModel: Brand = {id: parseInt(id), carBrand: brandName };
    this.brandService.updateBrand(brandModel).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Marka başarılı bir şekilde güncellendi.", "Başarılı")
      }
    });
  }
  updateColor(id:any ,colorName:any) {
    let colorModel: Color = {id: parseInt(id), carColor: colorName};
    console.log(colorModel)
    this.colorService.updateColor(colorModel).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Renk başarılı bir şekilde güncellendi.", "Başarılı")
      }
    });
  }


  deleteBrand(id:any, brandName:any) {
    let brandModel: Brand = {id: parseInt(id), carBrand: brandName };
    this.brandService.deleteBrand(brandModel).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Marka başarılı bir şekilde silindi.", "Başarılı")
      }
    });
  }
  deleteColor(id:any ,colorName:any) {
    let colorModel: Color = {id: parseInt(id), carColor: colorName};
    console.log(colorModel)
    this.colorService.deleteColor(colorModel).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Renk başarılı bir şekilde silindi.", "Başarılı")
      }
    });
  }
  getAllBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.allBrands = response.data;
    });
  }

  getAllColors() {
    this.colorService.getColors().subscribe(response => {
      this.allColors = response.data;
    });
  }

}
