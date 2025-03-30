import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreType } from "../redux/store";

const ProtectedRoute = () => {
    const { token } = useSelector((state: StoreType) => state.auth); // בדיקת התחברות

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
