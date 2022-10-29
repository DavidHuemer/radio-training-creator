import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PageContainerComponent } from './components/page-container/page-container.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NewProjectDialog} from "./dialogs/new-project-dialog/new-project-dialog";
import {MatDialogModule} from "@angular/material/dialog";
import { NewProjectComponent } from './components/projects/new-project/new-project.component';


@NgModule({
  declarations: [
    PageContainerComponent,
    NewProjectDialog,
    NewProjectComponent
  ],
  exports: [
    PageContainerComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class SharedModule {
}
