import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import RootLayout from "./layouts/RootLayout"
import { lazy } from "react"
import RootBoundary from "./boundaries/RootBoundary"

const HeaderLayout = lazy(() => import("./layouts/SplashLayout"))
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>} errorElement={<RootBoundary/>}>
            <Route path="" element={<HeaderLayout/>}>
                <Route path="" element={<Home/>}/>
            </Route>
            <Route path="login" element={<Login/>}/>
        </Route>
    )
)

export default function App() {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<CircularProgress/>}
        />
    )
}
