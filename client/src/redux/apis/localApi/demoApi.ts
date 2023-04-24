import rootApi from "./index"
import { USER_TAG } from "./tagTypes"

export const demoApi = rootApi.injectEndpoints({
    endpoints: build => ({
        getSomething: build.query({
            query: () => "/endpoint/to/something",
            providesTags: [USER_TAG],
            transformResponse: (data, meta, arg) => {
                return data as {
                    id: number
                    name: string
                    created_at: string
                }
            }
        })
    })
})

export const {
    useGetSomethingQuery,
} = demoApi
