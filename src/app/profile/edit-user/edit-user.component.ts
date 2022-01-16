import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
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
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //Setting up the form validators
    this.formGroup = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    //const to store the snapshot of user id on url
    const profileId = this.activeRoute.snapshot.params['id'];
    
    //const to create a new control for profile id
    const ctrl2 = new FormControl(profileId);

    //adding the form field id to de formgroup
    this.formGroup.addControl('id', ctrl2);

    if (this.formGroup.valid) {
      this.profileService
        .editUser(this.formGroup.value)
        .subscribe(() => {
          this.router.navigate(['profile'])
        }),
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        };
    }
  }
}
