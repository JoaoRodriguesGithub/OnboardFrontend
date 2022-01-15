import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  errorMessage: string = '';
  selectedValue: string;
  formGroup: FormGroup;

  constructor( private errorHandler: ErrorHandlerService,
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] }),
      role_id: new FormControl('', { validators: [Validators.required] }),
  })
}

  onSubmit() {
    debugger
    const tokenString = this.localStorageService.get('token');
    const tokenInfo = this.jwtTokenService.getDecodedAccessToken(tokenString);
    const companyId = tokenInfo.company_id;

    const ctrl = new FormControl(companyId);

    this.formGroup.addControl('company_id', ctrl);

    console.log(this.formGroup.value)

    if (this.formGroup.valid) {
      this.profileService
        .AddUser(this.formGroup.value)
        .subscribe((result) => {
          console.log(result);
        }),
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        };
    }
  }
}
