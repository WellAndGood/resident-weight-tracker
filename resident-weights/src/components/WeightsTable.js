import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import AddWeight from "./AddWeight";
import _data from "../residentData.json";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ data, setData ] = useState(_data)

  function kgToPounds(kg) {
    return Math.round(kg * 2.2);
  }

  function openAddWeightModal() {
    return 0;
  }

  return (
    <>
      <AddWeight isOpen={isOpen} onClose={onClose} setData={setData}/>
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
            const nextValue = arr[i + 1];
            let weightDifference = 0;
            let dateDiff = 0;
            let dateDifference = 0;
            if (nextValue) {
              weightDifference = val.weightValue - nextValue.weightValue;
              dateDiff =
                (new Date(nextValue.date) - new Date(val.date)) /
                1000 /
                24 /
                60 /
                60;
              dateDifference = Math.abs(dateDiff).toFixed(0);
            }

            return (
              <Tr key={i}>
                <Td>
                  <Button>strike-out</Button>
                </Td>
                <Td>{typeof val.date === 'string' ? val.date : val.date.toString()}</Td>
                <Td isNumeric>{val.weightValue} Kg</Td>
                <Td isNumeric>{kgToPounds(val.weightValue)} lb</Td>
                <Td>
                  {weightDifference.toFixed(2)} kgs / {dateDifference} days
                </Td>
                <Td>{val.weightMethod}</Td>
                <Td></Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default WeightsTable;
