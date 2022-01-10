import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { JWTTokenService } from 'src/app/services/jwt-token.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent implements OnInit {
  errorMessage: string = '';
  categories: Category[];
  selectedValue: string;
  formGroup: FormGroup;

  constructor(
    private errorHandler: ErrorHandlerService,
    private transactionsService: TransactionsService,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      date: new FormControl('', { validators: [Validators.required] }),
      category_id: new FormControl('', { validators: [Validators.required] }),
      amount: new FormControl('', { validators: [Validators.required] }),
    });

    this.transactionsService.getCategories().subscribe(
      (resp) => {
        this.loadTansactions(resp);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  }

  onSubmit() {
    debugger
    const tokenString = this.localStorageService.get('token');
    const tokenInfo = this.jwtTokenService.getDecodedAccessToken(tokenString); // decode token
    const userId = tokenInfo.id; // get token expiration dateTime
    console.log(tokenInfo);
    
    const ctrl = new FormControl(userId);
    
    this.formGroup.controls['category_id'].setValue(this.selectedValue);
    this.formGroup.addControl('user_id', ctrl);
    console.log(this.formGroup);
    
    if (this.formGroup.valid) {
      this.transactionsService
        .postTransaction(this.formGroup.value)
        .subscribe((result) => {
          console.log(result);
        }),
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        };
    }
  }

  loadTansactions(categories) {
    this.categories = categories;
  }
}

// import { Component, OnInit } from '@angular/core';
// import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { Category } from 'src/app/models/category.model';
// import { ErrorHandlerService } from 'src/app/services/error-handler.service';
// import { TransactionsService } from 'src/app/services/transactions.service';

// @Component({
//   selector: 'app-new-transaction',
//   templateUrl: './new-transaction.component.html',
//   styleUrls: ['./new-transaction.component.css'],
// })
// export class NewTransactionComponent implements OnInit {
//   selectedValue: string;
//   value = '0.00';
//   isLinear = false;
//   // firstFormGroup: FormGroup;
//   // secondFormGroup: FormGroup;

//   formGroup: FormGroup;

//   dateFormGroup: FormGroup;
//   categoryFormGroup: FormGroup;
//   amountFormGroup: FormGroup;

//   categories: Category[];
//   errorMessage: string = '';

//   steps = [
//     {label: 'Fill the date information', content: 'Choose a date'},
//     {label: 'Fill out the category', content: 'Choose a category'},
//     {label: 'Fill de transactions value', content: 'Insert the value'},
//     {label: 'Done', content: 'Finished!'}
//   ];

//    /** Returns a FormArray with the name 'formArray'. */
//    get formArray(): AbstractControl | null {
//     return this.formGroup.get('formArray');
//   }

//   constructor(
//     private transactionsService: TransactionsService,
//     private errorHandler: ErrorHandlerService,
//     private _formBuilder: FormBuilder,
//   ) {}

//   ngOnInit(): void {
//     this.transactionsService.getCategories().subscribe(
//       (resp) => {
//         this.loadTansactions(resp);
//       },
//       (error) => {
//         this.errorHandler.handleError(error);
//         this.errorMessage = this.errorHandler.errorMessage;
//       }
//     );

//     this.formGroup = this._formBuilder.group({
//       formArray: this._formBuilder.array([
//         this._formBuilder.group({
//           dateFormCtrl: ['', Validators.required],
//         }),
//         this._formBuilder.group({
//           // categoryFormCtrl: ['', Validators.required],
//           categoryFormCtrl: this.buildOrderOptions(),
//         }),
//         this._formBuilder.group({
//           amountFormCtrl: ['', Validators.required],
//         }),
//       ]),
//     });

//     this.dateFormGroup = this._formBuilder.group({
//       dateCtrl: ['', Validators.required],
//     });

//     this.categoryFormGroup = this._formBuilder.group({
//       categoryCtrl: ['', Validators.required],
//     });

//     this.amountFormGroup = this._formBuilder.group({
//       amountCtrl: ['', Validators.required],
//     });

//   }

//   loadTansactions(categories) {
//     this.categories= categories;
//   }

//   onSubmit(){
//     console.log(this.formGroup);
//   }

//   buildOrderOptions() {
//     const values = this.categoryFormGroup.map((v) => new FormControl(false));
//     return this.formBuilder.array(values);
//   }
// }
