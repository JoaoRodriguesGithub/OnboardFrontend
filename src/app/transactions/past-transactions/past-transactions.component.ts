import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Transaction {
  position: number;
  date: string;
  category: string;
  amount: string;
}

const ELEMENT_DATA: Transaction[] = [
  { position: 1, date: '10-12-2021', category: 'Accommodation', amount: '1000,00' },
  { position: 2, date: '10-12-2021', category: 'Travel', amount: '500,00' },
  { position: 3, date: '10-12-2021', category: 'Food', amount: '10,00' },
  { position: 4, date: '10-12-2021', category: 'Food', amount: '20,00' },

];

@Component({
  selector: 'app-past-transactions',
  templateUrl: './past-transactions.component.html',
  styleUrls: ['./past-transactions.component.css']
})
export class PastTransactionsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'date', 'category', 'amount', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}