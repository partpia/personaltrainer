import React from "react";
import {
    Button, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import { VictoryPie, VictoryTheme } from 'victory';
import { BiPieChartAlt2 } from "react-icons/bi";

function Pie(props) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div style={{ width: '95%', margin: 'auto' }}>
            <Button onClick={onOpen} colorScheme="teal" rightIcon={<Icon as={BiPieChartAlt2} w={6} h={6} />} >Show pie</Button>
            <Modal size='full' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Pie of activities and durations</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VictoryPie
                            data={props.chartData}
                            x="activity"
                            y="duration"
                            labels={({ datum }) => `${datum.activity}`}
                            width={950}
                            theme={VictoryTheme.material}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Pie;