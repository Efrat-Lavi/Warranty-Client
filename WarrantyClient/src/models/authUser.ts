
import { User } from "./user";

// פונקציה לפענוח ובדיקת תוקף הטוקן
const decodeToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

const isTokenValid = (token: string | null) => {
  if (!token) return false;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;

  const currentTime = Math.floor(Date.now() / 1000); // זמן נוכחי בשניות
  return decoded.exp > currentTime;
};

// נביא את הטוקן אם הוא עדיין תקף
const token = localStorage.getItem("token");
const isValid = isTokenValid(token);
const user = isValid ? JSON.parse(localStorage.getItem("user") || "null") : null;

export type AuthUser = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthUser = {
  user,
  token: isValid ? token : null, // רק אם הטוקן תקף
  loading: false,
  error: null,
};

// אם הטוקן לא תקף, נמחק אותו מה-`localStorage`
if (!isValid) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export default initialState;
