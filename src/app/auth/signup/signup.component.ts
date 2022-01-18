import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  message = 'Form submitted successfully!';
  action = 'Close';

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.getCompanies(this.companies).subscribe(
      (resp) => {
        this.loadCompanies(resp);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.signup(form.value).subscribe((result) => {
        this._snackBar.open(this.message, this.action, {
          duration: 5000,
        });
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
