import CustomText from "./CustomText"

type Props = {
    name: string
    address: string
}
export default function Header({ name, address }: Props) {
    return (
        <>
            <CustomText variant="h4" gutterBottom fontWeight="bold">
                Viewing {name}
            </CustomText>
            <CustomText variant="h6" gutterBottom fontStyle="italic">
                {address}
            </CustomText>
        </>
    )
}
