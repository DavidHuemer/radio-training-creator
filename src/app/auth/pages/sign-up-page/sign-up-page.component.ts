import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {RadioTrainingErrorStateMatcher} from "../../../core/error/RadioTrainingErrorStateMatcher";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  signUpFormGroup: FormGroup;
  firstNameFormControl = new FormControl('', Validators.required);
  lastNameFormControl = new FormControl('', Validators.required);
  emailFormControl = new FormControl('', Validators.email);
  passwordFormControl = new FormControl('', Validators.required);
  repeatPasswordFormControl = new FormControl('');

  matcher = new RadioTrainingErrorStateMatcher();

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let passwordControl = group.get('password');
    let confirmPasswordControl = group.get('repeatPassword');

    if (passwordControl == null || confirmPasswordControl == null) return {notSame: true};

    let pass = passwordControl.value;
    let confirmPass = confirmPasswordControl.value
    return pass === confirmPass ? null : {notSame: true}
  }

  constructor() {
    this.signUpFormGroup = new FormGroup({
      firstName: this.firstNameFormControl,
      email: this.emailFormControl,
      lastName: this.lastNameFormControl,
      password: this.passwordFormControl,
      repeatPassword: this.repeatPasswordFormControl
    }, {validators: this.checkPasswords});
  }

  ngOnInit(): void {
  }

}
