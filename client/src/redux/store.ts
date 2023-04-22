import { configureStore } from "@reduxjs/toolkit"
import rootApi from "./apis/rootApi"
import demoSlice from "./slices/demoSlice"
import slidingWindowSlice from "./slices/slidingWindowSlice"

const store = configureStore({
    reducer: {
        [demoSlice.name]: demoSlice.reducer,
        [slidingWindowSlice.name]: slidingWindowSlice.reducer,
        [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: getDM => getDM().concat(
        rootApi.middleware,
    )
})

type RootState = ReturnType<typeof store.getState>

// INSERT slice selectors here
export const getDemoSlice = (root: RootState) => root[demoSlice.name]
export const getSlidingWindowSlice = (root: RootState) => root[slidingWindowSlice.name]

export default store
