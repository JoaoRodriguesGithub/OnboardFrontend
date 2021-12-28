import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  selectedValue: string;

  companies: Roles[] = [
    { value: 'Role-0', viewValue: 'Administrator' },
    { value: 'Role-1', viewValue: 'User' }
  ];

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
