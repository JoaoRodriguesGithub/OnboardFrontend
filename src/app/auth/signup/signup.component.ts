import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  
  companies: Company[];
  
  selectedValue: string;

  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.getCompanies(this.companies).subscribe(
      (resp) => {
        this.loadCompanies(resp);
      }
    )
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  loadCompanies(companies){
    this.companies = companies;
  }
}
