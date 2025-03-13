import { createBrowserRouter } from "react-router-dom"
import Header from "./components/header"
import LoginPage from "./components/login"
import RegisterPage from "./components/register"
import Layout from "./components/home"


export const router = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [

            {
                path: "/login", element: <LoginPage />,
            }, {
                path: "/register", element: <RegisterPage />,
            }
        ]
    },



])