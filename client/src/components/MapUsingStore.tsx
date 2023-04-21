import { useDispatch, useSelector } from "react-redux"
import { getMapSlice } from "../redux/store"
import { useEffect } from "react"
import { updateCenter } from "../redux/slices/mapSlice"

export default function MapUsingStore() {
    const dispatch = useDispatch()
    const { center: { lat, lng } } = useSelector(getMapSlice)

    useEffect(() => {
        console.log("Updating center in 5 seconds...")
        const tid = setTimeout(() => {
            dispatch(updateCenter({ lat: 600, lng: 200 }))
        }, 5000)
        return () => {
            clearTimeout(tid)
        }
    }, [])

    return (
        <>Lng: {lng}, Lat: {lat}</>
    )
}
