import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignUpPageComponent} from './sign-up-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserCreationData} from "../../../core/data/User";
import {AuthService} from "../../../core/services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FirebaseError} from "../../../core/firebase/FirebaseError";
import {AuthFooterComponent} from "../../components/auth-footer/auth-footer.component";
import {UserService} from "../../../core/services/auth/user.service";

interface ComponentUserCreationData extends UserCreationData {
  repeatPassword: string,
}

interface UserCreationDataForValidCheck extends ComponentUserCreationData {
  expectedValid: boolean;
}

const inValidComponentUserCreationData: ComponentUserCreationData
  = getUserCreationDataForValidCheck('', '', '',
  '', '', false);

const validComponentUserCreationData: ComponentUserCreationData
  = getUserCreationDataForValidCheck('max', 'mustermann', 'max.mustermann@gmail.com',
  'strongPass', 'strongPass', true);

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;
  let authSpy: any;
  let userServiceSpy: any;
  let snackBarSpy: any;


  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['signUp']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['createUser']);

    await TestBed.configureTestingModule({
      declarations: [SignUpPageComponent, AuthFooterComponent],
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
        {provide: MatSnackBar, useValue: snackBarSpy},
        {provide: UserService, useValue: userServiceSpy},
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid at the beginning', function () {
    expect(component.signUpFormGroup.valid).toBeFalsy();
  });

  it('should be valid when all required fields are valid', () => {
    const userCreationDataArr = getUserCreationDataArrayForValidCheck();
    userCreationDataArr.forEach(userCreationData => {
      updateComponentByUserCreationData(component, userCreationData);
      expect(component.signUpFormGroup.valid).toBe(userCreationData.expectedValid);
    });
  });

  it('should not call the auth service when the sign up form is not valid', async () => {
    updateComponentByUserCreationData(component, inValidComponentUserCreationData);
    await component.signUp();
    expect(authSpy.signUp).toHaveBeenCalledTimes(0);
  });

  it('should call the auth service when the sign up form is valid', async () => {
    updateComponentByUserCreationData(component, validComponentUserCreationData);
    authSpy.signUp.and.returnValue(Promise.resolve(
      {
        user: {
          uid: 'newUid'
        }
      }
    ));
    await component.signUp();
    expect(authSpy.signUp).toHaveBeenCalledTimes(1);
  });

  it('should open the snack bar when the user creation was not successful', async () => {
    updateComponentByUserCreationData(component, validComponentUserCreationData);

    let firebaseError: FirebaseError = {
      code: '',
      name: '',
      customData: null,
      message: '',
      stack: ''
    };

    authSpy.signUp.and.returnValue(Promise.reject(firebaseError))
    await component.signUp();
    expect(snackBarSpy.open).toHaveBeenCalledTimes(1);
  });

  it('should call the create user method of the user service when the user is signed up ' +
    'successfully', async () => {
    updateComponentByUserCreationData(component, validComponentUserCreationData);
    let returningCredentials = {
      user: {
        uid: 'newUid'
      }
    };

    authSpy.signUp.and.returnValue(Promise.resolve(returningCredentials));
    await component.signUp();
    expect(userServiceSpy.createUser).toHaveBeenCalledTimes(1);
  });
});

function getUserCreationDataArrayForValidCheck(): UserCreationDataForValidCheck[] {
  return [
    getUserCreationDataForValidCheck('', '', '', '', '', false),

    getUserCreationDataForValidCheck('Max', '', '', '', '',
      false),

    getUserCreationDataForValidCheck('Max', 'Mustermann', '', '', '',
      false),

    getUserCreationDataForValidCheck('Max', 'Mustermann', 'max.mustermann@gmail.com', '',
      '', false),

    getUserCreationDataForValidCheck('Max', 'Mustermann', 'max.mustermann@gmail.com',
      'strongPass', '', false),

    getUserCreationDataForValidCheck('Max', 'Mustermann', 'max.mustermann@gmail.com',
      'strongPass', 'wrongPass', false),

    getUserCreationDataForValidCheck('Max', 'Mustermann', 'max.mustermann@gmail.com',
      'strongPass', 'strongPass', true),
  ];
}

function updateComponentByUserCreationData(component: SignUpPageComponent,
                                           componentCreationData: ComponentUserCreationData) {
  component.firstNameFormControl.setValue(componentCreationData.firstName);
  component.lastNameFormControl.setValue(componentCreationData.lastName);
  component.emailFormControl.setValue(componentCreationData.email);
  component.passwordFormControl.setValue(componentCreationData.password);
  component.repeatPasswordFormControl.setValue(componentCreationData.repeatPassword);
}

function getUserCreationDataForValidCheck(firstName: string, lastName: string, email: string,
                                          password: string, repeatPassword: string, expectedValid: boolean):
  UserCreationDataForValidCheck {
  return {
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
    expectedValid
  }
}
