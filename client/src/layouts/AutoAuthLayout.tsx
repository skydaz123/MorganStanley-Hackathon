import { useDispatch, useSelector } from "react-redux"
import { getAuthSlice } from "../redux/store"
import { useEffect } from "react"
import localApi from "../redux/apis/localApi"
import { logout } from "../redux/slices/authSlice"
import { Outlet } from "react-router-dom"

export default function AutoAuthLayout() {
    const { isLoggedIn, token } = useSelector(getAuthSlice)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn || !token)
            return

        const { expirationTime } = token
        const diff = expirationTime - Date.now()

        if (diff <= 0) {
            console.log("Token already expired. Logging out...")
            dispatch(localApi.util.resetApiState())
            dispatch(logout())
            return
        }

        const tid = setTimeout(() => {
            console.log("Token just expired. Automatically logging out...")
            dispatch(localApi.util.resetApiState())
            dispatch(logout())
        }, diff)
        return () => {
            clearTimeout(tid)
        }
    }, [isLoggedIn, token])

    return <Outlet/>
}
