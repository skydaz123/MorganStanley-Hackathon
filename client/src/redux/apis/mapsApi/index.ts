import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/dist/query/react"
import tagTypes from "./tagTypes"

const mapsApi = createApi({
    reducerPath: 'mapsApi',
    baseQuery: retry(fetchBaseQuery({
        baseUrl: "https://maps.googleapis.com/maps/api",
        prepareHeaders: (headers, api) => {
            // headers.set('Authorization', `insert-authentication-strategy-here`)
            return headers
        },
    }), { maxRetries: 0 }),
    tagTypes,
    endpoints: builder => ({}),
})

export default mapsApi
