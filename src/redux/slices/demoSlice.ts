import { createSlice } from '@reduxjs/toolkit'

type DemoState = {
    numBagels: number
    name: string
}
export const demoSlice = createSlice({
    name: "demo",
    initialState: {
        numBagels: 0,
        name: "Pokemon"
    } as DemoState,
    reducers: {
        changeName: (state, { payload: newName }: { payload: string }) => {
            state.name = newName
        },
    },
})

export const {
    changeName
} = demoSlice.actions

export default demoSlice
