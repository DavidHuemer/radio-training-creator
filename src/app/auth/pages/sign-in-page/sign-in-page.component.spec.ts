import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInPageComponent} from './sign-in-page.component';
import {Credentials} from "../../../data/Credentials";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "../../../core/services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FirebaseError} from "../../../core/firebase/FirebaseError";

describe('SignInPageComponent', () => {
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;
  let debugElement: DebugElement;
  let authSpy: any;
  let snackBarSpy: any;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['login']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [SignInPageComponent],
      imports: [
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: MatSnackBar, useValue: snackBarSpy}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalid at the beginning', () => {
    expect(component.signInFormGroup.valid).toBeFalse();
  });

  it('should be valid when all required fields are valid', () => {
    const credentials = getCredentialsForValidCheck();
    credentials.forEach(credentialsForCheck => {
      component.emailFormControl.setValue(credentialsForCheck.credentials.email);
      component.passwordFormControl.setValue(credentialsForCheck.credentials.password);

      expect(component.signInFormGroup.valid).toBe(credentialsForCheck.valid);
    });
  });

  it('should set the login button to disabled at the beginning', () => {
    expect(debugElement.query(By.css('.login-button')).nativeElement.disabled).toBeTruthy();
  });

  it('should update the validation by changing the input texts', () => {
    const credentials = getCredentialsForValidCheck();
    let emailInput = debugElement.query(By.css(".email")).nativeElement;
    let passwordInput = debugElement.query(By.css(".password")).nativeElement;
    let loginButton = debugElement.query(By.css('.login-button')).nativeElement;

    credentials.forEach(credentialsForCheck => {
      emailInput.value = credentialsForCheck.credentials.email;
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = credentialsForCheck.credentials.password;
      passwordInput.dispatchEvent(new Event('input'));

      expect(component.signInFormGroup.valid).toBe(credentialsForCheck.valid);

      fixture.detectChanges();

      expect(loginButton.disabled).toBe(!credentialsForCheck.valid);
    });
  });

  it('should not call the auth service when the sign in form is not valid', async () => {
    component.emailFormControl.setValue('');
    component.passwordFormControl.setValue('');

    component.login();
    expect(authSpy.login).toHaveBeenCalledTimes(0);
  });

  it('should call the auth service login method when the sign in form is valid', async () => {
    component.emailFormControl.setValue('max.mustermann@gmail.com');
    component.passwordFormControl.setValue('goodPassword');

    authSpy.login.and.returnValue(Promise.resolve({name: 'david'}))
    component.login();
    expect(authSpy.login).toHaveBeenCalledTimes(1);
  });

  it('should call the mat snackbar when the sign in was not successful', async () => {
    component.emailFormControl.setValue('max.mustermann@gmail.com');
    component.passwordFormControl.setValue('wrongPassword');

    let firebaseError: FirebaseError = {
      code: '',
      name: '',
      customData: null,
      message: '',
      stack: ''
    };

    authSpy.login.and.returnValue(Promise.reject(firebaseError))
    await component.login();
    expect(snackBarSpy.open).toHaveBeenCalledTimes(1);
  });
});


function getCredentialsForValidCheck(): { credentials: Credentials, valid: boolean }[] {
  return [
    getCredentialForCheck('', '', false),
    getCredentialForCheck('max.mustermann@gmail.com', '', false),
    getCredentialForCheck('max', '', false),
    getCredentialForCheck('max.mustermann@gmail.com', 'min', false),
    getCredentialForCheck('max.mustermann@gmail.com', 'goodPassword', true),
  ]
}

function getCredentialForCheck(email: string, password: string, valid: boolean):
  { credentials: Credentials, valid: boolean } {
  return {
    credentials: {
      email,
      password
    },
    valid
  };
}
