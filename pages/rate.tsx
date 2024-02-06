import { axiosInstance } from '@/api/axiosinstance';
import { endPoints } from '@/api/endpoints';
import { Container, Typography } from '@mui/material';
import { RootRate } from '@/typescript/interface/coinrates';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SingleRate } from '@/typescript/interface/rate.singledt';
import styles from '@/styles/rate.module.css'

interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export const getRateDetails = async () => {
    const data = await axiosInstance.get<RootRate>(
        endPoints.fetchedrates.rates
    )
    console.log(data?.data);
    return data?.data?.data
}


export async function getStaticProps() {
    const ratedata = await getRateDetails()
    return { props: { ratedata } }
}


const rate = (props: any) => {
    const { isLoading, data, error } = useQuery({
        queryKey: ["ratelists"],
        queryFn: getRateDetails,
        initialData: props.ratedata
    })


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [details, setDetails] = useState("")

    const storedetails = (id: any) => {
        handleOpen()
        setDetails(id)
    }

    const { isLoading: isLoad, data: singledata } = useQuery({
        queryKey: ["singlerate", details],
        queryFn: async () => {
            const data = await axiosInstance.get<SingleRate>(
                endPoints.fetchedrates.ratedetails(`${details}`)
            )
            return data.data.data

        }
    })


    return (
        <Container maxWidth='xl' sx={{ my: 4 }}>
            <Typography variant='h4' textAlign={'center'} mb={4}>Coin Rate Page</Typography>
            {
                isLoading ? (<div>
                    <h3>Loading...</h3>
                </div>) : null
            }
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow >
                                <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                    Serial No.
                                </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                    ID
                                </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                    Symbol
                                </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                    Current Symbol
                                </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                    Type
                                </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                    Rate Used
                                </TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>

                            {
                                data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: any, index: number) => {
                                        return (
                                            <>
                                                <TableRow hover key={index} onClick={() => storedetails(row.id)}>
                                                    <TableCell align="center" >{index + 1}</TableCell>
                                                    <TableCell align="center">{row.id}</TableCell>
                                                    <TableCell align="center">{row.symbol}</TableCell>
                                                    <TableCell align="center">{row.currencySymbol}</TableCell>
                                                    <TableCell align="center">{row.type}</TableCell>
                                                    <TableCell align="center">{row.rateUsd}</TableCell>
                                                </TableRow>
                                            </>
                                        )
                                    }
                                    )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Name: {singledata?.id?.toUpperCase()}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Symbol: {singledata?.symbol}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Type: {singledata?.type}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ my: 2 }}>
                            Rate: {singledata?.rateUsd}
                        </Typography>
                        <Button onClick={handleClose} className={styles.modalbtn} sx={{
                            textTransform: 'none'
                        }}>Close</Button>
                        {/* 
                        */}
                    </Box>
                </Modal>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data?.length as number}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Container >
    )
}

export default rate