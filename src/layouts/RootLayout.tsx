import { Provider } from "react-redux"
import store from "../redux/store"
import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import { CircularProgress } from "@mui/material"

export default function RootLayout() {
    return (
        <Provider store={store}>
            {/* NEST ANY OTHER GLOBAL PROVIDERS */}
            <Suspense fallback={<CircularProgress/>}>
                <Outlet/>
            </Suspense>
        </Provider>
    )
}
