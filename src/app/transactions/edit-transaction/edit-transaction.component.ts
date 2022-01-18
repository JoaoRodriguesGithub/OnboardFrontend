import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { JWTTokenService } from 'src/app/services/jwt-token.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css'],
})
export class EditTransactionComponent implements OnInit {
  //variable to display the error message on HTML
  errorMessage: string = '';

  //variable to diplay all categories on HTML
  categories: Category[];
 
  //variable that stores the selected value on categories
  selectedValue: string;
 
  //variable for the HTML form
  formGroup: FormGroup;

  //valiable to store transaction id number
  transactionId: { id: number };

  constructor(
    private errorHandler: ErrorHandlerService,
    private transactionsService: TransactionsService,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Setting up the form validators
    this.formGroup = new FormGroup({
      date: new FormControl('', { validators: [Validators.required] }),
      category_id: new FormControl('', { validators: [Validators.required] }),
      amount: new FormControl('', { validators: [Validators.required] }),
    });
    //Getting all categories from API
    this.transactionsService.getCategories().subscribe(
      (resp) => {
        this.loadTansactions(resp);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );
    //this calls the method to fill the edit form
    this.fillForm();
  }

  onSubmit() {
    //variable to store the token
    const tokenString = this.localStorageService.get('token');
    //variable to decode the token
    const tokenInfo = this.jwtTokenService.getDecodedAccessToken(tokenString);
    //variable to store the token id
    const userId = tokenInfo.id;
    //variable to store the transaction id
    const transactionId = this.activeRoute.snapshot.params['id'];

    const ctrl = new FormControl(userId);
    const ctrl2 = new FormControl(transactionId);

    this.formGroup.controls['category_id'].setValue(this.selectedValue);
    this.formGroup.addControl('user_id', ctrl);
    this.formGroup.addControl('id', ctrl2);

    if (this.formGroup.valid) {
      this.transactionsService
        .editTransaction(this.formGroup.value)
        .subscribe(() => {
          this.router.navigate(['transactions'])
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

  //This method fills does a request to get transaction info and does de form fill when editing a transaction
  fillForm() {
    const transactionId = this.activeRoute.snapshot.params['id'];

    this.transactionsService.getTransaction(transactionId).subscribe((resp)=> {
      this.formGroup.get('date').setValue(resp.date)
      this.formGroup.get('category_id').setValue(resp.category_id)
      this.formGroup.get('amount').setValue(resp.amount)
    })
  }
}
