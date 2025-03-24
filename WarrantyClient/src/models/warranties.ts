import { Record } from "./record";

export type Warranty = {
    id:number
    nameProduct:string,
    company:string,
    expirationDate:string,
    // purchaseDate:Date,
    linkFile:string,
    category:string,
    records:Record[]
  }
  
  export interface WarrantyState {
    warranties: Warranty[];
    loading: boolean;
    error: string | null;
  }
  export const initialState: WarrantyState = {
    warranties: [],
    loading: false,
    error: null,
  };