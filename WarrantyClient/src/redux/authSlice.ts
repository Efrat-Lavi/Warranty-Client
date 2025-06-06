
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState from "../models/authUser";
import { getBaseUrl } from "../App";


export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/Auth/login`, { email, password });
      localStorage.setItem("token", response.data.token); // שמירת טוקן בלוקאלי
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  "auth/google-login",
  async ({ token }: { token: string | undefined }, thunkAPI) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/Auth/google-login`, { token });
      localStorage.setItem("token", response.data); // שמירת טוקן בלוקאלי
      console.log(response.data);
      
      return response.data; // מחזיר את הטוקן
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Google login failed");
    }
  }
);
export const login = createAsyncThunk(
  "auth/local-login",
  async ({ token, user }: { token: any, user: any }, thunkAPI) => {
    try {
      console.log(user);
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { token, user }; // מחזיר את הטוקן והמשתמש
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Google login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: any, thunkAPI) => {
    try {
      await axios.post(`${getBaseUrl()}/api/Auth/register`, userData);
      return { email: userData.Email, password: userData.Password }; // נחזיר אימייל וסיסמה כדי להתחבר מיד אחרי
    } catch (error: any) {
      console.log(error.response.data);

      return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);
export const getUserByEmail = createAsyncThunk("auth/getByEmail",
  async ({ token, email }: { token: string; email: string }, thunkAPI) => {
    try {
      const response = await axios.get(`${getBaseUrl()}/api/User/email/${email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user:", error);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        state.user = {
          ...action.payload.user,
          role: action.payload.user.role.nameRole // לוקחים רק את שם התפקיד
        };
        state.token = action.payload.token;
        console.log(state.user);

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(googleLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // שמירה של הטוקן ב-state
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        state.user = {
          ...action.payload.user,
          role: action.payload.user.role
        };
        state.token = action.payload.token;
// state.user.picture = action.payload.user.picture || null; // אם אין תמונה, נשמור null
        
        console.log(state.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
