import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { logout } from "../../redux/slices/authSlice"

export default function BackupLogout() {
    const dispatch = useDispatch()

    useEffect(() => {
        async function main() {
            await signOut(auth)
            dispatch(logout())
        }
        main().catch(console.error)
    }, [])

    return <>Logging out...</>
}
