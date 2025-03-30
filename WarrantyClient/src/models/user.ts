export type User = {
  email: string,
  id: number,
  nameUser: string,
  role: string,
  isAccessEmails:boolean
}

export interface UserState {
  list: User[];
  loading: boolean;
  error: string | null;
}
export const initialState: UserState = {
  list: [],
  loading: false,
  error: null,
};