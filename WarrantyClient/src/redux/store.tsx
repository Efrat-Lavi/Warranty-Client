import { combineSlices, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import authSlice from "./authSlice";
import recordSlice from "./recordSlice";
// import warrantySlice from "./warrantySlice";

const store = configureStore({
    reducer: combineSlices(
       userSlice,
       authSlice, 
       recordSlice,
    //    warrantySlice
    ),
});

export type StoreType = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;

export default store
