import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { Box, Button, Flex, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiDownload, BiSearch } from "react-icons/bi";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";
import AddTraining from "./AddTraining";

function Customers(props) {

    const [customers, setCustomers] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const exportCustomerCsv = () => {
        const params = {
            columnKeys: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone']
        }
        gridApi.exportDataAsCsv(params);
    }

    const onFilterTextChanged = (e) => {
        gridApi.setQuickFilter(e.target.value);
    }

    const columns = [
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 50,
            field: 'links.0.href',
            cellRendererFramework: params =>
                < DeleteCustomer customer={params.value} fetchCustomers={fetchCustomers} infoMsg={props.infoMsg} />
        },
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 50,
            field: 'links.0.href',
            cellRendererFramework: params =>
                < EditCustomer customer={params} fetchCustomers={fetchCustomers} infoMsg={props.infoMsg} />
        },
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 60,
            field: 'links.0.href',
            cellRendererFramework: params =>
                < AddTraining customerUrl={params.value} customerData={params.data} infoMsg={props.infoMsg} />
        },
        { field: 'firstname', sortable: true, filter: true, width: 130 },
        { field: 'lastname', sortable: true, filter: true, width: 130 },
        { field: 'streetaddress', headerName: 'Address' },
        { field: 'postcode', sortable: true, width: 100 },
        { field: 'city', sortable: true, width: 130 },
        { field: 'email', width: 200 },
        { field: 'phone', width: 160 }
    ]

    return (
        <div>
            <div style={{ width: '95%', margin: 'auto' }}>
                <Flex>
                    <Box p="4">
                        <AddCustomer fetchCustomers={fetchCustomers} infoMsg={props.infoMsg} />
                    </Box>
                    <Box p="4">
                        <Button onClick={() => exportCustomerCsv()} colorScheme="gray" leftIcon={<Icon as={BiDownload} w={6} h={6} />} >Download customer list</Button>
                    </Box>
                    <Box p="4">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={< Icon as={BiSearch} w={5} h={5} />} />
                            <Input variant="flushed" focusBorderColor="lime" type="search" className="search" placeholder="Search" onChange={onFilterTextChanged} />
                        </InputGroup>
                    </Box>
                </Flex>
            </div>
            <div className={props.colorMode === 'light' ? "ag-theme-alpine" : "ag-theme-alpine-dark"} style={{ marginTop: 20, height: 400, width: '95%', margin: 'auto' }}>
                <AgGridReact
                    onGridReady={onGridReady}
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={7}
                    suppressCellSelection={true}>
                </AgGridReact>
            </div>
        </div>
    );
}

export default Customers;