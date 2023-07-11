import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../models/project';
import { Functionality } from '../models/function';
import { Status } from '../models/status';

import { MatDialog } from '@angular/material/dialog';
import { ConfimationDialogComponent } from '../confimation-dialog/confimation-dialog.component';

@Component({
  selector: 'app-function-list',
  templateUrl: './function-list.component.html',
  styleUrls: ['./function-list.component.css'],
})
export class FunctionListComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  @Input()
  project!: Project;
  @Output() selectedFunctionalityEvent = new EventEmitter<Functionality>();
  @Output() backToProjectEvent = new EventEmitter<void>();
  @Output() changeEmitter = new EventEmitter<void>();

  ngOnInit(): void {
    this.project.Functionalities.forEach((functionality) => {
      if (
        !functionality ||
        !functionality.Tasks ||
        functionality.Tasks.length === 0
      ) {
        functionality.Status = Status.ToDo;
      } else if (
        functionality.Tasks.every((task) => task.Status === Status.Done)
      ) {
        functionality.Status = Status.Done;
      } else if (
        functionality.Tasks.every((task) => task.Status === Status.ToDo)
      ) {
        functionality.Status = Status.ToDo;
      } else {
        functionality.Status = Status.Doing;
      }
    });
    this.sortFunctionalities();
  }

  functionalityStatus = Status;
  addMode: boolean = false;
  editMode: boolean = false;
  showAddButton: boolean = true;
  functionalityToEdit: Functionality = this.emptyFunctionality();

  addButtonClick(): void {
    this.addMode = true;
    this.showAddButton = false;
  }

  undoAddButtonClick(): void {
    this.addMode = false;
    this.editMode = false;
    this.showAddButton = true;
  }

  addFunctionality(functionality: Functionality): void {
    this.project.Functionalities.unshift(functionality);
    this.addMode = false;
    this.editMode = false;
    this.showAddButton = true;
    this.functionalityToEdit = this.emptyFunctionality();
    this.sortFunctionalities();
    this.changeEmitter.emit();
  }

  editFunctionality(): void {
    this.functionalityToEdit = this.emptyFunctionality();
    this.editMode = false;
    this.showAddButton = true;
    this.sortFunctionalities();
    this.changeEmitter.emit();
  }

  editButtonClick(functionality: Functionality): void {
    this.functionalityToEdit = functionality;
    this.editMode = true;
    this.addMode = false;
    this.showAddButton = false;
  }

  showButtons(): boolean {
    return this.addMode === false && this.editMode === false;
  }

  deleteFunctionality(functionality: Functionality): void {
    if (
      !functionality ||
      !functionality.Tasks ||
      functionality.Tasks.length === 0 ||
      functionality.Tasks.every((task) => task.Status === Status.Done)
    ) {
      this.project.Functionalities = this.project.Functionalities.filter(
        (t) => t !== functionality
      );
      this.changeEmitter.emit();
    } else {
      this.openConfirmationDialog(functionality);
    }
  }

  openConfirmationDialog(functionality: Functionality): void {
    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      data: {
        listName: 'funkcja',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.project.Functionalities = this.project.Functionalities.filter(
          (t) => t !== functionality
        );
        this.changeEmitter.emit();
      }
    });
  }

  selectFunctionality(functionality: Functionality): void {
    this.selectedFunctionalityEvent.emit(functionality);
  }

  backToProject(): void {
    this.backToProjectEvent.emit();
  }

  isDone(functionality: Functionality): boolean {
    return functionality.Status === Status.Done;
  }

  private emptyFunctionality(): Functionality {
    return {
      Name: '',
      Description: '',
      Priority: 1,
      Tasks: [],
      AddDate: null,
      OwnerId: 1,
      Status: Status.ToDo,
    };
  }

  private sortFunctionalities(): void {
    this.project.Functionalities = this.project.Functionalities.sort(
      (a: Functionality, b: Functionality) => {
        if (a.Status !== Status.Done && b.Status === Status.Done) {
          return -1;
        }
        if (a.Status === Status.Done && b.Status !== Status.Done) {
          return 1;
        }

        if (a.Priority > b.Priority) {
          return -1;
        }
        if (a.Priority < b.Priority) {
          return 1;
        }

        return 0;
      }
    );
  }
}
