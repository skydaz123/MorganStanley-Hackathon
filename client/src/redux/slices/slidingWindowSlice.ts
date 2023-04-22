import { createSlice } from '@reduxjs/toolkit'

type State =
    | "inactive" // the slider is all the way on the left side of screen
    | "covering" // the slider animations is happening and large window will cover screen
    | "retreating" // the slider is now retreating to the right

type SlidingWindowState = {
    state: State
}
export const slidingWindowSlice = createSlice({
    name: "sliding-window",
    initialState: {
        state: "inactive"
    } as SlidingWindowState,
    reducers: {
        changeState: (state, { payload: newState }: { payload: State }) => {
            state.state = newState
        },
    },
})

export const {
    changeState
} = slidingWindowSlice.actions

export default slidingWindowSlice
