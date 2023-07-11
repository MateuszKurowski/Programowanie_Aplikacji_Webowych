import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { Project } from './models/project';
import { Functionality } from './models/function';
import { DummyData } from './services/data';
import { ProjectService } from './services/project-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User = DummyData.user;
  projects: Project[];

  constructor(private projectService: ProjectService) {
    this.projects = this.projectService.getProjects();
  }

  date: Date = new Date('2023');
  selectedProject: Project | null = null;
  selectedFunctionality: Functionality | null = null;

  onSelectProject(project: Project): void {
    this.selectedProject = project;
    this.selectedFunctionality = null;
  }

  onSelectFunctionality(functionality: Functionality): void {
    this.selectedFunctionality = functionality;
  }

  backToProject(): void {
    this.selectedFunctionality = null;
  }

  backtoProjectsList(): void {
    this.selectedProject = null;
  }

  onChangeSave(): void {
    this.projectService.saveProjects(this.projects);
  }

  onProjectsChangeSave(projects: Project[]): void {
    this.projects = projects;
    this.projectService.saveProjects(this.projects);
  }
}
