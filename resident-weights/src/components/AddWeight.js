/**
 * @todo
 * [X] Date input (React Datepicker)
 * [X] Time input
 * [ ] Save logic (figure out name/value of inputs)
 * [ ] Strike-out logic (or erase?)
 * [ ] Graph (react-chartjs-2)
 */

import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Button,
  Text,
  Lorem
} from "@chakra-ui/react"

import data from '../residentData.json'
import fs from 'fs'

function saveData(vitals) {
  console.log(vitals)
}

function AddWeight({ isOpen, onClose, selected, onChange, date }) {
  const [startDate, setStartDate] = useState(new Date());
  
  const [weightInput, setWeightInput] = useState(0)
  const [formData, setFormData] = useState({
    date: new Date(),
    weightValue: 0,
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Weights and Vitals</ModalHeader>
        <ModalBody>
          <Text>
          <DatePicker
              name="date"
              value={formData.date}
              selected={formData.date}
              onChange={(date) => {
                setStartDate(date)
                handleInputChange({target: {name: 'date', value: date}})
              }}
              showTimeSelect
              dateFormat="Pp"
            />
            {/* <DatePicker selected={selected} onChange={(date) => setStartDate(date)}/> */}
            <FormControl id="weightValue">
              <FormLabel>Weight</FormLabel>
              
              {/* Causing errors */}
              <Input name="weightValue" value={formData.weightValue} onChange={(event) => handleInputChange({target: {name: 'weight', value: event.target.value}})} type="number" />
              {/* Causing errors */}

              <FormHelperText>The current weight in kilograms.</FormHelperText>
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
              <FormHelperText>The current height in centimeters.</FormHelperText>
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
          <Button variant="blue" onClick={saveData}>Save</Button>
        </ModalFooter>
      </ModalContent>

    </Modal>
  )
}

export default AddWeight