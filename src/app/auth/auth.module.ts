import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';


@NgModule({
  declarations: [
    SignInPageComponent,
    SignUpPageComponent,
    AuthFooterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
