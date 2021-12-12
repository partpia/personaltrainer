import React from "react";
import {
    Button, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';
import { BiBarChart } from "react-icons/bi";

function ChartBar(props) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Button onClick={onOpen} colorScheme="teal" rightIcon={<Icon as={BiBarChart} w={6} h={6} />} >Show chart</Button>
            <Modal size='full' isOpen={isOpen} onClose={onClose} closeOnEsc={true} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Chart of activities and durations</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VictoryChart
                            padding={{ top: 20, bottom: 70, left: 70, right: 20 }}
                            theme={VictoryTheme.material}
                            domainPadding={30}
                            height={300}
                            width={800}>
                            <VictoryAxis
                                tickFormat={props.chartData.activity}
                                label="Activity"
                                axisLabelComponent={
                                    <VictoryLabel
                                        dy={40}
                                        style={{ fill: 'gray' }} />}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={props.chartData.duration}
                                label="Duration (min)"
                                axisLabelComponent={
                                    <VictoryLabel
                                        dy={-40}
                                        style={{ fill: 'gray' }} />}
                            />
                            <VictoryBar
                                style={{ data: { fill: "teal" } }}
                                data={props.chartData}
                                x="activity"
                                y="duration"
                                barWidth={40}
                                labels={({ datum }) => `${datum.duration}`}
                                labelComponent={<VictoryLabel dy={20} style={{ fill: 'white' }} />}
                            />
                        </VictoryChart>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ChartBar;