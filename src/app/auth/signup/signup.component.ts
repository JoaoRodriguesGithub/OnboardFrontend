import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Companies {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  selectedValue: string;

  companies: Companies[] = [
    { value: 'Company-0', viewValue: 'onBoard' },
    { value: 'Company-1', viewValue: 'xpto' },
    { value: 'Company-2', viewValue: 'r2022' },
    { value: 'Company-3', viewValue: 'IPCA' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
