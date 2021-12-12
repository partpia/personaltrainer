import React, { useState } from "react";
import {
    Button, IconButton, Input, FormControl, FormLabel, useDisclosure, Tooltip, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

function EditCustomer(props) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.data.firstname,
            lastname: props.customer.data.lastname,
            streetaddress: props.customer.data.streetaddress,
            postcode: props.customer.data.postcode,
            city: props.customer.data.city,
            email: props.customer.data.email,
            phone: props.customer.data.phone
        })
        onOpen();
    }

    const inputChanged = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }

    const saveEditedCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(_ => {
                props.infoMsg("Customer updated", "", "info")
                onClose();
                props.fetchCustomers();
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <Tooltip label="Edit" placement="top">
                <IconButton onClick={handleClickOpen}
                    variant="ghost"
                    colorScheme="blue"
                    aria-label="Edit customer"
                    size="md"
                    fontSize="20px"
                    icon={<BiEditAlt />} />
            </Tooltip>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit customer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input name="firstname" value={customer.firstname} onChange={inputChanged} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last name</FormLabel>
                            <Input name="lastname" value={customer.lastname} onChange={inputChanged} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input name="streetaddress" value={customer.streetaddress} onChange={inputChanged} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Postcode</FormLabel>
                            <Input name="postcode" value={customer.postcode} onChange={inputChanged} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input name="city" value={customer.city} onChange={inputChanged} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input name="email" value={customer.email} onChange={inputChanged} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Phone</FormLabel>
                            <Input name="phone" value={customer.phone} onChange={inputChanged} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => saveEditedCustomer(props.customer.value, customer)}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default EditCustomer;