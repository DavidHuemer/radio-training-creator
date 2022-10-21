import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/sign-in']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {path: '', redirectTo: 'auth/sign-in', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
