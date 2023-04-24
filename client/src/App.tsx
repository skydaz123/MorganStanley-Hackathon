import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import RootLayout from "./layouts/RootLayout"
import { lazy } from "react"
import RootBoundary from "./boundaries/RootBoundary"
import partnerRoutes from "./routes/partner-routes"
import NotFound from "./pages/NotFound"
import authRoutes from "./routes/auth-routes"
import Role from "./enums/role"
import BackupLogout from "./pages/auth/BackupLogout"
import AutoAuthLayout from "./layouts/AutoAuthLayout"

const Home = lazy(() => import("./pages/Home"))

const WithAuthLayout = lazy(() => import("./layouts/WithAuthLayout"))
const Map = lazy(() => import("./pages/Map"))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>} errorElement={<RootBoundary/>}>
            <Route path="" element={<AutoAuthLayout/>}>
                <Route path="" element={<Home/>}/>

                {authRoutes}

                <Route path="map" element={<WithAuthLayout accept={[Role.Distributor]}/>}>
                    <Route path="" element={<Map/>}/>
                </Route>

                <Route path="logout" element={<WithAuthLayout acceptAny/>}>
                    <Route path="" element={<BackupLogout/>}/>
                </Route>

                {partnerRoutes}

                <Route path="*" element={<NotFound/>}/>
            </Route>
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
