import { Outlet } from "react-router-dom"
import AuthenticatedHeader from "../components/header/AuthenticatedHeader"

export default function PartnerLayout() {
    return (
        <>
            <AuthenticatedHeader/>
            <Outlet/>
        </>
    )
}
