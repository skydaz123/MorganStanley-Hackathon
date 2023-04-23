import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import tagTypes from "./tagTypes"
import { RootState } from "../../store"

const localApi = createApi({
    reducerPath: "localApi",
    baseQuery: retry(fetchBaseQuery({
        baseUrl: `/`,
        prepareHeaders: (headers, api) => {
            const { token } = (api.getState() as RootState).auth

            if (token)
                headers.set("Authorization", `Bearer ${token}`)

            return headers
        },
    }), { maxRetries: 0 }),
    tagTypes,
    endpoints: builder => ({}),
})

export default localApi
