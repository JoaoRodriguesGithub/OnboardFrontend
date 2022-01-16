import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { JWTTokenService } from 'src/app/services/jwt-token.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  //variable to store the error message to show on HTML
  errorMessage: string = '';
  //variable to create de formGroup
  formGroup: FormGroup;
  //variable to hold the formgroup subscription
  subscription: Subscription;

  constructor( private errorHandler: ErrorHandlerService,
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] }),
  })
}

  onSubmit() {
    //this variable gets the token from the local storage
    const tokenString = this.localStorageService.get('token');
    //this variable stores the decoded jwt token from the logged user
    const tokenInfo = this.jwtTokenService.getDecodedAccessToken(tokenString);
    //this variable will get the company id from the logged in user token
    const companyId = tokenInfo.company_id;
    //this variable will define that all new users created will be with role 2
    const roleId: number = 2;
    
    //this variables creates two new form controls to be added on the fromGroup
    const ctrl = new FormControl(companyId);
    const ctrl2 = new FormControl(roleId);

    //Adding the two fields to the formGroup
    this.formGroup.addControl('company_id', ctrl);
    this.formGroup.addControl('role_id', ctrl2);

    //Logic to submit is having the formgroup valid to go api endpoint to post new user.
    if (this.formGroup.valid) {
      this.subscription = this.profileService
        .AddUser(this.formGroup.value)
        .subscribe((result) => {
          console.log(result);
        }),
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        };
    }
    this.formGroup.reset();
  }

}
