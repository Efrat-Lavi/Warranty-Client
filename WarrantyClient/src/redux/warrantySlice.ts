import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { initialState } from '../models/warranty';
import { Warranty } from '../models/warranties';


export const getWarranties = createAsyncThunk("warranty/fetch", async ({ token, userId }: { token: string, userId: number }, thunkAPI) => {
    try {
        const response = await axios.get(`https://localhost:7200/api/Record/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const addWarranty = createAsyncThunk("warranty/add",
    async ({ token, warranty }: { token: string, warranty: Partial<Warranty> }, thunkAPI) => {
        try {
            const warrantyToSend = {
                NameProduct: warranty.nameProduct,
                LinkFile: warranty.linkFile,  // ✅ שם תואם לשרת
                ExpirationDate: warranty.expirationDate,
                CompanyId: 1  // ❗ צריך לשלוח מזהה מספרי של חברה (בנתיים שלחתי 1)
            };
            console.log(token);

            const response = await axios.post("https://localhost:7200/api/Warranty", warrantyToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateWarranty = createAsyncThunk("warranty/update",
    async ({ warranty, userId }: { warranty: Partial<Warranty>, userId: string }, thunkAPI) => {
        try {
            const response = await axios.put(`https://localhost:7200/api/Warranty/${userId}`, warranty);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const warrantySlice = createSlice({
    name: "warranty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWarranties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWarranties.fulfilled, (state, action) => {
                state.loading = false;
                state.warranty = action.payload;
            })
            .addCase(getWarranties.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === "string"
                    ? action.payload
                    : action.error.message || "Error fetching recipes";
            })

            .addCase(addWarranty.fulfilled, (state, action) => {
                console.log(action.payload);
                
                state.warranty = action.payload;
                console.log(state.warranty);
                
                // Swal.fire({title: "Add successfully",icon: "success",draggable: true});
            })
            .addCase(addWarranty.rejected, (state, action) => {
                state.error = typeof action.payload === "string"
                    ? action.payload
                    : action.error.message || "Error update recipe";
                // Swal.fire({title: "Update rejected",icon: "error",draggable: true});
            })
            .addCase(updateWarranty.fulfilled, (state, action) => {
                state.warranty = action.payload.id;

            });
    },
});
export default warrantySlice;
