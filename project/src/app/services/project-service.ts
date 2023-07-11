import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { DummyData } from './data';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [];

  constructor() {
    this.loadFromLocalStorage();
    // this.loadFromDummy();
    console.log(this.projects);
  }

  getProjects() {
    return this.projects;
  }

  addProject(project: Project) {
    this.projects.push(project);
    this.saveToLocalStorage();
  }

  saveProjects(projects: Project[]) {
    this.projects = projects;
    this.saveToLocalStorage();
  }

  private loadFromLocalStorage() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
    }
  }

  private loadFromDummy() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      localStorage.removeItem('projects');
    }
    this.projects = DummyData.projects;
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    console.log(this.projects);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }
}
