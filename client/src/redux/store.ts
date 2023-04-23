import { configureStore } from "@reduxjs/toolkit"
import localApi from "./apis/localApi"
import demoSlice from "./slices/demoSlice"
import mapsApi from "./apis/mapsApi"
import mapSlice from "./slices/mapSlice"
import slidingWindowSlice from "./slices/slidingWindowSlice"
import signUpSlice from "./slices/signUpSlice"
import authSlice from "./slices/authSlice"

const store = configureStore({
    reducer: {
        [demoSlice.name]: demoSlice.reducer,
        [mapSlice.name]: mapSlice.reducer,
        [slidingWindowSlice.name]: slidingWindowSlice.reducer,
        [signUpSlice.name]: signUpSlice.reducer,
        [authSlice.name]: authSlice.reducer,
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
export const getSignUpSlice = (root: RootState) => root[signUpSlice.name]
export const getAuthSlice = (root: RootState) => root[authSlice.name]

export default store
