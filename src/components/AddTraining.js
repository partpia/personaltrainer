import React, { useEffect, useState } from "react";
import { Button, IconButton, Input, FormControl, FormLabel, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatISO from 'date-fns/formatISO';
import { fi } from 'date-fns/locale/';

function AddTraining(props) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [date, setDate] = useState(new Date());
    const [customerName, setCustomerName] = useState({
        firstname: props.customerData.firstname,
        lastname: props.customerData.lastname
    });

    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: props.customerUrl
    });
    
    const inputChanged = (e) => {
        setTraining({...training, [e.target.name]: e.target.value });
    }

    const handleChange = (date) => {
        setDate(date);
        let formattedDate = formatISO(date);
        setTraining({...training, date: formattedDate});
        console.log(formattedDate);
        console.log(training);
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(training)
            })
        .then(onClose())
        .then(_ => {
            props.infoMsg("Training added", "Training added successfully to customer", "success");
        })
        .catch(err => console.error(err))
    }

    return (
        <div>
            <Tooltip label="Add training" placement="top">
                <IconButton
                            variant="ghost"
                            colorScheme="green"
                            aria-label="Edit customer"
                            size="md"
                            fontSize="20px"
                            icon={<BiPlus />}
                            onClick={onOpen} />
            </Tooltip>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Training to <b>{customerName.firstname + " " + customerName.lastname}</b></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Activity</FormLabel>
                            <Input name="activity" value={training.activity} onChange={inputChanged} placeholder="Activity" />
                        </FormControl><br/>
                        <FormControl>
                            <FormLabel>Date and time</FormLabel>
                            <DatePicker
                                selected={date}
                                onChange={(date) => handleChange(date)}
                                showWeekNumbers
                                locale={fi}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={5}
                                timeCaption="time"
                                dateFormat="dd/MM/yyyy H:mm" />
                        </FormControl><br/>
                        <FormControl>
                            <FormLabel>Duration</FormLabel>
                            <Input name="duration" value={training.duration} onChange={inputChanged} placeholder="Duration" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => saveTraining(training)}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default AddTraining;