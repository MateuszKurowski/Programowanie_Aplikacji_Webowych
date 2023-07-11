import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../models/project';

@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.css'],
})
export class AddProjectFormComponent {
  @Output() newProject = new EventEmitter<Project>();
  @Output() saveProject = new EventEmitter<void>();
  @Input()
  project: Project = this.emptyProject();
  @Input()
  editMode: boolean = false;

  showForm: boolean = false;

  addProject(): void {
    if (this.project.Name === '') return;

    this.project.AddDate = new Date();
    this.newProject.emit(this.project);
    this.project = this.emptyProject();
    this.showForm = false;
  }

  onShowForm(): void {
    this.showForm = !this.showForm;
  }

  onSaveProject(): void {
    this.saveProject.emit();
    this.project = this.emptyProject();
    this.showForm = false;
  }

  private emptyProject(): Project {
    return {
      Name: '',
      OwnerId: 1,
      Description: '',
      Functionalities: [],
      AddDate: null,
    };
  }
}
