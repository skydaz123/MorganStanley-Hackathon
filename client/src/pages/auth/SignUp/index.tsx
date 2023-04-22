import { lazy, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSignUpSlice, getSlidingWindowSlice } from "../../../redux/store"
import { changeState } from "../../../redux/slices/slidingWindowSlice"
import { DELAYS, DURATION } from "../../../loaders/WindowLoader/config"
import { nextScene } from "../../../redux/slices/signUpSlice"

const FormScene = lazy(() => import("./FormScene"))
const RoleSelectionScene = lazy(() => import("./RoleSelectionScene"))
const SubmissionScene = lazy(() => import("./SubmissionScene"))

export default function SignUp() {
    const dispatch = useDispatch()
    const { state } = useSelector(getSlidingWindowSlice)
    const { currentScene: scene } = useSelector(getSignUpSlice)

    const nextPage = () => {
        if (state != "inactive")
            return
        dispatch(changeState("covering"))
        setTimeout(() => {
            dispatch(nextScene())
            dispatch(changeState("retreating"))
        }, DURATION + DELAYS[2])
    }

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

    if (scene == 0)
        return <FormScene nextPage={nextPage}/>

    if (scene == 1)
        return <RoleSelectionScene nextPage={nextPage}/>

    return <SubmissionScene/>
}
