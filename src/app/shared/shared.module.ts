import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PageContainerComponent } from './components/page-container/page-container.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    PageContainerComponent
  ],
  exports: [
    PageContainerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule {
}
