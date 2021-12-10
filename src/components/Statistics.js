import React, { useEffect, useState } from "react";
import { groupBy, map, sumBy, chain } from "lodash";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

function Statistics() {

    const _ = require('lodash');
    const [chartData, setChartData] = useState([]); 
    
    useEffect(() => {
        fetchTrainingsAmounts()
    }, [])

    const fetchTrainingsAmounts = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => {
            if (response.ok)
                response.json()
                .then(data => parseChartData(data.content))
            else
                alert('error')
        })
        .catch(err => console.error(err))
    }

    const parseChartData = (data) => {
        let parsedData = (data.map(({ duration, activity }) => ({
            activity : activity,
            duration : duration
        })))

        let groupSumData = _(parsedData)
            .groupBy("activity")
            .map((o, key) => ({
                    'activity': key,
                    'duration': _.sumBy(o, 'duration') }))
            .value();
        setChartData(groupSumData);
        console.log(chartData);
    }

    return (
        <div>
            <VictoryChart
                padding={{ top: 20, bottom: 30, left: 40, right: 20 }}
                theme={VictoryTheme.material}
                domainPadding={20}
                height={130}>
                <VictoryAxis
                    tickFormat={chartData.activity}
                />
              <VictoryAxis
                dependentAxis
                tickFormat={chartData.duration}
              />
                <VictoryBar
                    data={chartData}
                    x="activity"
                    y="duration"
                    barWidth={30}
                    />
            </VictoryChart>
        </div>     
    );
}

export default Statistics;