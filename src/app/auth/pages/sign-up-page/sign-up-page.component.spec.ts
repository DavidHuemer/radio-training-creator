import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignUpPageComponent} from './sign-up-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserCreationData} from "../../../core/data/User";

interface UserCreationDataForValidCheck extends UserCreationData {
  repeatPassword: string,
  expectedValid: boolean;
}

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpPageComponent],
      imports: [
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule
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
      component.firstNameFormControl.setValue(userCreationData.firstName);
      component.lastNameFormControl.setValue(userCreationData.lastName);
      component.emailFormControl.setValue(userCreationData.email);
      component.passwordFormControl.setValue(userCreationData.password);
      component.repeatPasswordFormControl.setValue(userCreationData.repeatPassword);
      expect(component.signUpFormGroup.valid).toBe(userCreationData.expectedValid);
    });
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
