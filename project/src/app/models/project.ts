import { Functionality } from './function';

export interface Project {
  Name: string;
  Description: string;
  Functionalities: Functionality[];
  AddDate: Date | null;
  OwnerId: number;
}
