import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { Status } from '../models/status';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.css'],
})
export class TaskDescriptionComponent {
  @Input() task!: Task;
  taskStatus = Status;
  daysLeft: number = 0;

  isDone(): boolean {
    return this.task.Status === Status.Done;
  }

  isDoing(): boolean {
    return (
      this.task.Status === Status.Done || this.task.Status === Status.Doing
    );
  }

  isDoneClass(): string {
    if (this.task.Status === Status.Done) return 'done';
    else return '';
  }
}
