import { combineSlices, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: combineSlices(
       userSlice,
       authSlice, 
    ),
});

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store
// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";

// const store = configureStore({
//   reducer:combineSlices(
//     user: userSlice,
//     auth: authSlice, 
//   ),
// });

// export type StoreType = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
