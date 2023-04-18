import { configureStore } from "@reduxjs/toolkit"
import rootApi from "./apis/rootApi"
import demoSlice from "./slices/demoSlice"

const store = configureStore({
    reducer: {
        [demoSlice.name]: demoSlice.reducer,
        [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: getDM => getDM().concat(
        rootApi.middleware,
    )
})

type RootState = ReturnType<typeof store.getState>

// INSERT slice selectors here
export const getDemoSlice = (root: RootState) => root[demoSlice.name]

export default store
