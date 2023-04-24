import { useSelector } from "react-redux"
import { getAuthSlice } from "../redux/store"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Role from "../enums/role"

export default function useRedirectIfLoggedIn() {
    const { isLoggedIn, user } = useSelector(getAuthSlice)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn || !user)
            return
        switch (user.role) {
            case Role.Partner:
                navigate("/partner")
                break
            case Role.Distributor:
                navigate("/map")
                break
            case Role.Unknown:
            default:
                console.error("Invalid role detected")
                break
        }
    }, [isLoggedIn, user])
}
