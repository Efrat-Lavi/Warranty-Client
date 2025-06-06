import axios from "axios";
import { getBaseUrl } from "../App";


export const getUserByEmail = async ({ token, email }: { token: string; email: string }) => {
    try {
        const response = await axios.get(`${getBaseUrl()}/api/User/email/${email}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
