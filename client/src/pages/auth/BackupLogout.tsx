import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { logout } from "../../redux/slices/authSlice"
import localApi from "../../redux/apis/localApi"

export default function BackupLogout() {
    const dispatch = useDispatch()

    useEffect(() => {
        async function main() {
            await signOut(auth)
            dispatch(localApi.util.resetApiState())
            dispatch(logout())
        }
        main().catch(console.error)
    }, [])

    return <>Logging out...</>
}
