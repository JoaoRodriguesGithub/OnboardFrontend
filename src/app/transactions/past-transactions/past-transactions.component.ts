import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// export interface TransactionInterFace {
//   position: number;
//   date: string;
//   category: string;
//   amount: string;
// }

// const ELEMENT_DATA: Transaction[] = [
//   { position: 1, date: '10-12-2021', category: 'Accommodation', amount: '1000,00' },
//   { position: 2, date: '10-12-2021', category: 'Travel', amount: '500,00' },
//   { position: 3, date: '10-12-2021', category: 'Food', amount: '10,00' },
//   { position: 4, date: '10-12-2021', category: 'Food', amount: '20,00' },

// ];

const ELEMENT_DATA: Transaction[] = [];

@Component({
  selector: 'app-past-transactions',
  templateUrl: './past-transactions.component.html',
  styleUrls: ['./past-transactions.component.css']
})
export class PastTransactionsComponent implements OnInit {
  errorMessage: string = '';
  displayedColumns: string[] = ['position', 'date', 'category', 'amount', 'actions'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private transactionService: TransactionsService, private errorHandler: ErrorHandlerService) { }

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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteBotton(element) {
    this.transactionService.deleteTransaction(element.id).subscribe(
      () => {
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  }

}