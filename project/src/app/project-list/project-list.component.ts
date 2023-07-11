import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../models/project';
import { Status } from '../models/status';

import { MatDialog } from '@angular/material/dialog';
import { ConfimationDialogComponent } from '../confimation-dialog/confimation-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  @Output() selectedProjectEvent = new EventEmitter<Project>();
  @Output() projectsChangeEmitter = new EventEmitter<Project[]>();

  @Input()
  projects: Project[] = [];

  addMode: boolean = false;
  editMode: boolean = false;
  showAddButton: boolean = true;
  projectToEdit: Project = this.emptyProject();

  constructor(public dialog: MatDialog) {
    this.sortProjects();
  }

  addButtonClick(): void {
    this.addMode = true;
    this.showAddButton = false;
  }

  undoAddButtonClick(): void {
    this.addMode = false;
    this.editMode = false;
    this.showAddButton = true;
  }

  addProject(project: Project) {
    this.projects.unshift(project);
    this.addMode = false;
    this.editMode = false;
    this.showAddButton = true;
    this.projectToEdit = this.emptyProject();
    this.sortProjects();
    this.projectsChangeEmitter.emit(this.projects);
  }

  editProject(): void {
    this.projectToEdit = this.emptyProject();
    this.editMode = false;
    this.showAddButton = true;
    this.projectsChangeEmitter.emit(this.projects);
  }

  editButtonClick(project: Project) {
    this.projectToEdit = project;
    this.editMode = true;
    this.addMode = false;
    this.showAddButton = false;
  }

  showButtons(): boolean {
    return this.addMode === false && this.editMode === false;
  }

  selectProject(project: Project): void {
    this.selectedProjectEvent.emit(project);
  }

  deleteProject(project: Project): void {
    if (
      !project ||
      !project.Functionalities ||
      project.Functionalities.length === 0 ||
      project.Functionalities.every((f) => f.Status === Status.Done)
    ) {
      this.projects = this.projects.filter((p) => p !== project);
      this.projectsChangeEmitter.emit(this.projects);
    } else {
      this.openConfirmationDialog(project);
    }
  }

  openConfirmationDialog(project: Project): void {
    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      data: {
        listName: 'projekt',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projects = this.projects.filter((p) => p !== project);
        this.projectsChangeEmitter.emit(this.projects);
      }
    });
  }

  private emptyProject(): Project {
    return {
      Name: '',
      Description: '',
      Functionalities: [],
      AddDate: null,
      OwnerId: 1,
    };
  }

  private sortProjects(): void {
    this.projects = this.projects.sort((a: Project, b: Project) => {
      if (!a?.AddDate) {
        return -1;
      }
      if (!b?.AddDate) {
        return 1;
      }

      if (!a.AddDate > !b.AddDate) {
        return 1;
      }
      if (!a.AddDate < !b.AddDate) {
        return -1;
      }

      return 0;
    });
  }
}
