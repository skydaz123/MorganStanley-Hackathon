import Role from "../enums/role"
import { useSelector } from "react-redux"
import { getAuthSlice } from "../redux/store"
import { Navigate, Outlet } from "react-router-dom"

type Props = {
    accept?: Role[]
    acceptAny?: boolean
}
export default function WithAuthLayout({ accept=[], acceptAny }: Props) {
    const { isLoggedIn, user } = useSelector(getAuthSlice)

    if (!isLoggedIn || !user || (!acceptAny && !accept?.includes(user.role)))
        return <Navigate to="/auth" replace/>

    return <Outlet/>
}
