import { createSlice } from '@reduxjs/toolkit'
import Role from "../../enums/role"

type User = {
    id: string

    name: string
    email: string

    role: Role
}

type AuthState = {
    isLoggedIn: boolean
    token: string | null
    user?: User
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    user: undefined,
}

const STORAGE_KEY = "REACT_APP|authSlice"
export const authSlice = createSlice({
    name: "auth",
    initialState: (() => {
        try {
            const onStorage = localStorage.getItem(STORAGE_KEY)
            if (onStorage)
                return JSON.parse(onStorage) as AuthState
        } catch {}
        return initialState
    })(),
    reducers: {
        logout: (state, { }: { payload: undefined }) => {
            state.isLoggedIn = false
            state.user = undefined
            state.token = null
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        },
        addToken: (state, { payload }: { payload: string }) => {
            state.token = payload
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        },
        register: (state, { payload }: { payload: User }) => {
            if (state.token === null)
                throw new Error("Cannot register user without token")

            state.user = payload
            state.isLoggedIn = true
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        }
    },
})

export const {
    logout,
    addToken,
    register,
} = authSlice.actions

export default authSlice
