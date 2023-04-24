import rootApi from "./index"
import Role from "../../../enums/role"
import { REPORT_TAG, USER_TAG } from "./tagTypes"

type AddUserPayload = {
    address: string
    lat: number
    lng: number
    zipcode: string
    email: string
    name: string
    role: Role
    maxCapacity: number
    phoneNumber: string
}

type AddReportPayload = {
    lb_recieved: number,
    lb_given: number,
    email: string
}

export const firebaseApi = rootApi.injectEndpoints({
    endpoints: build => ({
        addUser: build.mutation({
            query: (body: AddUserPayload) => ({
                url: "/firebase/addUser",
                method: "POST",
                body
            }),
            transformResponse: (data) => {
                return data as {
                    lat: number
                    lng: number
                    zipcode: string
                    email: string
                    name: string
                    address: string
                    role: Role
                    maxCapacity: number
                    phoneNumber: string
                }
            },
            invalidatesTags: (result, error) => {
                if (error || !result)
                    return []
                return [{ type: USER_TAG, id: result.email }]
            }
        }),
        getUser: build.query({
            query: () => `/firebase/getUser`,
            transformResponse: (data) => {
                return data as {
                    zipcode: string
                    address: string
                    role: Role
                    phoneNumber: string
                    lng: number
                    name: string
                    maxCapacity: number
                    lat: number
                    email: string
                }
            },
            providesTags: (result, error,) => {
                if (error || !result)
                    return []
                return [{ type: USER_TAG, id: result.email }]
            }
        }),
        addReport: build.mutation({
            query: (body: AddReportPayload) => ({
                url: "/firebase/addReport",
                method: "POST",
                body
            }),
            invalidatesTags: [REPORT_TAG]
        }),
        getReports: build.query({
            query: () => `/firebase/getReports`,
            transformResponse: (data) => {
                return data as {
                    timestamp: string
                    lb_recieved: number
                    lb_given: number
                    email: string
                }[]
            },
            providesTags: [REPORT_TAG]
        }),
        getOtherReports: build.query({
            query: (email: string) => `/firebase/getOtherReports?email=${email}`,
            transformResponse: (data) => {
                return data as {
                    timestamp: number
                    lb_recieved: number
                    lb_given: number
                }[]
            },
            providesTags: [REPORT_TAG]
        }),
    })
})

export const {
    useAddUserMutation,
    useLazyGetUserQuery,
    useGetUserQuery,
    useAddReportMutation,
    useLazyGetReportsQuery,
    useGetReportsQuery,
    useGetOtherReportsQuery,
} = firebaseApi
