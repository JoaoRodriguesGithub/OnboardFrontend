import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators} from '@angular/forms';

interface Categories {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {
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