import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Functionality } from '../models/function';
import { Task } from '../models/task';
import { Status } from '../models/status';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  @Input() functionality!: Functionality;
  @Output() backToFunctionalityEvent = new EventEmitter<void>();
  @Output() changeEmitter = new EventEmitter<void>();
  taskStatus = Status;
  taskDayLeft: number = 0;

  ngOnInit(): void {
    this.countLeftTime();
    this.sortTasks();
  }

  addMode: boolean = false;
  editMode: boolean = false;
  showAddButton: boolean = true;
  taskToEdit: Task = this.emptyTask();

  addButtonClick(): void {
    this.addMode = true;
    this.showAddButton = false;
  }

  undoAddButtonClick(): void {
    this.addMode = false;
    this.editMode = false;
    this.showAddButton = true;
  }

  addTask(task: Task): void {
    this.functionality.Tasks.unshift(task);
    this.addMode = false;
    this.editMode = false;
    this.showAddButton = true;
    this.taskToEdit = this.emptyTask();
    this.sortTasks();
    this.changeEmitter.emit();
  }

  editTask(): void {
    this.taskToEdit = this.emptyTask();
    this.editMode = false;
    this.showAddButton = true;
    this.sortTasks();
    this.changeEmitter.emit();
  }

  editButtonClick(task: Task): void {
    this.taskToEdit = task;
    this.editMode = true;
    this.addMode = false;
    this.showAddButton = false;
  }

  showButtons(): boolean {
    return this.addMode === false && this.editMode === false;
  }

  deleteTask(task: Task): void {
    this.functionality.Tasks = this.functionality.Tasks.filter(
      (t) => t !== task
    );
    this.changeEmitter.emit();
  }

  moveTask(task: Task, status: Status): void {
    task.Status = status;

    if (status === Status.ToDo) {
      task.StartDate = null;
      task.EndDate = null;
    }

    if (status === Status.Doing) {
      task.StartDate = new Date();
      task.EndDate = null;
    }

    if (status === Status.Done) {
      task.EndDate = new Date();
    }
    this.changeEmitter.emit();
  }

  backToFunctionality(): void {
    this.backToFunctionalityEvent.emit();
  }

  isToDo(task: Task): boolean {
    return task.Status === Status.ToDo;
  }

  isDoing(task: Task): boolean {
    return task.Status === Status.Doing;
  }

  isDone(task: Task): boolean {
    return task.Status === Status.Done;
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

  private countLeftTime() {
    this.functionality.Tasks.forEach((task) => {
      if (!task || !task.ExpectedDate) {
        return;
      }
      const today = new Date();
      const taskExpectedDay = new Date(task.ExpectedDate);
      let differenceInTime = taskExpectedDay.getTime() - today.getTime();
      task.DaysLeft = differenceInTime / (1000 * 3600 * 24);
    });
  }

  private sortTasks(): void {
    this.functionality.Tasks = this.functionality.Tasks.sort(
      (a: Task, b: Task) => {
        if (a.Priority > b.Priority) {
          return -1;
        }
        if (a.Priority < b.Priority) {
          return 1;
        }
        if (!a?.ExpectedDate) {
          return 1;
        }
        if (!b?.ExpectedDate) {
          return -1;
        }
        if (a.ExpectedDate > b.ExpectedDate) {
          return 1;
        }
        if (a.ExpectedDate < b.ExpectedDate) {
          return -1;
        }
        return 0;
      }
    );
  }
}
