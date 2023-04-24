import { Paper, Modal, Divider } from "@mui/material"
import React, { useEffect, useMemo } from "react"
import { useGetOtherReportsQuery } from "../../redux/apis/localApi/firebaseApi"
import Header from "./Header"
import CustomText from "./CustomText"
import Charts from "./Charts"
import LoadingBar from "../LoadingBar"

type Props = {
    isModalOpen: boolean
    handleCloseModal: () => any
    selectedLocation: {
        email: string
        name: string
        address: string
    } | null
    generateGraphData?: any
}

function LocationModal({ isModalOpen, handleCloseModal, selectedLocation, generateGraphData }: Props) {
    const { data, isFetching, isError, error } = useGetOtherReportsQuery(
        selectedLocation?.email ?? "[UNKNOWN]",
        { skip: !selectedLocation?.email }
    )

    useEffect(() => {
        if (!isError)
            return
        console.error(error)
    }, [isError, error])

    const chartData = useMemo(() => {
        if (isFetching || isError || !data)
            return []

        const $ = data.map(({ lb_recieved, lb_given, timestamp: argument }) => ({
            val_1: lb_recieved,
            val_2: lb_given,
            val_3: lb_recieved - lb_given,
            argument,
        }))
        $.sort((a, b) => a.argument - b.argument)

        return $.slice(0, 5)
    }, [data, isError, isFetching])

    return (
        <Modal open={isModalOpen} onClose={handleCloseModal} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
        }}>
            <Paper variant="outlined" sx={{
                backgroundColor: "white",
                p: "48px",
                overflow: "auto",
                maxHeight: "calc(100vh - 2*16px - 2*32px)",
                boxSizing: "border-content",
            }}>
                {
                    isFetching ? (
                        <LoadingBar/>
                    ) : (
                        !data || !selectedLocation ? (
                            <CustomText>No Data</CustomText>
                        ) : (
                            <>
                                <Header name={selectedLocation.name} address={selectedLocation.address}/>
                                <Divider flexItem sx={{ marginY: "8px" }}/>
                                <CustomText variant="h5" gutterBottom>Statistics</CustomText>
                                <Charts data={chartData}/>
                            </>
                        )
                    )
                }
            </Paper>
        </Modal>
    )
}

export default LocationModal
