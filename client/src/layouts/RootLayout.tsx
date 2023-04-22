import { Provider } from "react-redux"
import store from "../redux/store"
import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import BigLoader from "../loaders/BigLoader"

export default function RootLayout() {
    return (
        <Provider store={store}>
            {/* NEST ANY OTHER GLOBAL PROVIDERS */}
            <Suspense fallback={<BigLoader/>}>
                <Outlet/>
            </Suspense>
        </Provider>
    )
}
