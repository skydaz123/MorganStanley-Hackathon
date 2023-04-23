import { Navigate, Route } from "react-router-dom"
import { lazy } from "react"

const AuthLayout = lazy(() => import("../layouts/AuthLayout"))
const Login = lazy(() => import("../pages/auth/LogIn"))
const SignUp = lazy(() => import("../pages/auth/SignUp"))

const authRoutes = (
    <Route path="auth" element={<AuthLayout/>}>
        <Route path="" element={<Navigate to="login" replace/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<SignUp/>}/>
    </Route>
)

export default authRoutes
