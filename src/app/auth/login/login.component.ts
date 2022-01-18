import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { JWTTokenService } from 'src/app/services/jwt-token.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  message = 'Welcome ';
  action = 'Close';

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (result) => {
          this.localStorageService.set('token', result.token);
          this.router.navigate(['transactions']);
          const token = this.localStorageService.get('token');
          const stringToken = this.jwtTokenService.getDecodedAccessToken(token)
          const userName = stringToken.name;
          this._snackBar.open(this.message.concat(userName), this.action, { duration: 5000 });
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }
      );
    }
  }

}
