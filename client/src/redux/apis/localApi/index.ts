import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { BACKEND_URL } from "../../../environment"
import tagTypes from "./tagTypes"

const localApi = createApi({
    reducerPath: 'localApi',
    baseQuery: retry(fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api`,
        prepareHeaders: (headers, api) => {
            headers.set('Authorization', `insert-authentication-strategy-here`)
            return headers
        },
    }), { maxRetries: 0 }),
    tagTypes,
    endpoints: builder => ({}),
})

export default localApi
