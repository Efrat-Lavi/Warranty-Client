import axios from "axios";

// export const getUserByEmail = async ({token,email}:{token:string,email:string}) => {
//     try {
//         const response = await axios.get(`/api/users/GetByEmail`, {
//             params: { email },
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching user:", error);
//         return null;
//     }
// };
export const getUserByEmail = async ({ token, email }: { token: string; email: string }) => {
    try {
        const response = await axios.get(`https://localhost:7200/api/User/email/${email}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
