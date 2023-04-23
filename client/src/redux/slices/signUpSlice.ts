import { createSlice } from '@reduxjs/toolkit'
import Role from "../../enums/role"

type SignUpState = {
    currentScene: number
    data: {
        email: string
        password: string
        role: Role
    }
}
export const signUpSlice = createSlice({
    name: "sign-up",
    initialState: {
        currentScene: 0,
        data: {
            email: "",
            password: "",
            role: Role.Unknown,
        }
    } as SignUpState,
    reducers: {
        nextScene: (state, {}: { payload: undefined }) => {
            state.currentScene = state.currentScene + 1
        },
        resetScenes: (state, {}: { payload: undefined }) => {
            state.currentScene = 0
            state.data.email = ""
            state.data.role = Role.Unknown
            state.data.password = ""
        },
        updateData: (state, { payload }: { payload: Partial<SignUpState["data"]> }) => {
            const {
                email,
                role,
                password
            } = payload
            if (email !== undefined)
                state.data.email = email
            if (role !== undefined)
                state.data.role = role
            if (password !== undefined)
                state.data.password = password
        }
    },
})

export const {
    nextScene,
    resetScenes,
    updateData,
} = signUpSlice.actions

export default signUpSlice
