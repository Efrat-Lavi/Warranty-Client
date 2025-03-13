import { User } from "./user";

export type AuthUser = {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  
 const initialState: AuthUser = {
    user: null,
    token: localStorage.getItem("token") || null, // נטען מה-`localStorage` אם קיים
    loading: false,
    error: null,
  };
  export default initialState;