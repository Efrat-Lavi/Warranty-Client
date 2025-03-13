import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from '../models/user';
import { initialState } from '../models/user';

export const getUsers = createAsyncThunk("users/fetch", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://localhost:7200/api/User");
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const addUser = createAsyncThunk("users/add",
  async ( user: Partial<User>, thunkAPI) => {
    try {
      const response = await axios.post("https://localhost:7200/api/User", user)
      return response.data;
    } catch (error: any) {
        console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateUser = createAsyncThunk("users/update",
  async ({ user, userId }: { user: Partial<User>, userId: string }, thunkAPI) => {
    try {
      const response = await axios.put(`https://localhost:7200/api/User/${userId}`, user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" 
          ? action.payload 
          : action.error.message || "Error fetching recipes";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = typeof action.payload === "string" 
          ? action.payload 
          : action.error.message || "Error adding recipe";
          // Swal.fire({title: "Add rejected",icon: "error",draggable: true});
      })
    .addCase(addUser.fulfilled, (state, action) => {
      state.list.push(action.payload);
      // Swal.fire({title: "Add successfully",icon: "success",draggable: true});
    }) 
    .addCase(updateUser.rejected, (state, action) => {
      state.error = typeof action.payload === "string" 
        ? action.payload 
        : action.error.message || "Error update recipe";
        // Swal.fire({title: "Update rejected",icon: "error",draggable: true});
      })
  .addCase(updateUser.fulfilled, (state, action) => {
    const index = state.list.findIndex(item => item.id === action.payload.id);
    if (index !== -1) {
      state.list[index] = action.payload;
      // Swal.fire({title: "Update successfully",icon: "success",draggable: true});
    }  });
  },
});
export default userSlice;
