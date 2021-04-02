import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  cars: CarDto[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  routulacakLink: string = "";

  currentBrand!: Brand;
  currentColor!: Color;

  constructor(private brandService: BrandService, private carService: CarService, private colorService: ColorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();

  }

  //////////// Brand ////////////

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
    this.setRouterLink();
    this.router.navigate([this.routulacakLink]) // ilk string link gerisi parametre
  }

  clearCurrentBrand() {
    this.currentBrand = undefined;
    this.setRouterLink();
    this.router.navigate([this.routulacakLink])
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return "list-group-item list-group-item-action bg-dark table-hover text-white active";
    }
    else {
      return "list-group-item list-group-item-action bg-dark table-hover text-white";
    }
  }
  getAllBrandsClass() {
    if (!this.currentBrand || this.currentBrand.carBrand == "") {
      return "list-group-item list-group-item-action bg-dark table-hover text-white active";
    }
    else {
      return "list-group-item list-group-item-action bg-dark table-hover text-white";
    }
  }

  //////////// Color ////////////

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
    this.setRouterLink();
    this.router.navigate([this.routulacakLink])
    //this.router.navigate([this.routulacakLink, this.currentColor.carColor])
  }

  clearCurrentColor() {
    this.currentColor = undefined;
    this.setRouterLink();
    this.router.navigate([this.routulacakLink])
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return "list-group-item list-group-item-action bg-dark table-hover text-white active";
    }
    else {
      return "list-group-item list-group-item-action bg-dark table-hover text-white";
    }
  }
  getAllColorsClass() {
    if (!this.currentColor || this.currentColor.carColor == "") {
      return "list-group-item list-group-item-action bg-dark table-hover text-white active";
    }
    else {
      return "list-group-item list-group-item-action bg-dark table-hover text-white";
    }
  }

  /////////  /////////

  setRouterLink() {

    if (this.currentBrand && this.currentColor) {
      this.routulacakLink = "/content/filtered/" + this.currentBrand.carBrand + "/" + this.currentColor.carColor;
    }
    else if (this.currentBrand) {
      this.routulacakLink = "/content/cars/brand/" + this.currentBrand.carBrand;
    }
    else if (this.currentColor) {
      this.routulacakLink = "/content/cars/color/" + this.currentColor.carColor;
    }
    else {
      this.routulacakLink = "/content/cars/";
    }
    console.log(this.routulacakLink);

  }
}
