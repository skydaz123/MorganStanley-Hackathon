import { createSlice } from '@reduxjs/toolkit'

type User = {
    id: string
    name: string | null
    email: string
    token: string
}

type AuthState = {
    isLoggedIn: boolean
    user?: User

}

const initialState: AuthState = {
    isLoggedIn: false,
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
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        },
        register: (state, { payload }: { payload: User }) => {
            state.user = payload
            state.isLoggedIn = true
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        }
    },
})

export const {
    logout,
    register,
} = authSlice.actions

export default authSlice
