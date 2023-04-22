import RootBoundary from "../boundaries/RootBoundary"
import { Navigate, Route } from "react-router-dom"
import { lazy } from "react"

const PartnerLayout = lazy(() => import("../layouts/PartnerLayout"))
const Request = lazy(() => import("../pages/partner/Request"))
const Stats = lazy(() => import("../pages/partner/Stats"))
const History = lazy(() => import("../pages/partner/History"))
const Profile = lazy(() => import("../pages/partner/Profile"))
const Settings = lazy(() => import("../pages/partner/Settings"))

const partnerRoutes = (
    <Route path="partner" element={<PartnerLayout/>} errorElement={<RootBoundary/>}>
        <Route path="" element={<Navigate to="stats" replace/>}/>
        <Route path="request" element={<Request/>}/>
        <Route path="stats" element={<Stats/>}/>
        <Route path="history" element={<History/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="setting" element={<Settings/>}/>
    </Route>
)

export default partnerRoutes
