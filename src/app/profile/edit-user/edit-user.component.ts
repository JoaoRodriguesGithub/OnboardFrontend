import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { JWTTokenService } from 'src/app/services/jwt-token.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  //variable to display the error message on HTML
  errorMessage: string = '';
  //variable for the HTML form
  formGroup: FormGroup;

  constructor(
    private errorHandler: ErrorHandlerService,
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //Setting up the form validators
    this.formGroup = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    const tokenString = this.localStorageService.get('token');
    const tokenInfo = this.jwtTokenService.getDecodedAccessToken(tokenString);
    const userId = tokenInfo.id;

    const profileId = this.activeRoute.snapshot.params['id'];

    // const ctrl = new FormControl(userId);
    const ctrl2 = new FormControl(profileId);


    // this.formGroup.addControl('user_id', ctrl);
    this.formGroup.addControl('id', ctrl2);

    if (this.formGroup.valid) {
      this.profileService
        .editUser(this.formGroup.value)
        .subscribe(() => {
        }),
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        };
    }
  }
}
