import { User } from "./user";
import { Warranty } from "./warranties";

export type Record = {
    id:number
    user:User,
    userId:number,
    warranty:Warranty,
    warrantyId:number,
    roleWarranty:string,
  }
  
  export interface RecordState {
    records: Record[];
    searchQuery: string,       // 🔹 הוספת משתנה חיפוש
    selectedCategory: string,
    loading: boolean;
    error: string | null;
    selectedRecord: Record|null
  }
  export const initialState: RecordState = {
    records: [],
    searchQuery: "",       // 🔹 הוספת משתנה חיפוש
    selectedCategory: "",
    loading: false,
    error: null,
    selectedRecord: null

  };