
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import ErrorPage from "./components/error";
import RecordPage from "./components/records/recordPage";
import AddWarranty from "./components/add-warranty";
import WarrantyDetails from "./components/records/WarrantyDetails";
import Dashboard from "./components/dashbord";
import UserProfile from "./components/userProfile";
import AppLayout from "./components/appLayout";
import SharedWithMe from "./components/sharedWithMe";
import ProtectedRoute from "./components/protectedRouter"; // ייבוא הרכיב החדש

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <AppLayout />, 
        children: [
            { index: true, element: <Dashboard /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/dashboard", element: <Dashboard /> },

            // ניתובים מוגנים (משתמש חייב להיות מחובר)
            {
                element: <ProtectedRoute />, 
                children: [
                    { path: "/record", element: <RecordPage /> },
                    { path: "/record/:id", element: <WarrantyDetails /> },
                    { path: "/add-warranty", element: <AddWarranty /> },
                    { path: "/profile", element: <UserProfile /> },
                    { path: "/settings", element: <UserProfile /> },
                    { path: "/SharedWithMe", element: <SharedWithMe /> },
                ]
            }
        ]
    },
    { path: "*", element: <ErrorPage /> }
],
// { basename: "/" } // הוספנו basename
);
