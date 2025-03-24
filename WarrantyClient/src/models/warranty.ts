import { Warranty } from "./warranties";

  export interface WarrantyState {
    warranty: Warranty|null;
    loading: boolean;
    error: string | null;
  }
  export const initialState: WarrantyState = {
    warranty:null,
    loading: false,
    error: null,
  };