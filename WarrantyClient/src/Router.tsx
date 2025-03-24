import { createBrowserRouter } from "react-router-dom"
import LoginPage from "./components/login"
import RegisterPage from "./components/register"
import Layout from "./components/home"
import ErrorPage from "./components/error"
import RecordPage from "./components/records/recordPage"
import AddWarranty from "./components/add-warranty"

import WarrantyDetails from "./components/records/WarrantyDetails"
import Dashboard from "./components/dashbord"
// import WarrantyDetails from "./components/records/recordDetails"

export const router = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [

            {
                path: "/login", element: <LoginPage />,
            },
            {
                path: "/register", element: <RegisterPage />,
            },
            {
                path: "/record", element: <RecordPage />,
            }, 
            {
                path: "/record/:id", element: <WarrantyDetails />,
            }
            ,
            {
                path: "/add-warranty", element: <AddWarranty />,
            }
            ,
            {
                path: "/dashboard", element: <Dashboard />,
            }
        ]
    },
    { path: "*", element: <ErrorPage /> }


])