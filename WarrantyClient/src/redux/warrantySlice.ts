import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Warranty } from '../models/warranties';
import { baseUrl } from '../App';

export const getWarranties = createAsyncThunk("warranty/fetch", async ({ token, userId }: { token: string, userId: number }, thunkAPI) => {
    try {
        const response = await axios.get(`${baseUrl}/api/Record/user/${userId}`, {
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
                LinkFile: warranty.linkFile,
                ExpirationDate: warranty.expirationDate,
                Company: warranty.company ,
                Category:warranty.category
            };
            console.log(token);

            const response = await axios.post(`${baseUrl}/api/Warranty`, warrantyToSend, {
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
export const updateWarranty =  async ({token, warranty,id }: {token:string, warranty: Partial<Warranty> ,id:number}) => {
        try {
            const response = await axios.put(`${baseUrl}/api/Warranty/${id}`, warranty,{
                headers: {
                    Authorization: `Bearer ${token}`}
                });
            return response.data;
        } catch (error: any) {
            return error.message;
        }
    }

export const deleteWarranty =  async ({ token, warrantyId }: { token: string, warrantyId: number }) => {
        try {
            console.log("del");
            
            await axios.delete(`${baseUrl}/api/Warranty/${warrantyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return warrantyId; // מחזירים את ה-ID כדי שנוכל להסיר מהסטייט
        } catch (error: any) {
            return error.message
        }
    }

