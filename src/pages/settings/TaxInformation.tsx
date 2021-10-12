import { Typography, Container, Box, Grid, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import SaveIcon from '@material-ui/icons/Save';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        editable: true,
    },
    {
        field: 'invoiceNumber',
        headerName: 'Invoice Number',
        width: 150,
        editable: true,
    },
    {
        field: 'client',
        headerName: 'Client',
        width: 150,
        editable: true,
    },
    {
        field: 'invoiceTotal',
        headerName: 'Invoice Total',
        width: 150,
        editable: true,
    },
    {
        field: 'date',
        headerName: 'Date',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'dueDate',
        headerName: 'Due Date',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: any) =>
            `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
            }`,
    },
];

const rows = [
    { id: 1, status: 'Paid', invoiceNumber: '343423', client: 'John Doe 1', date: '10-11-2021', invoiceTotal: 23.30, dueDate: '10-11-2021'},
    { id: 2, status: 'Paid', invoiceNumber: '433222', client: 'John Doe 2', date: '10-11-2021', invoiceTotal: 43.30, dueDate: '10-11-2021'},
    { id: 3, status: 'Paid', invoiceNumber: '344432', client: 'John Doe 3', date: '10-11-2021', invoiceTotal: 13.30, dueDate: '10-11-2021'},
    { id: 4, status: 'Paid', invoiceNumber: '233223', client: 'John Doe 4', date: '10-11-2021', invoiceTotal: 63.30, dueDate: '10-11-2021'},
    { id: 5, status: 'Paid', invoiceNumber: '545322', client: 'John Doe 5', date: '10-11-2021', invoiceTotal: 73.30, dueDate: '10-11-2021'},
    { id: 6, status: 'Paid', invoiceNumber: '334322', client: 'John Doe 6', date: '10-11-2021', invoiceTotal: 23.30, dueDate: '10-11-2021'},
    { id: 7, status: 'Paid', invoiceNumber: '444322', client: 'John Doe 7', date: '10-11-2021', invoiceTotal: 43.30, dueDate: '10-11-2021'},
    { id: 8, status: 'Paid', invoiceNumber: '232312', client: 'John Doe 8', date: '10-11-2021', invoiceTotal: 23.30, dueDate: '10-11-2021'},
    { id: 9, status: 'Paid', invoiceNumber: '545344', client: 'John Doe 9', date: '10-11-2021', invoiceTotal: 53.30, dueDate: '10-11-2021'},
];

export default function TaxInformation(props: any) {
    return (
        <Container>

            <Box pb={1}>
                <Grid container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                >
                    <Grid item>
                        <Box paddingBottom={1}>
                            <Typography variant="h4">
                                Tax Information
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Grid>
                            <Box marginLeft={0.5} display="inline-block">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon />}
                                >
                                    Export
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <div style={{ height: 400, width: '65em' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </Box>
        </Container>
    );
}
