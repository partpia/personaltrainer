import React, { useState } from "react";
import {
    Button, FormControl, FormLabel, Icon, Input, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from "@chakra-ui/react";
import { BiUserPlus } from "react-icons/bi";

function AddCustomer(props) {

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

    const inputChanged = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(customer)
            })
            .then(onClose())
            .then(_ => {
                props.fetchCustomers();
                props.infoMsg("Customer added", "", "success");
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <Button onClick={onOpen} colorScheme="teal" leftIcon={<Icon as={BiUserPlus} w={6} h={6} />} >Add customer</Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New customer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input name="firstname" value={customer.firstname} onChange={inputChanged} placeholder="First name" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last name</FormLabel>
                            <Input name="lastname" value={customer.lastname} onChange={inputChanged} placeholder="Last name" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input name="streetaddress" value={customer.streetaddress} onChange={inputChanged} placeholder="Address" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Postcode</FormLabel>
                            <Input name="postcode" value={customer.postcode} onChange={inputChanged} placeholder="Postcode" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input name="city" value={customer.city} onChange={inputChanged} placeholder="City" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input name="email" value={customer.email} onChange={inputChanged} placeholder="Email" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Phone</FormLabel>
                            <Input name="phone" value={customer.phone} onChange={inputChanged} placeholder="Phone" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => saveCustomer(customer)}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default AddCustomer;