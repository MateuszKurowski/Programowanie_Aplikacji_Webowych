import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Functionality } from '../models/function';
import { Status } from '../models/status';

@Component({
  selector: 'app-add-functionality-form',
  templateUrl: './add-functionality-form.component.html',
  styleUrls: ['./add-functionality-form.component.css'],
})
export class AddFunctionalityFormComponent {
  @Output() newFunctionality = new EventEmitter<Functionality>();
  @Output() saveFunctionality = new EventEmitter<void>();
  @Input()
  functionality: Functionality = this.emptyFunctionality();
  @Input()
  editMode: boolean = false;

  showForm: boolean = false;

  addFunctionality(): void {
    if (this.functionality.Name === '') return;

    this.functionality.AddDate = new Date();
    this.newFunctionality.emit(this.functionality);
    this.functionality = this.emptyFunctionality();
    this.showForm = false;
  }

  onShowForm(): void {
    this.showForm = !this.showForm;
  }

  onSaveFunctionality(): void {
    this.saveFunctionality.emit();
    this.functionality = this.emptyFunctionality();
    this.showForm = false;
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
}
