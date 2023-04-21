import { configureStore } from "@reduxjs/toolkit"
import localApi from "./apis/localApi"
import demoSlice from "./slices/demoSlice"
import mapsApi from "./apis/mapsApi"

const store = configureStore({
    reducer: {
        [demoSlice.name]: demoSlice.reducer,
        [localApi.reducerPath]: localApi.reducer,
        [mapsApi.reducerPath]: mapsApi.reducer,
    },
    middleware: getDM => getDM().concat(
        localApi.middleware,
        mapsApi.middleware,
    )
})

type RootState = ReturnType<typeof store.getState>

// INSERT slice selectors here
export const getDemoSlice = (root: RootState) => root[demoSlice.name]

export default store
