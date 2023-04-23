import BigLoader from "../../../loaders/BigLoader"
import { useDispatch, useSelector } from "react-redux"
import { getSignUpSlice } from "../../../redux/store"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase"
import { useLazyGetAddressInfoQuery } from "../../../redux/apis/mapsApi/geocodeApi"
import { useAddUserMutation } from "../../../redux/apis/localApi/firebaseApi"
import Role from "../../../enums/role"
import { resetScenes } from "../../../redux/slices/signUpSlice"
import { addToken, register } from "../../../redux/slices/authSlice"

export default function SubmissionScene() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data, currentScene } = useSelector(getSignUpSlice)
    const [lookup] = useLazyGetAddressInfoQuery()
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

            const token = await user.getIdToken(true)
            dispatch(addToken(token))

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

            switch (result.role) {
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
            dispatch(resetScenes())
        }
        operation().catch(console.error)
    }, [data, currentScene])

    return (
        <BigLoader message={message}/>
    )
}