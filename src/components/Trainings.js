import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Flex, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { format } from 'date-fns';
import DeleteTraining from "./DeleteTraining";

function Trainings(props) {

    const [trainings, setTrainings] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [columnApi, setColumnApi] = useState(null);

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
        setColumnApi(params.columnApi);
    }

    const onFilterTextChanged = (e) => {
        gridApi.setQuickFilter(e.target.value);
    }

    const nameFormatter = (params) => {
        if (params.data.customer != null) {
            return params.data.customer.firstname + " " + params.data.customer.lastname;
        } else {
            return "";
        }
    }

    const trainingColumns = [
        {
            headerName: '',
            width: 65,
            field: 'id',
            cellRendererFramework: params =>
                < DeleteTraining id={params.value} fetchTrainings={fetchTrainings} infoMsg={props.infoMsg} />
        },
        { field: 'activity', sortable: true, filter: true },
        {
            field: 'date',
            filter: true,
            sortable: true,
            cellRendererFramework: params => format(new Date(params.value), 'dd.MM.yyyy HH:mm')
        },
        { headerName: 'Duration (min) ', field: 'duration', filter: true },
        {
            headerName: 'Customer',
            sortable: true,
            filter: true,
            cellRendererFramework: params => nameFormatter(params)
        }
    ]

    return (
        <div>
            <div style={{ width: '95%', margin: 'auto' }}>
                <Flex>
                    <Box p="4">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={< Icon as={BiSearch} w={5} h={5} />} />
                            <Input variant="flushed" focusBorderColor="lime" type="search" className="search" style={{ alignItems: 'right' }} placeholder="Search" onChange={onFilterTextChanged} />
                        </InputGroup>
                    </Box>
                </Flex>
            </div>
            <div className="ag-theme-alpine" style={{ marginTop: 20, height: 400, width: '95%', margin: 'auto' }}>
                <AgGridReact
                    onGridReady={onGridReady}
                    rowData={trainings}
                    columnDefs={trainingColumns}
                    pagination={true}
                    paginationPageSize={7}
                    suppressCellSelection={true}>
                </AgGridReact>
            </div>
        </div>
    );
}

export default Trainings;