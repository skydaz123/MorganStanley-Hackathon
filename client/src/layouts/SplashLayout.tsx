import { Outlet } from "react-router-dom"
import UnauthenticatedHeader from "../components/header/UnauthenticatedHeader"

export default function SplashLayout() {
    return (
        <>
            <UnauthenticatedHeader/>
            <Outlet/>
        </>
    )
}

