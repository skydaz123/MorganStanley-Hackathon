import { Navigate, Route } from "react-router-dom"
import { lazy } from "react"
import Role from "../enums/role"

const WithAuthLayout = lazy(() => import("../layouts/WithAuthLayout"))
const PartnerLayout = lazy(() => import("../layouts/PartnerLayout"))
const Report = lazy(() => import("../pages/partner/Report"))
const Stats = lazy(() => import("../pages/partner/Stats"))
const History = lazy(() => import("../pages/partner/History"))
const Profile = lazy(() => import("../pages/partner/Profile"))

const partnerRoutes = (
    <Route path="partner" element={<WithAuthLayout accept={[Role.Partner]}/>}>
        <Route path="" element={<PartnerLayout/>}>
            <Route path="" element={<Navigate to="stats" replace/>}/>
            <Route path="report" element={<Report/>}/>
            <Route path="stats" element={<Stats/>}/>
            <Route path="history" element={<History/>}/>
            <Route path="profile" element={<Profile/>}/>
        </Route>
    </Route>
)

export default partnerRoutes
