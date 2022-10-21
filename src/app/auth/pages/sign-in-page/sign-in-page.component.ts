import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_DEFAULT_VALUE, PASSWORD_DEFAULT_VALUE, PASSWORD_MIN_LENGTH} from "../../../data/Credentials";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  signInFormGroup: FormGroup;
  emailFormControl = new FormControl(EMAIL_DEFAULT_VALUE, [Validators.required,
    Validators.email]);
  passwordFormControl = new FormControl(PASSWORD_DEFAULT_VALUE, [Validators.required,
    Validators.minLength(PASSWORD_MIN_LENGTH)]);

  constructor() {
    this.signInFormGroup = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

  ngOnInit(): void {
  }

}
