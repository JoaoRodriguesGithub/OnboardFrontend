import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ActivatedRoute, Params } from '@angular/router';

const ELEMENT_DATA: Transaction[] = [];

@Component({
  selector: 'app-past-transactions',
  templateUrl: './past-transactions.component.html',
  styleUrls: ['./past-transactions.component.css'],
})
export class PastTransactionsComponent implements OnInit {
  //variable to expose the error message
  errorMessage: string = '';

  //variable to expose table headers
  displayedColumns: string[] = [
    'position',
    'date',
    'category',
    'amount',
    'actions',
  ];
  //variable to use on snapshot params to get transaction id
  transaction: { id: number };

  //instancing the data source to use on HTML
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private transactionService: TransactionsService,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.transactionService.getTransaction().subscribe(
      (resp) => {
        console.log(resp);
        this.dataSource = resp;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );

    this.transaction = {
      id: this.activeRoute.snapshot.params['id']
    }
    this.activeRoute.params.subscribe((params:Params) => {
      this.transaction = {
        id: params ['id']
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteBotton(element) {
    this.transactionService.deleteTransaction(element.id).subscribe(
      () => {
        this.ngOnInit();
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  }
}
