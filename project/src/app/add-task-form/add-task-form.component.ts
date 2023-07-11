import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../models/status';
import { Task } from '../models/task';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css'],
})
export class AddTaskFormComponent {
  @Output() newTask = new EventEmitter<Task>();
  @Output() saveTask = new EventEmitter<void>();
  @Input()
  task: Task = this.emptyTask();
  @Input()
  editMode: boolean = false;

  showForm: boolean = false;

  addTask(): void {
    this.countLeftTime(this.task);
    if (this.task.Name === '') return;

    this.task.AddDate = new Date();
    this.newTask.emit(this.task);
    this.task = this.emptyTask();
    this.showForm = false;
  }

  onShowForm(): void {
    this.showForm = !this.showForm;
  }

  onSaveTask(): void {
    this.countLeftTime(this.task);
    this.saveTask.emit();
    this.task = this.emptyTask();
    this.showForm = false;
  }

  private countLeftTime(task: Task) {
    if (!task || !task.ExpectedDate) {
      return;
    }

    const today = new Date();
    const taskExpectedDay = new Date(task.ExpectedDate);
    let differenceInTime = taskExpectedDay.getTime() - today.getTime();
    task.DaysLeft = differenceInTime / (1000 * 3600 * 24);
  }

  private emptyTask(): Task {
    return {
      Name: '',
      Description: '',
      Priority: 1,
      AddDate: null,
      StartDate: null,
      EndDate: null,
      ExpectedDate: null,
      OwnerId: 1,
      Status: Status.ToDo,
      DaysLeft: 0,
    };
  }
}
