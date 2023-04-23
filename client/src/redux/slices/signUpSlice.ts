import { createSlice } from '@reduxjs/toolkit'
import Role from "../../enums/role"

type SignUpState = {
    currentScene: number
    data: {
        email: string
        password: string
        role: Role
        providerName: string
        phoneNumber: string
        street: string
        city: string
        state: string
        zip: string
        maxCapacity: number
    }
}

const initialState: SignUpState = {
    currentScene: 0,
    data: {
        email: "",
        password: "",
        role: Role.Unknown,
        providerName: "",
        phoneNumber: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        maxCapacity: 0,
    }
}

export const signUpSlice = createSlice({
    name: "sign-up",
    initialState,
    reducers: {
        nextScene: (state, {}: { payload: undefined }) => {
            state.currentScene = state.currentScene + 1
        },
        resetScenes: (state, {}: { payload: undefined }) => {
            Object.assign(state, initialState)
        },
        updateData: (state, { payload }: { payload: Partial<SignUpState["data"]> }) => {
            state.data = {
                ...state.data,
                ...payload,
            }
        }
    },
})

export const {
    nextScene,
    resetScenes,
    updateData,
} = signUpSlice.actions

export default signUpSlice
