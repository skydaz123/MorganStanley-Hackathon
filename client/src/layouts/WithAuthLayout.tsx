import Role from "../enums/role"
import { useSelector } from "react-redux"
import { getAuthSlice } from "../redux/store"
import { Navigate, Outlet } from "react-router-dom"

type Props = {
    accept?: Role[]
}
export default function WithAuthLayout({ accept=[] }: Props) {
    const { isLoggedIn, user } = useSelector(getAuthSlice)

    if (!isLoggedIn || !user || !accept?.includes(user.role))
        return <Navigate to="/auth" replace/>

    return <Outlet/>
}
