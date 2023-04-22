import { GEOCODE_KEY } from "../../../environment"
import mapsApi from "./index"
import { GEOCODE_TAG } from "./tagTypes"

type Coord = {
    lat: number
    lng: number
}

type GeoCoord = {
    northeast: Coord
    southwest: Coord
}

interface AddressInfo {
    results: {
        address_components: {
            long_name: string
            short_name: string
            types: string[]
        }[]
        formatted_address: string
        geometry: {
            bounds: GeoCoord
            location: Coord
            location_type: string
            viewport: GeoCoord
        },
        place_id: string
        types: string[]
    }[]
    status: string
}

export const geocodeApi = mapsApi.injectEndpoints({
    endpoints: build => ({
        getAddressInfo: build.query<AddressInfo, string>({
            query: (address: string) => `/geocode/json?${
                new URLSearchParams({
                    address,
                    key: GEOCODE_KEY,
                }).toString()
            }`,
            providesTags: (result, error, arg) => {
                return [{ id: arg, type: GEOCODE_TAG }]
            },
        })
    })
})

export const {
    useGetAddressInfoQuery,
    useLazyGetAddressInfoQuery,
} = geocodeApi
