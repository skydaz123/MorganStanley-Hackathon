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

            city,
            zip,
            street,
            state,

            role,
            providerName,
            phoneNumber,
            maxCapacity,
        } = data

        const address = [street, city, state, zip].join(", ")

        async function operation() {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)

            const { results: [res] } = await lookup(address).unwrap()

            const { geometry: { location: { lat, lng } } } = res

            const result = await addUser({
                lat,
                lng,
                zipcode: zip,
                email,
                name: providerName,
                address,
                role,
                maxCapacity,
                phoneNumber,
            }).unwrap()

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