import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Input,
    Select,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Text,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    useDisclosure,
    Grid,
    GridItem
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
            {/* <AddWeight isOpen={isOpen} onClose={onClose}/> */}
            <Button onClick={onOpen}>New</Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Weights and Vitals</ModalHeader>
                    <ModalBody>
                        <Text>
                            <FormControl id="weight">
                                <FormLabel>Weight</FormLabel>
                                <Input type="number" />
                                <FormHelperText>The current weight.</FormHelperText>
                            </FormControl>
                            <FormControl id="heightMethod">
                                <FormLabel>Method:</FormLabel>
                                <Select placeholder="Select method weight was taken">
                                    <option value="standing">Standing</option>
                                    <option value="bath">Bath</option>
                                    <option value="sitting">Sitting</option>
                                    <option value="wheelchair">Wheelchair</option>
                                    <option value="lift_scale">Lift Scale</option>
                                    <option value="chair_scale">Chair Scale</option>
                                    <option value="mechanical_lift">Mechanical Lift</option>
                                </Select>
                                <FormHelperText>The scale used.</FormHelperText>
                            </FormControl>
                            <FormControl id="height">
                                <FormLabel>Height</FormLabel>
                                <Input type="number" />
                                <FormHelperText>The current height.</FormHelperText>
                            </FormControl>
                            <FormControl id="heightMethod">
                                <FormLabel>Method</FormLabel>
                                <Select placeholder="Select method height was taken">
                                    <option value="standing">Standing</option>
                                    <option value="lying_down">Lying Down</option>
                                    <option value="wing_span">Wing Span</option>
                                    <option value="knee_height">Knee Height</option>
                                    <option value="ulnar_segment">Ulnar segment</option>
                                </Select>
                                <FormHelperText>The scale used.</FormHelperText>
                            </FormControl>
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="blue">Save</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
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
                        const nextValue = arr[i + 1]
                        let weightDifference = 0
                        let dateDiff = 0
                        let dateDifference = 0
                        if (nextValue) {
                            weightDifference = val.value - nextValue.value
                            dateDiff = (new Date(nextValue.date) - new Date(val.date)) / 1000 / 24 / 60 / 60
                            dateDifference = Math.abs(dateDiff).toFixed(0)
                        }

                        return (
                            <Tr key={i}>
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