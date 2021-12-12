import React, { useRef, useState } from "react";
import {
    AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
    AlertDialogOverlay, Button, IconButton, Tooltip
} from "@chakra-ui/react";
import { BiTrashAlt } from "react-icons/bi";

function DeleteTraining(props) {

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    const eraseTraining = (trainingId) => {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + trainingId, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    onClose();
                    props.fetchTrainings();
                    props.infoMsg("Training deleted", "", "success");
                } else {
                    props.infoMsg("Delete failed !", "error");
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <Tooltip label="Delete" placement="top">
                <IconButton
                    variant="ghost"
                    colorScheme="red"
                    aria-label="Delete training"
                    size="md"
                    fontSize="20px"
                    icon={<BiTrashAlt />}
                    onClick={() => setIsOpen(true)} />
            </Tooltip>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Training
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={() => eraseTraining(props.id)} ml={3}>
                                Delete
                            </Button>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );
}

export default DeleteTraining;