import rootApi from "./index"
import Role from "../../../enums/role"

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
            }
        }),
        getUser: build.query({
            query: (idToken: string) => `/firebase/getUser?token=${idToken}`,
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
            }
        }),
        addReport: build.mutation({
            query: (body: AddReportPayload) => ({
                url: "/firebase/addReport",
                method: "POST",
                body
            }),
        }),
        getReports: build.query({
            query: (idToken: string) => `/firebase/getReports?token=${idToken}`,
        }),
    })
})

export const {
    // useGetSomethingQuery,
    useAddUserMutation,
    useLazyGetUserQuery,
    useGetUserQuery,
    useAddReportMutation,
    useLazyGetReportsQuery,
    useGetReportsQuery,
} = firebaseApi
