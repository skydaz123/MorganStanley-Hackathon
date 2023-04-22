import { createSlice } from '@reduxjs/toolkit'

type MapState = {
    center: {
        lat: number
        lng: number
    }
}
export const mapSlice = createSlice({
    name: "map",
    initialState: {
        center: {
            lat: 0,
            lng: 0,
        }
    } as MapState,
    reducers: {
        updateCenter(state, { payload }: { payload: { lat?: number, lng?: number } }) {
            const { lng, lat } = payload
            if (lng !== undefined)
                state.center.lng = lng
            if (lat !== undefined)
                state.center.lat = lat
            }
    },
})

export const {
    updateCenter
} = mapSlice.actions

export default mapSlice
