import { Status } from './status';
import { User } from './user';
import { Task } from './task';

export interface Functionality {
  Name: string;
  Description: string;
  Priority: number;
  Tasks: Task[];
  OwnerId: number;
  Status: Status;
  AddDate: Date | null;
}
