import BigLoader from "../../../loaders/BigLoader"
import { useDispatch, useSelector } from "react-redux"
import { getSignUpSlice } from "../../../redux/store"
import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase"
import { useAddUserMutation } from "../../../redux/apis/localApi/firebaseApi"
import { resetScenes } from "../../../redux/slices/signUpSlice"
import { addToken, register } from "../../../redux/slices/authSlice"

export default function SubmissionScene() {
    const dispatch = useDispatch()

    const { data, currentScene } = useSelector(getSignUpSlice)
    const [addUser] = useAddUserMutation()

    const [message, setMessage] = useState("Submitting")

    useEffect(() => {
        setMessage("Signing up")

        const {
            email,
            password,

            zip,
            lng,
            lat,
            address,

            role,
            providerName,
            phoneNumber,
            maxCapacity,
        } = data

        async function operation() {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)

            const {
                token,
                expirationTime,
            } = await user.getIdTokenResult(true)
            dispatch(addToken({
                value: token,
                expirationTime: new Date(expirationTime).getTime(),
            }))

            const result = await addUser({
                lat,
                lng,
                zipcode: zip,
                email,
                name: providerName,
                role,
                address,
                maxCapacity,
                phoneNumber,
            }).unwrap()

            dispatch(register({
                id: user.uid,
                name: result.name,
                email: result.email,
                role: result.role,
            }))
            dispatch(resetScenes())
        }

        operation().catch(console.error)
    }, [data, currentScene])

    return (
        <BigLoader message={message}/>
    )
}