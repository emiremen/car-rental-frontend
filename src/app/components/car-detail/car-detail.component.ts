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

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDto: CarDto;
  rentalAddForm: FormGroup;
  paymentForm: FormGroup;
  bankingForm: FormGroup;
  savedCar: any;
  imgUploadSuccess?: boolean;
  imgFile: File[] = [];

  startDateForInput: string;
  endDateForInput: string;

  amount: number;
  returnDateInput: Date; //Formdaki dönüş tarihi

  cardNumberInput: number;
  cardUserNameInput: string;
  cardExpiryDateInput: string;

  savedRental: Rental;

  disablePaymentFormSubmit:boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private bankingService: BankingService,
    private rentalService: RentalService,
    private paymentService: PaymentService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.carService.getCarById(params["carId"]).subscribe((response) => {
          this.carDto = response.data;
          this.rentalService.getRentalByCarId(response.data.carId).subscribe(response => {
            if (response.data) {
              this.startDateForInput = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(response.data.returnDate));
            }
            else {
              this.startDateForInput = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date());
            }
            let limitDate = new Date()
            this.endDateForInput = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(limitDate.setFullYear(limitDate.getFullYear() + 1));
          });
        })
      }
    });



    this.createRentalForm();
    this.createPaymentForm();
    this.createBankingForm();


    
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
      nameOnCard: ["", Validators.required],
      cardNumber: ["", Validators.required],
      expiryDate: ["", Validators.required],
      cvc: ["", Validators.required]
    });
  }

  kirala() {
    let start = new Date(new Intl.DateTimeFormat('en-Us', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(this.startDateForInput)));
    let end = new Date(new Intl.DateTimeFormat('en-Us', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(this.returnDateInput)));

    let diffDays = Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / (1000 * 60 * 60 * 24));

    this.amount = diffDays * this.carDto.dailyPrice;
    this.toastrService.info(diffDays + " gün için ödenecek tutar. ", this.amount + "₺");
  }

  ode() {

    if (this.bankingForm.valid) {
      let bankingModel: Banking = Object.assign({}, this.bankingForm.value);
      bankingModel.cardNumber = bankingModel.cardNumber.toString();
      bankingModel.cvc = bankingModel.cvc.toString();
      this.bankingService.getBanking(bankingModel).subscribe(response => {
        if (response.success) {
          if (response.data.money >= this.amount) {
            if (this.rentalAddForm.valid && this.paymentForm.valid) {

              response.data.money = response.data.money - this.amount;
              this.bankingService.updateBanking(response.data).subscribe(response => {
                if(response.success){
                  this.disablePaymentFormSubmit = true;
                this.toastrService.info("Bakiyeniz güncellendi.");


              let rentalModel: Rental = Object.assign({}, this.rentalAddForm.value);
              rentalModel.carId = this.carDto.carId;
              this.rentalService.addRental(rentalModel).subscribe(response => {
                if (response.success) {
                  this.savedRental = response.data;
                  this.toastrService.success(response.message);

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
              },
                error => {
                  console.error(error);
                });

                
              }
            });
            }
          }
          else {
            this.toastrService.error("Yetersiz bakiye.")
          }
        }
      },
        error => {
          console.error(error);
        }
      )
    }



  }


  cardNumberSplit() {
    document.getElementById("card-number").innerHTML = this.cardNumberInput.toString().replace(/\d{4}(?=.)/g, '$& ');

  }
}