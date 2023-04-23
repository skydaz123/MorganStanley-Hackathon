import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import tagTypes from "./tagTypes"

const localApi = createApi({
    reducerPath: 'localApi',
    baseQuery: retry(fetchBaseQuery({
        baseUrl: `/`,
        prepareHeaders: (headers, api) => {
            headers.set('Authorization', `insert-authentication-strategy-here`)
            return headers
        },
    }), { maxRetries: 0 }),
    tagTypes,
    endpoints: builder => ({}),
})

export default localApi
