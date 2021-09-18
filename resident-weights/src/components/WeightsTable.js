import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    useDisclosure
} from "@chakra-ui/react"
import AddWeight from "./AddWeight"
import data from '../residentData.json'

// function dataAdd(array) {
    
//     // Reverses the dates (oldest to newest)
//     array.reverse()

//     for (let i = 1; i < array.length; i++) {
        
//         // Compares the second value to the first one
//         const weightDiff = array[i].value - array[i-1].value
//         array[i].weightDiff = weightDiff
        
//         //
//         const firstDate = new Date(array[i].date)
//         const secondDate = new Date(array[i-1].date)
//         const dateDiff = firstDate - secondDate
//         array[i].dateDiff = dateDiff
//     }
//     array.reverse()
//     return array
// }

function WeightsTable() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    function kgToPounds(kg) {
        return Math.round(kg * 2.2)
    }

    function openAddWeightModal() {
        return 0
    }

    return (
    <>
    <AddWeight isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
    <Button onClick={onOpen}>New</Button>
        <Table variant="simple" size="sm">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
                <Tr>
                    <Th>""</Th>
                    <Th>Date</Th>
                    <Th>Value (kg)</Th>
                    <Th>Value (lb)</Th>
                    <Th>Weight Difference / Days</Th>
                    <Th>Scale</Th>
                    <Th>Warnings</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((val, i, arr) => {
                    const nextValue = arr[i+1]
                    let weightDifference = 0
                    let dateDiff = 0
                    let dateDifference = 0
                    if (nextValue) {
                        weightDifference = val.value - nextValue.value
                        dateDiff = (new Date(nextValue.date) - new Date(val.date)) /1000/24/60/60
                        dateDifference = Math.abs(dateDiff).toFixed(0)
                    }

                    return (
                        <Tr>
                            <Td><Button>strike-out</Button></Td>
                            <Td>{val.date}</Td>
                            <Td isNumeric>{val.value} Kg</Td>
                            <Td isNumeric>{kgToPounds(val.value)} lb</Td>
                            <Td>{weightDifference.toFixed(2)} kgs / {dateDifference} days</Td>
                            <Td>{val.scale}</Td>
                            <Td></Td>
                        </Tr>)
                    }
                )}
            </Tbody>
        </Table>
        </>
    )
}



export default WeightsTable