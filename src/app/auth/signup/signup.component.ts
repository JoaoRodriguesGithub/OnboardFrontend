import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  companies: Company[];
  errorMessage: string = '';

  selectedValue: string;

  constructor(private authService: AuthService, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.authService.getCompanies(this.companies).subscribe(
      (resp) => {
        this.loadCompanies(resp);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    )
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      this.authService.signup(form.value).subscribe(result => {
        console.log(result);
      }),
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        };
    }
  }
  
  loadCompanies(companies) {
    this.companies = companies;
  }
}
