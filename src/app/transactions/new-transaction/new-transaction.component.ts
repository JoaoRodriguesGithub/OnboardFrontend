import { Component, OnInit,  } from '@angular/core';
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
   //variable to display the error message on HTML
  errorMessage: string = '';
  //variable to diplay all categories on HTML
  categories: Category[];
  //variable that stores the selected value on categories
  selectedValue: string;
  //variable for the HTML form
  formGroup: FormGroup;
 
  constructor(
    private errorHandler: ErrorHandlerService,
    private transactionsService: TransactionsService,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService
  ) { }

  ngOnInit(): void {
    //creating the formGroup
    this.formGroup = new FormGroup({
      date: new FormControl('', { validators: [Validators.required] }),
      category_id: new FormControl('', { validators: [Validators.required] }),
      amount: new FormControl('', { validators: [Validators.required] }),
    });
    //Getting all transactions from the API
    this.transactionsService.getTransactions().subscribe((resp) => {
    },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
    //Getting all categories from the API
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
    //variable to store the token
    const tokenString = this.localStorageService.get('token');
    //variable to decode the token
    const tokenInfo = this.jwtTokenService.getDecodedAccessToken(tokenString);
    //variable to store the token id
    const userId = tokenInfo.id;

    const ctrl = new FormControl(userId);

    this.formGroup.controls['category_id'].setValue(this.selectedValue);
    this.formGroup.addControl('user_id', ctrl);

    if (this.formGroup.valid) {
      this.transactionsService
        .postTransaction(this.formGroup.value)
        .subscribe((result) => {
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
