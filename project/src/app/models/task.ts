import { Status } from './status';
import { User } from './user';

export interface Task {
  Name: string;
  Description: string;
  Priority: number;
  ExpectedDate: Date | null;
  Status: Status;
  OwnerId: number;
  StartDate?: Date | null;
  EndDate?: Date | null;
  AddDate: Date | null;
  DaysLeft: number;
}
