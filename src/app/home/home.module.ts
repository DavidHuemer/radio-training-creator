import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {MatIconModule} from "@angular/material/icon";
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ProjectsPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule
  ]
})
export class HomeModule {
}
