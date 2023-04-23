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

export const firebaseApi = rootApi.injectEndpoints({
    endpoints: build => ({
        addUser: build.mutation({
            query: (body: AddUserPayload) => ({
                url: "/firebase/addUser",
                method: "POST",
                body
            }),

            // providesTags: [USER_TAG],
            // transformResponse: (data, meta, arg) => {
            //     return data as {
            //         id: number
            //         name: string
            //         created_at: string
            //     }
            // }
        }),
        getUser: build.query({
            query: (idToken: string) => `/firebase/getUser/?token=${idToken}`,
        }),
    })
})

export const {
    // useGetSomethingQuery,
    useAddUserMutation,
    useLazyGetUserQuery,
    useGetUserQuery,
} = firebaseApi
