import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Box, Flex, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";
import AddTraining from "./AddTraining";

function Customers(props) {

    const [customers, setCustomers] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [columnApi, setColumnApi] = useState(null);
    //const toast = useToast();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => {
                if (response.ok)
                    response.json()
                    .then(data => setCustomers(data.content))
                else
                    alert('Could not find customers')
        })
        .catch(err => console.error(err))
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
        setColumnApi(params.columnApi);
    }

    const onFilterTextChanged = (e) => {
        gridApi.setQuickFilter(e.target.value);
    }

    const columns = [
        {
            headerName:'',
            sortable: false,
            filter: false,
            width: 50,
            field: 'links.0.href',
            cellRendererFramework: params => 
                < DeleteCustomer customer={params.value} fetchCustomers={fetchCustomers} infoMsg={props.infoMsg} />
        },
        {
            headerName:'',
            sortable: false,
            filter: false,
            width: 50,
            field: 'links.0.href',
            cellRendererFramework: params => 
                < EditCustomer customer={params} fetchCustomers={fetchCustomers} infoMsg={props.infoMsg} />
        },
        {
            headerName:'',
            sortable: false,
            filter: false,
            width: 60,
            field: 'links.0.href',
            cellRendererFramework: params =>
                < AddTraining customerUrl={params.value} customerData={params.data}  infoMsg={props.infoMsg}/>
        },
        { field: 'firstname', sortable: true, filter: true, width: 140},
        { field: 'lastname', sortable: true, filter: true, width: 140},
        { field: 'streetaddress', headerName: 'Address'},
        { field: 'postcode', sortable: true, width: 100},
        { field: 'city', sortable: true, width: 140},
        { field: 'email'},
        { field: 'phone'}
    ]

    return (
        <div>
            <div>
                <Flex>
                    <Box p="4">
                        <AddCustomer fetchCustomers={fetchCustomers} infoMsg={props.infoMsg} />
                    </Box>
                    <Box p="4">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={< Icon as={BiSearch} w={5} h={5}/>}  /> 
                            <Input variant="flushed" focusBorderColor="lime" type="search" className="search" style={{alignItems:'right'}} placeholder="Search" onChange={onFilterTextChanged} />
                        </InputGroup>
                    </Box>
                </Flex>
            </div>
            <div className="ag-theme-alpine" style={{ marginTop: 20, height: 450, width: '90%', margin: 'auto' }}>
                <AgGridReact
                    onGridReady={onGridReady}
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}
                    suppressCellSelection={true}>
                </AgGridReact>
            </div>
        </div>
    );
}

export default Customers;