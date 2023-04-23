import { useDispatch, useSelector } from "react-redux"
import { getSlidingWindowSlice } from "../redux/store"
import { useEffect } from "react"
import { changeState } from "../redux/slices/slidingWindowSlice"
import { DELAYS, DURATION } from "../loaders/WindowLoader/config"

export default function useHideSlidingWindowOnLoad() {
    const dispatch = useDispatch()
    const { state } = useSelector(getSlidingWindowSlice)

    useEffect(() => {
        if (state != "covering")
            return
        const tid = setTimeout(() => {
            dispatch(changeState("retreating"))
        }, DURATION + DELAYS[2])
        return () => {
            clearTimeout(tid)
        }
    }, [state])
}
