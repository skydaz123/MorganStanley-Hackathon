import BigLoader from "../../../loaders/BigLoader"
import { useDispatch, useSelector } from "react-redux"
import { getSignUpSlice } from "../../../redux/store"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { resetScenes } from "../../../redux/slices/signUpSlice"
import Role from "../../../enums/role"

function sendSignUp(email: string, password: string, role: string) {
    return new Promise(res => {
        setTimeout(() => {
            res(email)
        }, 5000)
    })
}

export default function SubmissionScene() {
    const [message, setMessage] = useState("Submitting")
    const { data, currentScene } = useSelector(getSignUpSlice)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentScene < 2)
            return

        // extract payload
        const { email, role, password } = data

        // check if all fields are filled out
        if (!email || !role || !password) {
            dispatch(resetScenes())
            return
        }

        // send data
        let stop = false
        async function operation() {
            setMessage("Signing up")
            await sendSignUp(email, password, role)

            switch (role) {
                case Role.Partner:
                    navigate("/partner")
                    break
                case Role.Distributor:
                    navigate("/map")
                    break
                case Role.Unknown:
                default:
                    console.error("Invalid role detected")
                    break
            }
        }
        operation().catch(console.error)
        return () => {
            stop = true
        }
    }, [data, currentScene])

    return (
        <BigLoader message={message}/>
    )
}