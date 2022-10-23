import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Credentials, EMAIL_DEFAULT_VALUE, PASSWORD_DEFAULT_VALUE, PASSWORD_MIN_LENGTH} from "../../../data/Credentials";
import {AuthService} from "../../../core/services/auth/auth.service";
import {FirebaseError} from "../../../core/firebase/FirebaseError";

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

  constructor(private authService: AuthService) {
    this.signInFormGroup = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (!this.signInFormGroup.valid) {
      console.log("Cannot login, because sign in form is not valid");
      return;
    }

    this.authService.login(this.getCredentials()).then(
      user => {
        console.log(user);
      },
      (e: FirebaseError) => {
        console.dir(e.code);
      }
    );
  }

  private getCredentials(): Credentials {
    return {
      email: this.emailFormControl.value ?? '',
      password: this.passwordFormControl.value ?? ''
    };
  }


}
