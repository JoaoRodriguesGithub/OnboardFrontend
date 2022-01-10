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
    const tokenString = this.localStorageService.get('token');
    const tokenInfo = this.jwtTokenService.getDecodedAccessToken(tokenString);
    const userId = tokenInfo.id;

    const ctrl = new FormControl(userId);

    this.formGroup.controls['category_id'].setValue(this.selectedValue);
    this.formGroup.addControl('user_id', ctrl);

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
