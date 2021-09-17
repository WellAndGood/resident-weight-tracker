import React from 'react'
import { Box, Heading } from "@chakra-ui/react"
import '../App.css'

function WeightSummary() {
    return (
    <Box>
        <Heading>Weight Summary</Heading>
        <div className="miniContainer">
            <div>Resident: Ruben Paredes</div>
            <div>Height: 175 CM</div>
            <div>Goal Weight Range: 70 - 75 kg</div>
        </div>
    </Box>)
}

export default WeightSummary