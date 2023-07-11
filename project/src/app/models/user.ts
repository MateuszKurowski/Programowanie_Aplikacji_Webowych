import { Permission } from './permission';

export interface User {
  Login: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Permission: Permission;
}
