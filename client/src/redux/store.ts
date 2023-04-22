import { configureStore } from "@reduxjs/toolkit"
import localApi from "./apis/localApi"
import demoSlice from "./slices/demoSlice"
import mapsApi from "./apis/mapsApi"
import mapSlice from "./slices/mapSlice"
import slidingWindowSlice from "./slices/slidingWindowSlice"

const store = configureStore({
    reducer: {
        [demoSlice.name]: demoSlice.reducer,
        [mapSlice.name]: mapSlice.reducer,
        [slidingWindowSlice.name]: slidingWindowSlice.reducer,
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
export const getMapSlice = (root: RootState) => root[mapSlice.name]
export const getSlidingWindowSlice = (root: RootState) => root[slidingWindowSlice.name]

export default store
