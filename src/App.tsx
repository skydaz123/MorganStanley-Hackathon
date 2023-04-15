import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import RootLayout from "./layouts/RootLayout"
import { lazy } from "react"
import RootBoundary from "./boundaries/RootBoundary"

const Home = lazy(() => import("./pages/Home"))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>} errorElement={<RootBoundary/>}>
            <Route path="" element={<Home/>}/>
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
