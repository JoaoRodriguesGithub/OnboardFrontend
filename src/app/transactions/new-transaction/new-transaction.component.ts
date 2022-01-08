import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent implements OnInit {
  selectedValue: string;
  value = '0.00';
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  categories: Category[];
  errorMessage: string = '';

  constructor(
    private transactionsService: TransactionsService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void { 
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

  loadTansactions(categories) {
    this.categories= categories;
  }

}
