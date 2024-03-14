import { Board } from './board.interface';

export interface User extends UserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface UserData {
  boards: Board[];
}

export const newUserData: UserData = {
  boards: [],
}
