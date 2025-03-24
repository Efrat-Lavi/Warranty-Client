import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { initialState, Record } from '../models/record';

//שליפת כל התעודות אחריות עם גישה לתפקיד ולתעודה
export const getRecords = createAsyncThunk("records/fetch", async ({token,userId}:{token:string,userId: number}, thunkAPI) => {
    // const token = localStorage.getItem("token"); // נטען את ה-Token מה-LocalStorage
    if (!token) return thunkAPI.rejectWithValue("No token available");
    try {
        const response = await axios.get(`https://localhost:7200/api/Record/user/${userId}`,{
                headers:{Authorization: `Bearer ${token}`}
            });

        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getRecordById = createAsyncThunk(
    "records/fetchById",
    async ({ token, recordId }: { token: string; recordId: number }, thunkAPI) => {
        try {
            const response = await axios.get(`https://localhost:7200/api/Record/${recordId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const addRecord = createAsyncThunk("records/add",
    async ({ token, record }: { token: string, record: Partial<Record> }, thunkAPI) => {
        try {
            const recordToSend = {
                UserId: record.userId, 
                WarrantyId: record.warrantyId,  
                RoleWarranty: record.roleWarranty 
            };

            const response = await axios.post("https://localhost:7200/api/Record", recordToSend, {
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
export const updateRecord = createAsyncThunk("records/update",
    async ({ record, recordId }: { record: Partial<Record>, recordId: number }, thunkAPI) => {
        try {
            const response = await axios.put(`https://localhost:7200/api/Warranty/${recordId}`, record);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteRecord = createAsyncThunk(
    "records/delete",
    async ({ token, recordId }: { token: string; recordId: number }, thunkAPI) => {
        try {
            const response = await axios.delete(`https://localhost:7200/api/Record/${recordId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data ? recordId : thunkAPI.rejectWithValue("Deletion failed");
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const recordSlice = createSlice({
    name: "records",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            
            state.searchQuery = action.payload;
            console.log(state.searchQuery);

        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecords.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                
                state.loading = false;
                state.records = action.payload;

            })
            .addCase(getRecords.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === "string"
                    ? action.payload
                    : action.error.message || "Error fetching recipes";
            })

            .addCase(addRecord.fulfilled, (state, action) => {
                state.records.push(action.payload);
                // Swal.fire({title: "Add successfully",icon: "success",draggable: true});
            })
            .addCase(addRecord.rejected, (state, action) => {
                state.error = typeof action.payload === "string"
                    ? action.payload
                    : action.error.message || "Error update recipe";
                // Swal.fire({title: "Update rejected",icon: "error",draggable: true});
            })
            .addCase(updateRecord.fulfilled, (state, action) => {
                const index = state.records.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.records[index] = action.payload;
                    // Swal.fire({title: "Update successfully",icon: "success",draggable: true});
                }
            })
            .addCase(deleteRecord.fulfilled, (state, action) => {
                state.records = state.records.filter(record => record.id !== action.payload);
            })
            .addCase(deleteRecord.rejected, (state, action) => {
                state.error = typeof action.payload === "string"
                    ? action.payload
                    : action.error.message || "Error deleting record";
            }).addCase(getRecordById.fulfilled, (state, action) => {
                state.selectedRecord = action.payload; // שמירת הרשומה שנשלפה ב-state
            })
            .addCase(getRecordById.rejected, (state, action) => {
                state.error = typeof action.payload === "string"
                    ? action.payload
                    : action.error.message || "Error fetching record by ID";
            });
            ;
            
    },
});
export default recordSlice;
