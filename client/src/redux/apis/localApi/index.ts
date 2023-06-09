import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import tagTypes from "./tagTypes"
import { RootState } from "../../store"

const localApi = createApi({
    reducerPath: "localApi",
    baseQuery: retry(fetchBaseQuery({
        baseUrl: `/`,
        prepareHeaders: (headers, api) => {
            const { token } = (api.getState() as RootState).auth

            if (token && token.expirationTime >= Date.now())
                headers.set("Authorization", `Bearer ${token.value}`)

            return headers
        },
    }), { maxRetries: 0 }),
    tagTypes,
    endpoints: builder => ({}),
})

export default localApi
