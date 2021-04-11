import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CarImageService } from 'src/app/services/carImage.service';
import { ToastrService } from 'ngx-toastr';
import { BankingService } from 'src/app/services/banking.service';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';
import { Banking } from 'src/app/models/banking';
import { error } from 'selenium-webdriver';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { CarImage } from 'src/app/models/carImage';
import { CustomerService } from 'src/app/services/customer.service';
import { UserBankCardService } from 'src/app/services/user-bank-card.service';
import { UserBankCard } from 'src/app/models/userBankCard';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDto: CarDto;
  carUpdateForm: FormGroup;
  rentalAddForm: FormGroup;
  paymentForm: FormGroup;
  bankingForm: FormGroup;
  banking: Banking;

  userBankCards: UserBankCard[];
  selectedBankCard: UserBankCard;

  savedCar: any;
  imgUploadSuccess?: boolean;
  imgFile: File[] = [];

  allBrands: Brand[] = [];
  allColors: Color[] = [];

  startDateForInput: string;
  endDateForInput: string;

  amount: number;
  returnDateInput: Date; //Formdaki dönüş tarihi

  cardNumberInput: number;
  cardUserNameInput: string;
  cardExpiryDateInput: string;

  savedRental: Rental;

  brandValueForForm: Brand;
  colorValueForForm: Color;

  disablePaymentFormSubmit: boolean = false;

  saveCreditCard: boolean = false;

  loggedInUser:User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private bankingService: BankingService,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private carImageService: CarImageService,
    private brandService: BrandService,
    private colorService: ColorService,
    private customerService: CustomerService,
    private userBankCardService: UserBankCardService,
    private userService: UserService,
    private authService:AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.carService.getCarById(params["carId"]).subscribe( response => {
         this.carDto = response.data;
         this.rentalService.getRentalByCarId(response.data.carId).subscribe(response => {
            if (response.data) {
              if (new Date(response.data.returnDate).getTime() > new Date().getTime()) {
                this.startDateForInput = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(response.data.returnDate));
              }
              else {
                this.startDateForInput = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date());
              }
            }
            else {
              this.startDateForInput = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date());
            }
            let limitDate = new Date();
            this.endDateForInput = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(limitDate.setFullYear(limitDate.getFullYear() + 1));
          });
        })
      }
    });

    this.getUser();
    this.getUserBankCard();
    this.createRentalForm();
    this.createPaymentForm();
    this.createBankingForm();
    this.createCarUpdateForm();

  }

  getUser(){
    this.userService.getUserByMail(this.authService.getAuthentication("mail")).subscribe(response => {
      if(response.success){
        this.loggedInUser = response.data;
      }
    });
      }

  createRentalForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: [""],
      customerId: [""],
      rentedDate: [""],
      returnDate: ["", Validators.required]
    });
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      customerId: [""],
      rentalId: [""],
      amount: [""],
      paymentDate: [""]
    });
  }

  createBankingForm() {
    this.bankingForm = this.formBuilder.group({
      nameOnCard: [""],
      cardNumber: [""],
      expiryDate: [""],
      cvc: [""]
    });
  }

   createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: [""],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: [""]
    });
    this.getAllBrands();
    this.getAllColors();
  }

  kirala() {
    let start = new Date(new Intl.DateTimeFormat('en-Us', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(this.startDateForInput)));
    let end = new Date(new Intl.DateTimeFormat('en-Us', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(this.returnDateInput)));

    let diffDays = Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / (1000 * 60 * 60 * 24));

    this.amount = diffDays * this.carDto.dailyPrice;
    this.toastrService.info(diffDays + " gün için ödenecek tutar. ", this.amount + "₺");
  }

  getselectedCreditCard(card: UserBankCard) {
    this.selectedBankCard = card;
  }

  deleteSavedCreditCard(bankCard:UserBankCard){
    this.userBankCardService.deleteUserBankCard(bankCard).subscribe(response=>{
      if(response.success){
        this.toastrService.info("Kartınız başarılı bir şekilde silindi.");
      }
    })
  }

  ode() {

      let bankingModel: any;
      if (this.selectedBankCard) {
        bankingModel = this.selectedBankCard;
      }
      else {
        bankingModel = Object.assign({}, this.bankingForm.value);
        bankingModel.cardNumber = bankingModel.cardNumber.toString();
        bankingModel.cvc = bankingModel.cvc.toString();

      }

      console.log(this.selectedBankCard)
      this.bankingService.getBanking(bankingModel).subscribe(response => {
        console.log(response)
        if (response.success) {
          this.banking = response.data;

          if (response.data.customerFindex >= this.carDto.carFindex) {
            if (response.data.money >= this.amount) {
              if (this.rentalAddForm.valid && this.paymentForm.valid) {

                response.data.money = response.data.money - this.amount;
                this.bankingService.updateBanking(response.data).subscribe(response => {
                  if (response.success) {
                    this.disablePaymentFormSubmit = true;
                    this.toastrService.info("Bakiyeniz güncellendi.");

                    this.addRental();
                    if (this.saveCreditCard) {
                      this.addCreditCard();
                    }

                  }
                });
              }
            }
            else {
              this.toastrService.error("Yetersiz bakiye.")
            }
          }
          else {
            this.toastrService.error("Findex puanınız yetersiz.");
          }
        }
        else{
          this.toastrService.error("Kart bilgisi geçerli değil.")
        }
      },
        responseError => {
          this.toastrService.error("Kart bilgisi geçerli değil.")
          console.error(responseError);
        }
      )
    
  }

  getUserBankCard() {
    this.userBankCardService.getUserBankCard(2).subscribe(response => {
      if (response.success) {
        this.userBankCards = response.data;
      }
    })
  }

  addCreditCard() {
    console.log("addCreditCard motodu calisti")
    this.userBankCardService.addUserBankCard(this.banking).subscribe(response => {
      console.log("servise gitti")
      if (response.success) {
        console.log("Card Added to DB")
      }
    });
  }

  addPayment() {
    let paymentModel: Payment = Object.assign({}, this.paymentForm.value);
    paymentModel.rentalId = this.savedRental.id;
    paymentModel.amount = this.amount;
    this.paymentService.addPayment(paymentModel).subscribe(response => {
      if (response.success) {
        this.toastrService.success(response.message);
      }
    },
      error => {
        console.error(error);
      });
  }

  addRental() {
    let rentalModel: Rental = Object.assign({}, this.rentalAddForm.value);
    rentalModel.carId = this.carDto.carId;
    this.rentalService.addRental(rentalModel).subscribe(response => {
      if (response.success) {
        this.savedRental = response.data;
        this.toastrService.success(response.message);

        this.addPayment();
      }
    },
      error => {
        console.error(error);
      });
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel: Car = Object.assign({}, this.carUpdateForm.value);
      carModel.id = this.carDto.carId;
      this.carService.updateCar(carModel).subscribe(response => {
        console.log("Araç başarıyla güncellendi");
        this.savedCar = response.data;
        console.log(response)
        if (this.imgFile.length > 0) {
          this.addImage();
        }

      },
        responseError => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata");
            }
          }
        }
      );
    }
    else {
      console.error("Formunuz eksik");
    }

  }

  addImage() {
    if (this.imgFile) {
      this.carImageService.addCarImages(this.carDto.carId, this.imgFile).subscribe(response => {
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

  onFileChange(event: any) {
    this.imgFile = event.target.files
    console.log(this.imgFile)
  }
//################################################
   getAllBrands() {
     this.brandService.getBrands().subscribe( response => {
      this.allBrands = response.data;
      for (let i = 0; i < this.allBrands.length; i++) {
        if (this.allBrands[i].carBrand == this.carDto.brandName) {
          this.brandValueForForm = this.allBrands[i];
        }
      }
    });
  }

   getAllColors() {
    this.colorService.getColors().subscribe(response => {
      this.allColors = response.data;
      for (let i = 0; i < this.allColors.length; i++) {
        if (this.allColors[i].carColor == this.carDto.colorName) {
          this.colorValueForForm = this.allColors[i];
        }
      }
    });
  }


  getToDeleteImage(toDeleteImage: CarImage) {
    this.carImageService.deleteCarImage(toDeleteImage).subscribe(response => {
      if (response.success) {
        this.toastrService.info("Resim silindi")
      }
    });
  }

  cardNumberSplit() {
    document.getElementById("card-number").innerHTML = this.cardNumberInput.toString().replace(/\d{4}(?=.)/g, '$& ');
  }
}