import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInPageComponent} from './sign-in-page.component';
import {Credentials} from "../../../data/Credentials";

describe('SignInPageComponent', () => {
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
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
