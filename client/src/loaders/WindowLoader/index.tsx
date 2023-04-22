import Window from "./Window"
import { useDispatch, useSelector } from "react-redux"
import { getSlidingWindowSlice } from "../../redux/store"
import { useEffect, useMemo } from "react"
import { changeState } from "../../redux/slices/slidingWindowSlice"
import { DELAYS, DURATION } from "./config"

export default function WindowLoader() {
    const dispatch = useDispatch()
    const { state } = useSelector(getSlidingWindowSlice)

    const isRetreating = useMemo(() => state === "retreating", [state])

    useEffect(() => {
        if (state != "retreating")
            return
        const tid = setTimeout(() => {
            dispatch(changeState("inactive"))
        }, DURATION + DELAYS[2])
        return () => {
            clearTimeout(tid)
        }
    }, [state])

    if (state == "inactive")
        return null

    return (
        <>
            <Window
                color="#B24100"
                isRetreating={isRetreating}
                delay={isRetreating ? DELAYS[2] : DELAYS[0]}
            />
            <Window
                color="#F46E21"
                delay={DELAYS[1]}
                isRetreating={isRetreating}
            />
            <Window
                color="#FF9600"
                delay={isRetreating ? DELAYS[0] : DELAYS[2]}
                isRetreating={isRetreating}
            />
        </>
    )
}
