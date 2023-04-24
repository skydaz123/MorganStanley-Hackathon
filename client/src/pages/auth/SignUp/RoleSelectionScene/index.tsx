import { Box, Radio } from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import logo from "../../../../images/acfb-logo.png"
import { useMemo, useState } from "react"
import Wrapper from "./Wrapper"
import ButtonContainer from "./ButtonContainer"
import Card from "./Card"
import { useDispatch } from "react-redux"
import { updateData } from "../../../../redux/slices/signUpSlice"
import Role from "../../../../enums/role"

const ROLES = [
    { id: Role.Distributor, name: "Distributor" },
    { id: Role.Partner, name: "Partner" },
]

type Props = {
    nextPage: () => any
}
export default function RoleSelectionScene({ nextPage }: Props) {
    const dispatch = useDispatch()
    const [roleIdx, setRoleIdx] = useState(0)

    const { id, name } = useMemo(() => ROLES[roleIdx], [roleIdx])

    const nextRole = () => setRoleIdx(prev => {
        if (prev == ROLES.length - 1)
            return 0
        return prev + 1
    })

    const prevRole = () => setRoleIdx(prev => {
        if (prev == 0)
            return ROLES.length - 1
        return prev - 1
    })

    const selectRole = () => {
        const ok = window.confirm(`Are you sure you want to continue as a \"${name}\"?`)
        if (!ok)
            return
        dispatch(updateData({ role: id }))
        nextPage()
    }

    return (
        <Wrapper>
            <ButtonContainer onClick={prevRole}>
                <KeyboardArrowLeft fontSize="large"/>
            </ButtonContainer>
            <Card name={name} picture={logo} onSelect={selectRole}/>
            <ButtonContainer onClick={nextRole}>
                <KeyboardArrowRight fontSize="large"/>
            </ButtonContainer>
            <Box display="flex" justifyContent="center" gridColumn="2 / 3">
                {
                    ROLES.map(({ id }, index) => (
                        <Radio
                            key={id}
                            checked={roleIdx == index}
                            sx={{
                                color: "#EC701B",
                                "& .MuiSvgIcon-root": {
                                    fontSize: "48px",
                                },
                                "&.Mui-checked": {
                                    color: "#EC701B",
                                }
                            }}
                            onClick={() => setRoleIdx(index)}
                        />
                    ))
                }
            </Box>
        </Wrapper>
    )
}
