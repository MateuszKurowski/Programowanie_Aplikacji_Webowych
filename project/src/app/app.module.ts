import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import localePL from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { FunctionListComponent } from './function-list/function-list.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { ButtonComponent } from './button/button.component';
import { ConfimationDialogComponent } from './confimation-dialog/confimation-dialog.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskDescriptionComponent } from './task-description/task-description.component';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { AddFunctionalityFormComponent } from './add-functionality-form/add-functionality-form.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';

registerLocaleData(localePL);

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ProjectListComponent,
    FunctionListComponent,
    TasksListComponent,
    ButtonComponent,
    ConfimationDialogComponent,
    TaskDescriptionComponent,
    AddProjectFormComponent,
    AddFunctionalityFormComponent,
    AddTaskFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
