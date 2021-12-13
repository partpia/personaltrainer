import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import _ from "lodash";
import ChartBar from "./ChartBar";
import Pie from "./Pie";

function Statistics() {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(data => parseChartData(data.content))
                } else
                    alert('Data not found')
            })
            .catch(err => console.error(err))
    }, [])

    const parseChartData = (data) => {
        let parsedData = (data.map(({ activity, duration }) => ({
            activity: activity,
            duration: duration
        })))

        let groupSumData = _(parsedData)
            .groupBy("activity")
            .map((o, key) => ({
                'activity': key,
                'duration': _.sumBy(o, 'duration')
            }))
            .value();
        setChartData(groupSumData);
    }

    return (
        <div style={{ width: '95%', margin: 'auto' }}>
            <Flex>
                <Box p="4">
                    <ChartBar chartData={chartData} />
                </Box>
                <Box p="4">
                    <Pie chartData={chartData} />
                </Box>
            </Flex>
        </div>
    );
}

export default Statistics;