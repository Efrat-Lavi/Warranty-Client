// import { createSlice } from '@reduxjs/toolkit';
// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { initialState, Warranty } from '../models/warranties';


// export const getWarranties = createAsyncThunk("warranties/fetch", async ({token,userId}:{token:string,userId: number}, thunkAPI) => {
//     try {
//         const response = await axios.get(`https://localhost:7200/api/Record/user/${userId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error: any) {
//         return thunkAPI.rejectWithValue(error.message);
//     }
// });


// //הוספת התעודה ע"י הבעלים שלה
// // export const addWarranty = createAsyncThunk("warranties/add",
// //     async ({token, warranty }: {token:string, warranty: Partial<Warranty> }, thunkAPI) => {
// //         try {
// //             const response = await axios.post("https://localhost:7200/api/Warranty", warranty ,{headers:
// //                 {
// //                     Authorization: `Bearer ${token}`
// //                 }}) 
// //             return response.data;
// //         } catch (error: any) {
// //             console.log(error);
// //             return thunkAPI.rejectWithValue(error.message);
// //         }
// //     }
// // );
// export const addWarranty = createAsyncThunk("warranties/add",
//     async ({token, warranty }: {token:string, warranty: Partial<Warranty> }, thunkAPI) => {
//         try {
//             const warrantyToSend = {
//                 NameProduct: warranty.nameProduct,  // ✅ שם תואם לשרת
//                 LinkFile:"",  // ✅ שם תואם לשרת
//                 ExpirationDate: warranty.expirationDate,  // ✅ שם תואם לשרת
//                 CompanyId: 1  // ❗ צריך לשלוח מזהה מספרי של חברה (בנתיים שלחתי 1)
//             };

//             const response = await axios.post("https://localhost:7200/api/Warranty", warrantyToSend, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }); 
//             return response.data;
//         } catch (error: any) {
//             console.log(error);
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );

// export const updateWarranty = createAsyncThunk("warranties/update",
//     async ({ warranty, userId }: { warranty: Partial<Warranty>, userId: string }, thunkAPI) => {
//         try {
//             const response = await axios.put(`https://localhost:7200/api/Warranty/${userId}`, warranty);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );

// const warrantySlice = createSlice({
//     name: "warranties",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getWarranties.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getWarranties.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.warranties = action.payload;
//             })
//             .addCase(getWarranties.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = typeof action.payload === "string"
//                     ? action.payload
//                     : action.error.message || "Error fetching recipes";
//             })

//             .addCase(addWarranty.fulfilled, (state, action) => {
//                 state.warranties.push(action.payload);
//                 // Swal.fire({title: "Add successfully",icon: "success",draggable: true});
//             })
//             .addCase(addWarranty.rejected, (state, action) => {
//                 state.error = typeof action.payload === "string"
//                     ? action.payload
//                     : action.error.message || "Error update recipe";
//                 // Swal.fire({title: "Update rejected",icon: "error",draggable: true});
//             })
//             .addCase(updateWarranty.fulfilled, (state, action) => {
//                 const index = state.warranties.findIndex(item => item.id === action.payload.id);
//                 if (index !== -1) {
//                     state.warranties[index] = action.payload;
//                     // Swal.fire({title: "Update successfully",icon: "success",draggable: true});
//                 }
//             });
//     },
// });
// export default warrantySlice;
