import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideDatabase, getDatabase} from '@angular/fire/database';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GLOBAL_RX_STATE, GlobalState} from "./core/states/GlobalState";
import {RxState} from "@rx-angular/state";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: GLOBAL_RX_STATE,
      useFactory: () => new RxState<GlobalState>()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
