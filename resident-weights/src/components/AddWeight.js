/**
 * @todo
 * [X] Date input (React Datepicker)
 * [X] Time input
 * [ ] Save logic (figure out name/value of inputs)
 * [ ] Strike-out logic (or erase?)
 * [ ] Graph (react-chartjs-2)
 */

import React, { useState, useCallback } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  Button,
  Text,
} from "@chakra-ui/react"

import data from '../residentData.json'
import fs from 'fs'


function AddWeight({ isOpen, onClose, selected, onChange, date, setData }) {
  const [startDate, setStartDate] = useState(new Date());
  
  const _setData = useCallback((val) => {
    setData(val)
  }, [setData]) 
  const [weightInput, setWeightInput] = useState(0)
  const [formData, setFormData] = useState({
    date: new Date()    
  });
  function saveData() {
    console.log(formData)
    
    // const newDate = moment(formData.date, "MM/DD/YYYY HH:mm") 

    /**
     *  Input: new Date("9/3/2021 14:47")
     *  Output: Fri Sep 03 2021 14:47:00 GMT-0400 (hora de Venezuela)
     */
    let wtData = data
    wtData.push(formData)
    wtData.sort((a,b) => new Date(a["date"]) - new Date(b["date"]))
    console.log(wtData)
    _setData(wtData)
    // fs.writeFileSync('../residentData.json', wtData)
  }
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(formData)
    setFormData({ ...formData, [name]: value });
    
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
              onChange={(date) => handleInputChange({target: {name: 'date', value: date } }) }
              showTimeSelect
              dateFormat="Pp"
            />
            {/* <DatePicker selected={selected} onChange={(date) => setStartDate(date)}/> */}
            <FormControl id="weightValue">
              <FormLabel>Weight</FormLabel>
              
              {/* Causing errors */}
              <Input name="weightValue" value={formData.weightValue} onChange={handleInputChange} type="number" />
              {/* Causing errors */}
                
              <FormHelperText>The current weight in kilograms.</FormHelperText>
            </FormControl>
            <FormControl id="weightMethod" onChange={handleInputChange}>
              <FormLabel>Method:</FormLabel>
              <Select name="weightMethod" placeholder="Select method weight was taken" onChange={handleInputChange}>
                <option name="weightMethod" value="standing">Standing</option>
                <option name="weightMethod" value="bath">Bath</option>
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
              <Input name="height" type="number" onChange={handleInputChange}/>
              <FormHelperText>The current height in centimeters.</FormHelperText>
            </FormControl>
            <FormControl id="heightMethod">
              <FormLabel>Method</FormLabel>
              <Select name="heightMethod" placeholder="Select method height was taken" onChange={handleInputChange}>
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