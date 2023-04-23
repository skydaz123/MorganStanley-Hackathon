import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import RootLayout from "./layouts/RootLayout"
import { lazy } from "react"
import RootBoundary from "./boundaries/RootBoundary"
import partnerRoutes from "./routes/partner-routes"
import NotFound from "./pages/NotFound"
import authRoutes from "./routes/auth-routes"

const Home = lazy(() => import("./pages/Home"))
const Map = lazy(() => import("./components/Map"))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>} errorElement={<RootBoundary/>}>
            <Route path="" element={<Home/>}/>

            {authRoutes}

            <Route path="map" element={<Map/>}/>

            {partnerRoutes}

            <Route path="*" element={<NotFound/>}/>
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
