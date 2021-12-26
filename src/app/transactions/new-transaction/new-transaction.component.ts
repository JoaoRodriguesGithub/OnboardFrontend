import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators} from '@angular/forms';

interface Categories {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  selectedValue: string;
  value = '0.00';
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  categories: Categories[] = [
    { value: 'category-0', viewValue: 'Accommodation' },
    { value: 'category-1', viewValue: 'Travel' },
    { value: 'category-2', viewValue: 'Food' },
  ];

  constructor() {}

  ngOnInit(): void {

  }

}
